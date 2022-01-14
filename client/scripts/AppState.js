const { Vuex } = globalThis;

export const appState = new Vuex.Store({
    state: {
        title: "test title",
        activeRoute: "",
        routes: [
            {
                title: "Home",
                route: "/home"
            },
            {
                title: "Personal",
                route: "/personal"
            },
        ]
    },
    getters: {
        activeRouteIndex (state) {
            return state.routes.findIndex((route) => {
                return route.title === state.activeRoute;
            });
        }
    },
    mutations: {
        setActiveRoute (state, newRoute) {
            state.activeRoute = newRoute;
        }
    },
    actions: {
    },
});

globalThis.AppState = appState;
