import dotenv from "dotenv";
import mongoose from "mongoose";
import { Deferred } from "../shared/Deferred.js";

const { Schema } = mongoose;

// local .env setup
if (process.env.DB_URL === undefined) {
    dotenv.config();
}

class _DatabaseManager {
    constructor () {
        this.deferred = new Deferred();
    }

    connect () {
        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                globalThis.console.log("Database connected");
                this.loadModel();
                this.deferred.resolve();
            })
            .catch((err) => {
                globalThis.console.log("Error: Database was not able to connected!");
                this.deferred.reject(err);
            });
        return this.deferred.promise;
    }

    loadModel () {
        const MemberSchema = new Schema({
            name: String,
            token: String,
            permissions: [
                {
                    id: String
                }
            ],
        });
        this.memberModel = mongoose.model("Member", MemberSchema);
    }

    async getMembers () {
        const memberList = await this.memberModel.find();
        const memberListCopy = [];
        memberList.forEach((member) => {
            const memberCopy = member.toObject();
            // flatten permissions
            memberCopy.permissions = memberCopy.permissions.map((object) => {
                return object.id;
            });
            memberListCopy.push(memberCopy);
        });
        return memberListCopy;
    }

    async getMemberByToken (token) {
        const member = await this.memberModel.findOne({ token });
        if (!member) {
            return null;
        }
        const memberCopy = member.toObject();

        // flatten permissions
        memberCopy.permissions = memberCopy.permissions.map((object) => {
            return object.id;
        });
        return memberCopy;
    }

    async addMember (name, token, permissions) {
        // expand permissions
        const perm = permissions.map((name) => {
            return {
                id: name
            };
        });
        const member = await this.memberModel.create({ name, token, perm });
        return member;
    }

    async updateMemberProps (id, props) {
        const member = await this.memberModel.findById(id);
        if (!member) {
            return null;
        }

        Object.keys(props).forEach((key) => {
            let value = props[key];
            if (key === "permissions") {
                // expand permissions
                value = props[key].map((name) => {
                    return {
                        id: name
                    };
                });
            }

            member[key] = value;
        });

        return member.save();
    }

    async deleteMember (id) {
        const result = await this.memberModel.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }

    async deleteMemberByToken (token) {
        const result = await this.memberModel.deleteOne({ token });
        return result.deletedCount === 1;
    }
}

export const DatabaseManager = new _DatabaseManager();
