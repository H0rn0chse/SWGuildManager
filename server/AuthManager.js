import { registerXhrHandler } from "@h0rn0chse/socket-server";
import { DatabaseManager } from "./DatabaseManager.js";

class _AuthManager {
    init () {
        registerXhrHandler("get", "/authorization", this.handleAuthorization, this);
    }

    async handleAuthorization (req, res, token) {
        let response = [];

        const member = await DatabaseManager.getMemberByToken(token);
        if (!member) {
            res.status(403);
        } else {
            response = member.permissions;
            res.status(200);
            res.json(response);
        }

        res.end();
        return true;
    }

    async hasPermission (token, permission) {
        const member = await DatabaseManager.getMemberByToken(token);

        if (!member) {
            console.log(`Permission "${permission}" denied for "${token}" reason: "User not found"`);
            return false;
        }

        const result = member.permissions.includes(permission);
        if (result) {
            console.log(`Permission "${permission}" granted for "${token}"`);
        } else {
            console.log(`Permission "${permission}" denied for "${token}" reason: "Permission not found`);
        }

        return result;
    }

    getPermissions () {
        return [
            "PROFILE_EDIT",
            "MEMBER_LIST_EDIT",
            "ADMIN_EDIT"
        ];
    }
}

export const AuthManager = new _AuthManager();
