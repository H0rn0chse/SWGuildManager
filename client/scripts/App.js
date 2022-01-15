import { appState } from "./AppState.js";
import { NavBar } from "./components/NavBar.js";
import { Vue, Vuetify, Vuex } from "./libs.js";
import { router } from "./Router.js";

const { mapState, mapActions, mapGetters } = Vuex;

// eslint-disable-next-line no-unused-vars
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
                <v-toolbar-title
                    class="text-h6"
                >
                    {{$route.name}}
                </v-toolbar-title>
            </v-app-bar>
            <router-view/>
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
