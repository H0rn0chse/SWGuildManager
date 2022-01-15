import { Vuex } from "../libs.js";

const { mapState, mapActions, mapGetters } = Vuex;

export const HomeView = {
    template: `
        <v-container>
            <h1>
                Home
            </h1>
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
