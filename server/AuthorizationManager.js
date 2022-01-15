import { registerXhrHandler } from "@h0rn0chse/socket-server";

class _AuthorizationManager {
    constructor () {
        registerXhrHandler("get", "/authorization", this.handleAuthorization, this);
    }

    handleAuthorization (req, res, token) {
        // TODO:
        const readData = () => {};

        const response = {
            account: false,
            manageMembers: false,
            readData
        };
        res.json(response);
        res.end();
    }
}

export const AuthorizationManager = new _AuthorizationManager();
