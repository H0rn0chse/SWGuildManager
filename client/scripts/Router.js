import { HomeView } from "./views/Home.js";
import { ErrorPageView } from "./views/ErrorPage.js";
import { PersonalView } from "./views/Personal.js";
import { appState } from "./AppState.js";

const { VueRouter } = globalThis;

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
            path: "/personal",
            name: "Personal",
            components: {
                default: PersonalView
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

router.afterEach((to, from) => {
    appState.commit("setActiveRoute", to.name);
});

// for debugging
window.Router = router;
