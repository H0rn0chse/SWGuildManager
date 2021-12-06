import { registerXhrHandler, startServer } from "./server/socket.js";
import { DatabaseManager } from "./server/DatabaseManager.js";
import { UserManager } from "./server/UserManager.js";

startServer();

DatabaseManager.connect()
    .catch(console.error);

UserManager.init();

registerXhrHandler("get", "/test", function (req, res) {
    const token = req.get("Authorization") || null;
    const data = {
        data: this.test,
        token
    };

    res.end(JSON.stringify(data));

    return true;
}, { test: "123" })
