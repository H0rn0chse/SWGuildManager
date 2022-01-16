import { setToken, request } from "../socket-server/handler.js";
import { alertify } from "./libs.js";

class _AuthManager {
    constructor () {
        const searchParams = new URLSearchParams(location.search);
        this.token = searchParams.get("token") || "";
        setToken(this.token);
    }

    async hasPermission (permission) {
        const permissions = await this.getPermissions();
        return permissions.includes(permission);
    }

    getPermissions () {
        if (!this.token) {
            return Promise.resolve([]);
        }

        if (this.permissionPromise) {
            return this.permissionPromise;
        }

        this.permissionPromise = request("GET", "/authorization")
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error("The response is malformed");
                }
                alertify.success("Authentication successful");
                console.log(data);
                return data;
            })
            .catch((err) => {
                console.error(err);
                alertify.error("Authentication failed");
                return [];
            });
        return this.permissionPromise;
    }
}

export const AuthManager = new _AuthManager();
