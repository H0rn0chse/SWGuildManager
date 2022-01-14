const { Vuex } = globalThis;
const { mapState, mapActions, mapGetters } = Vuex;

export const ErrorPageView = {
    template: `
        <v-container>
            <h1>
                Es ist ein Fehler aufgetreten
            </h1>
            <v-row class="text-center">
                <v-col>
                    <p>
                        Sollte dieser Fehler häufiger auftreten die App neu starten oder neu installieren. Soillte er weiterhin auftreten bitte ein Ticket aufmachen.
                    </p>
                    <v-btn
                        @click="$router.go(-1)"
                    >
                        Zurück zur letzten Seite
                    </v-btn>
                    <v-btn
                        @click="$router.replace('/')"
                    >
                        Zurück zur Hauptseite
                    </v-btn>
                    <router-link
                        :to="{ path: '/'}"
                        v-slot="{ navigate }"
                        custom
                    >
                        <v-btn @click="navigate" >
                            Zurück zur Hauptseite
                        </v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-container>
    `,
    props: [
    ],
    mounted () {
    },
    updated () {
    },
    computed: {
        ...mapState([]),
        ...mapGetters([]),
    },
    data () {
        return {};
    },
    methods: {
        ...mapActions([]),
    }
};
