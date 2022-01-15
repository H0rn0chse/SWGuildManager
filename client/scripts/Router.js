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
    if (await AuthManager.hasRole("Personal")) {
        router.addRoute({
            path: "/personal",
            name: "Profil",
            components: {
                default: PersonalView
            },
        });

        appState.commit("addRoute", {
            title: "Profil",
            route: "/personal"
        });
    }

    if (await AuthManager.hasRole("Members")) {
        router.addRoute({
            path: "/members",
            name: "Mitglieder",
            components: {
                default: MembersView
            },
        });

        appState.commit("addRoute", {
            title: "Mitglieder",
            route: "/members"
        });
    }
});

router.afterEach((to, from) => {
    appState.commit("setActiveRoute", to.name);
});
