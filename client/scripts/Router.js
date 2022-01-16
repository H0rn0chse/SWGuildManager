import { HomeView } from "./views/Home.js";
import { ErrorPageView } from "./views/ErrorPage.js";
import { PersonalView } from "./views/Personal.js";
import { appState } from "./AppState.js";
import { VueRouter } from "./libs.js";
import { AuthManager } from "./AuthManager.js";
import { MembersView } from "./views/Members.js";

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            alias: "/home",
            name: "Home",
            components: {
                default: HomeView
            },
        },
        {
            path: "*",
            name: "Error",
            components: {
                default: ErrorPageView
            },
        }
    ]
});

router.onReady(async () => {
    if (await AuthManager.hasPermission("PROFILE_EDIT")) {
        enableRoute (
            "/personal",
            "Profil",
            {
                default: PersonalView
            },
        );
    }

    if (await AuthManager.hasPermission("MEMBER_LIST_EDIT")) {
        enableRoute (
            "/members",
            "Mitglieder",
            {
                default: MembersView
            },
        );
    }
});

router.afterEach((to, from) => {
    appState.commit("setActiveRoute", to.name);
});

function enableRoute (path, name, components) {
    router.addRoute({
        path: path,
        name: name,
        components
    });

    appState.commit("addRoute", {
        title: name,
        route: path
    });
}
