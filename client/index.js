import { setToken, request } from "./socket-server/handler.js";
import { Deferred } from "../shared/Deferred.js";

//location.search = `?token=${crypto.randomUUID()}`;

const searchParams = new URLSearchParams(location.search);
const token = searchParams.get("token");
setToken(token);

request("GET", "/test")
    .then((data) => {
        console.log(data);
        if (data.token) {
            alertify.success("Recieved the token");
        } else {
            alertify.warning("Token is missing");
        }
    })
    .catch((err) => {
        console.error(err);
        alertify.error("Some error occurred");
    });