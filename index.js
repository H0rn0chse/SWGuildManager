import { startServer, registerXhrHandler } from "@h0rn0chse/socket-server";

import { DatabaseManager } from "./server/DatabaseManager.js";
import { root } from "./server/globals.js"

startServer({
    publicPaths: [
        ["/client", "/"],
        ["/shared", "/shared"]
    ],
    root
});

DatabaseManager.connect()
    .catch(console.error);

registerXhrHandler("get", "/test", function (req, res, token=null) {
    const data = {
        data: this.test,
        token
    };

    res.end(JSON.stringify(data));

    return true;
}, { test: "123" })
