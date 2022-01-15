import { Vuex } from "../libs.js";

const { mapState, mapActions, mapGetters } = Vuex;

export const ViewTemplate = {
    template: `
        <v-main>
            <v-container
                class="d-flex flex-column justify-start align-center"
            >
                <h1>
                    ViewTemplate
                </h1>
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
