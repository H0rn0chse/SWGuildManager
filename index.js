import { startServer, registerXhrHandler } from "@h0rn0chse/socket-server";
import { DatabaseManager } from "./server/DatabaseManager.js";
import { AuthManager } from "./server/AuthManager.js";
import { init as initProfileHandler } from "./server/ProfileHandler.js";

startServer({
    //host: "192.168.0.161",
    publicPaths: [
        ["/client", "/"],
        ["/shared", "/shared"]
    ],
    useClientHandler: true
});

DatabaseManager.connect()
    .catch(console.error);

AuthManager.init();
initProfileHandler();

registerXhrHandler("get", "/test", function (req, res, token=null) {
    const data = {
        data: this.test,
        token
    };

    res.end(JSON.stringify(data));

    return true;
}, { test: "123" });

console.log("http://localhost:8080?token=aaa");
