import { Deferred } from "../../shared/Deferred.js";
import { UserManager } from "../UserManager.js";
import { HandlerMap } from "./HandlerMap.js";

export class AdapterBase {
    constructor (port, host, local, publicPaths) {
        this.port = port;
        this.host = host;

        this.local = local;
        this.publicPaths = publicPaths;

        this.idleTimeout = 55;

        this.socketHandler = new HandlerMap(["channel", "callback", "scope"]);
        this.xhrHandler = new HandlerMap(["method", "path", "callback", "scope"]);
    }

    registerSocketHandler (channel, callback, scope) {
        this.socketHandler.set(channel, callback, scope);
    }

    registerXhrHandler (method, path, callback, scope) {
        this.xhrHandler.set(method, path, callback, scope);
    }

    handleSocketOpen (ws) {
        globalThis.console.log("WebSocket opens");
        ws.id = UserManager.addUser();
        this.send(ws, "playerId", {
            id: ws.id,
        });
        return ws.id;
    }

    handleSocketClose (ws) {
        this.handleSocketMessage(ws, {
            channel: "close",
            data: {},
        });
        UserManager.removeUser(ws.id);
        globalThis.console.log("WebSocket closed");
    }

    handleSocketMessage (ws, data) {
        const message = this.parseSocketMessage(data);

        this.socketHandler.forEach((channel, callback, scope) => {
            if (message.channel !== channel) {
                return;
            }

            try {
                callback.call(scope, ws, message.data, ws.id);
            } catch (err) {
                globalThis.console.error(err);
            }
        });
    }

    async handleXhr (req, res, next) {
        const handlerPromises = this.xhrHandler.map(async (method, path, callback, scope) => {
            if (req.method !== method.toUpperCase()) {
                return;
            }
            if (!req.path.startsWith(path)) {
                return;
            }

            try {
                await callback.call(scope, req, res);
            } catch (err) {
                globalThis.console.error(err);
            }
        });

        const results = await Promise.allSettled(handlerPromises);
        const requestWasHandled = results.every((res) => {
            return !res;
        });

        if (!requestWasHandled) {
            next();
        }
    }

    parseSocketMessage (data) {
        // need to be implemented by adapter
    }

    send (ws, channel, data) {
        // need to be implemented by adapter
    }

    publish (topic, channel, data) {
        // need to be implemented by adapter
    }

    subscribe (ws, topic) {
        // need to be implemented by adapter
    }

    unsubscribe (ws, topic) {
        // need to be implemented by adapter
    }

    startServer () {
        // need to be implemented by adapter
    }
}
