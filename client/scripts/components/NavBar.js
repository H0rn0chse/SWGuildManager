import { Vue, Vuex } from "../libs.js";

const { mapState, mapActions, mapGetters } = Vuex;

export const NavBar = Vue.component("nav-bar", {
    template: `
    <v-navigation-drawer
        v-model="navBarVisibleLocal"
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
    `,
    props: [
    ],
    computed: {
        ...mapState([
            "routes",
            "navBarVisible"
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
        navBarVisibleLocal: {
            get () {
                return this.navBarVisible;
            },
            set (visible) {
                this.setNavBarVisible(visible);
            }
        },
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([
            "setNavBarVisible"
        ]),
    }
});
