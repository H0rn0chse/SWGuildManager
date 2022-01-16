import { Vuex } from "./libs.js";

export const appState = new Vuex.Store({
    state: {
        title: "test title",
        navBarVisible: false,
        activeRoute: "",
        routes: [
            {
                title: "Home",
                route: "/home"
            },
        ],
        profile: {
            name: ""
        }
    },
    getters: {
        activeRouteIndex (state) {
            return state.routes.findIndex((route) => {
                return route.title === state.activeRoute;
            });
        }
    },
    mutations: {
        addRoute (state, route) {
            state.routes.push(route);
        },
        setActiveRoute (state, newRoute) {
            state.activeRoute = newRoute;
        },
        updateProp (state, data) {
            state[data.name] = data.value;
        },
        setProfileData (state, data) {
            state.profile = data;
        }
    },
    actions: {
        setNavBarVisible (context, visible) {
            const data = {
                name: "navBarVisible",
                value: visible
            };
            context.commit("updateProp", data);
        }
    },
});
