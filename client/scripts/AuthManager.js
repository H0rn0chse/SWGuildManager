import { setToken, request } from "../socket-server/handler.js";
import { alertify } from "./libs.js";

class _AuthManager {
    constructor () {
        const searchParams = new URLSearchParams(location.search);
        this.token = searchParams.get("token") || "";
        setToken(this.token);
    }

    async hasRole (role) {
        const roles = await this.getRoles();
        return roles.includes(role);
    }

    getRoles () {
        if (!this.token) {
            return Promise.resolve([]);
        }

        if (this.rolesPromise) {
            return this.rolesPromise;
        }

        this.rolesPromise = request("GET", "/authorization")
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
        return this.rolesPromise;
    }
}

export const AuthManager = new _AuthManager();
