import { Vuex } from "../libs.js";

const { mapState, mapActions, mapGetters } = Vuex;

export const MembersView = {
    template: `
        <v-main>
            <v-container
                class="d-flex flex-column justify-start align-center"
            >
                <h2>
                    Mitgliederverwaltung
                </h2>
            </v-container>
        </v-main>
    `,
    props: [],
    mounted () {},
    updated () {},
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
