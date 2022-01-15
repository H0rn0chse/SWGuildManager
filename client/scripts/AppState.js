const { Vuex } = globalThis;

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
        },
        updateProp (state, data) {
            state[data.name] = data.value;
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
