import { registerXhrHandler } from "@h0rn0chse/socket-server";
import { AuthManager } from "./AuthManager.js";
import { DatabaseManager } from "./DatabaseManager.js";

export function init () {
    registerXhrHandler("get", "/profile/read", readProfile, this);
    registerXhrHandler("post", "/profile/update", updateProfile, this);
    registerXhrHandler("get", "/profile/delete", deleteProfile, this);
}

async function readProfile (req, res, token) {
    if (!token || !(await AuthManager.hasPermission(token, "PROFILE_EDIT"))) {
        res.status(403).end();
        return true;
    }

    const member = await DatabaseManager.getMemberByToken(token);

    res.json(member);
    res.end();
    return true;
}

async function updateProfile (req, res, token) {
    if (!token || !(await AuthManager.hasPermission(token, "PROFILE_EDIT"))) {
        res.status(403).end();
        return true;
    }

    const member = await DatabaseManager.getMemberByToken(token);

    try {
        const profileData = sanitizeProfile(req.body);
        await DatabaseManager.updateMemberProps(member._id, profileData);
        res.status(200);
    } catch (err) {
        res.status(500);
        console.error(err);
    }

    res.end();
    return true;
}

async function deleteProfile (req, res, token) {
    if (!token || !(await AuthManager.hasPermission(token, "PROFILE_EDIT"))) {
        res.status(403).end();
        return true;
    }

    const result = await DatabaseManager.deleteMemberByToken(token);

    if (result) {
        res.status(200);
    } else {
        res.status(500);
    }

    res.end();
    return true;
}

function sanitizeProfile (object) {
    return {
        name: object.name
    };
}
