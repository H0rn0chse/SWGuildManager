import { Vuex } from "../libs.js";

const { mapState, mapActions, mapGetters } = Vuex;

export const HomeView = {
    template: `
        <v-main
            class="d-flex justify-center align-center"
        >
            <h1>
                Willkommen bei den Exploding Kittens
            </h1>
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
