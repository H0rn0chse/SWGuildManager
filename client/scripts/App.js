import { appState } from "./AppState.js";
import { router } from "./Router.js";

const { Vue, Vuex, Vuetify } = globalThis;
const { mapState, mapActions, mapGetters } = Vuex;

const componentList = [
];

const app = new Vue({
    el: "#app",
    store: appState,
    router: router,
    vuetify: new Vuetify(),
    template: `
        <v-app>
            <v-navigation-drawer
                v-model="navVisible"
                color="grey lighten-3"
                app
            >
                <v-list
                    dense
                    nav
                >
                    <v-list-item-group
                        v-model="activeRouteIndexLocal"
                        active-class="deep-purple--text text--accent-4"
                    >
                        <v-list-item
                            v-for="item in routes"
                            :key="item.title"
                        >
                            <v-list-item-content>
                                <v-list-item-title
                                    class="text-h6"
                                >
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar
                color="deep-purple accent-4"
                elevate-on-scroll
                dark
                dense
                app
            >
                <v-app-bar-nav-icon
                    @click="navVisible = true"
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
            "routes",
        ]),
        ...mapGetters([
            "activeRouteIndex",
        ]),
        activeRouteIndexLocal: {
            get () {
                return this.activeRouteIndex;
            },
            set (newRouteIndex) {
                const newRoute = this.routes[newRouteIndex].route;
                this.$router.push(newRoute);
            }
        },
    },
    data () {
        return {
            navVisible: false,
        };
    },
    methods: {
        ...mapActions([]),
    },
});

globalThis.App = app;
globalThis.AppState = appState;
