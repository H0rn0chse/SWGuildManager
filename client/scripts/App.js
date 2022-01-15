import { appState } from "./AppState.js";
import { NavBar } from "./components/NavBar.js";
import { router } from "./Router.js";

const { Vue, Vuex, Vuetify } = globalThis;
const { mapState, mapActions, mapGetters } = Vuex;

const componentList = [
    NavBar,
];

const app = new Vue({
    el: "#app",
    store: appState,
    router: router,
    vuetify: new Vuetify(),
    template: `
        <v-app>
            <nav-bar />
            <v-app-bar
                color="deep-purple accent-4"
                elevate-on-scroll
                dark
                dense
                app
            >
                <v-app-bar-nav-icon
                    @click="setNavBarVisible(!navBarVisible)"
                />
                <v-toolbar-title>
                    {{$route.name}}
                </v-toolbar-title>
            </v-app-bar>
            <v-main>
                <router-view/>
            </v-main>
        </v-app>
    `,
    mounted () {
    },
    computed: {
        ...mapState([
            "title",
            "navBarVisible",
        ]),
        ...mapGetters([]),
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "setNavBarVisible"
        ]),
    },
});

globalThis.Router = router;
globalThis.App = app;
globalThis.AppState = appState;
