import { registerXhrHandler } from "@h0rn0chse/socket-server";

class _AuthManager {
    init () {
        registerXhrHandler("get", "/authorization", this.handleAuthorization, this);
    }

    handleAuthorization (req, res, token) {
        const response = [];

        if (token) {
            response.push("PROFILE_EDIT");
            response.push("MEMBER_LIST_EDIT");
        }

        res.json(response);
        res.end();
    }
}

export const AuthManager = new _AuthManager();
