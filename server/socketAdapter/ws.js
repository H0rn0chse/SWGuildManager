import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";

import { AdapterBase } from "./AdapterBase.js";
import { TopicManager } from "./TopicManager.js";

export class Adapter extends AdapterBase {
    constructor (port, host, local, publicPaths, indexHtml) {
        super(port, host, local, publicPaths);

        this.indexHtml = indexHtml;

        this.app = express();
        this.httpServer = createServer(this.app);

        const socketOptions = {
            path: "/ws",
            server: this.httpServer,
        };
        this.wss = new WebSocketServer(socketOptions);
    }

    parseMessage (data) {
        if (typeof data !== "string") {
            return data;
        }

        let oResult = {};
        try {
            const string = data;
            oResult = JSON.parse(string);
        } catch (err) {
            globalThis.console.log(err);
        }
        return oResult;
    }

    send (ws, channel, data) {
        const message = JSON.stringify({
            channel,
            data,
        });
        ws.send(message);
    }

    publish (topic, channel, data) {
        const message = JSON.stringify({
            channel,
            data,
        });
        TopicManager.publish(topic, message);
    }

    subscribe (ws, topic) {
        try {
            TopicManager.subscribe(ws, topic);
        } catch (err) {
            globalThis.console.error(`subscribe failed: ${topic}`);
        }
    }

    unsubscribe (ws, topic) {
        try {
            TopicManager.unsubscribe(ws, topic);
        } catch (err) {
            globalThis.console.error(`unsubscribe failed: ${topic}`);
        }
    }

    handleSocketClose (playerId) {
        const ws = {
            id: playerId,
        };
        super.handleSocketClose(ws);
    }

    startServer () {
        const expressOptions = {
            index: this.indexHtml,
        };

        this.publicPaths.forEach((path, index) => {
            const [absolutePath, relativePath] = path;
            if (relativePath === "/") {
                this.app.use(express.static(absolutePath, expressOptions));
            }
            this.app.use(relativePath, express.static(absolutePath));
        });

        this.app.use(this.handleXhr.bind(this));

        this.wss.on("connection", (ws) => {
            const playerId = this.handleSocketOpen(ws);

            ws.on("message", this.handleSocketMessage.bind(this, ws));

            ws.on("close", this.handleSocketClose.bind(this, playerId));
        });

        this.httpServer.listen(this.port, this.host, () => {
            globalThis.console.log(`Listening to http://${this.host}:${this.port}`);
        });
    }
}
