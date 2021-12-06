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
                //this.loadModel();
                this.deferred.resolve();
            })
            .catch((err) => {
                globalThis.console.log("Error: Database was not able to connected!");
                this.deferred.reject(err);
            });
        return this.deferred.promise;
    }

    loadModel () {
        /*const Highscore = new Schema({
            placement: Number,
            name: String,
            score: Number,
            date: Number,
        });
        this.highscore = mongoose.model("Highscore", Highscore);*/
    }
}

export const DatabaseManager = new _DatabaseManager();
