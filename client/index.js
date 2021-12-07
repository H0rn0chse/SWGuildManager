import { Deferred } from "../shared/Deferred.js";

//location.search = `?token=${crypto.randomUUID()}`;

const searchParams = new URLSearchParams(location.search);
const token = searchParams.get("token");

function getData () {
    var deferred = new Deferred();
    const req = new XMLHttpRequest();
    req.addEventListener("load", () => {
        let data;
        try {
            data = JSON.parse(req.responseText);
        } catch (err) {
            data = req.responseText;
        }
        deferred.resolve(data);
    });
    req.addEventListener("error", () => {
        deferred.reject("error");
    });
    req.addEventListener("abort", ()  => {
        deferred.reject("abort");
    });
    req.open("GET", "/test", true);

    if (token) {
        req.setRequestHeader("Authorization", token);
    }

    req.send();

    return deferred.promise
}

getData()
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