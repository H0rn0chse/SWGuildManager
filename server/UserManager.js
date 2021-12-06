import { registerSocketHandler } from "./socket.js";

class _UserManager {
    constructor () {
        this.user = new Map();
        this.count = 0;
    }

    init () {
        // registerSocketHandler("usernameUpdate", this.onUsernameUpdate, this);
    }

    addUser () {
        this.count += 1;
        const data = {
            id: this.count,
        };
        this.user.set(data.id, data);
        return user.id;
    }

    getProperty (id, key) {
        const data = this.user.get(id);
        return data[key];
    }

    setProperty (id, key, value) {
        const data = this.user.get(id);
        data[key] = value;
    }

    removeProperty (id, key) {
        const data = this.user.get(id);
        if (data) {
            delete data[key];
        }
    }

    removeUser (id) {
        this.user.delete(id);
    }
}

export const UserManager = new _UserManager();
