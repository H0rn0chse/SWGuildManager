import { Vuex } from "../libs.js";

const { mapState, mapActions, mapGetters } = Vuex;

export const PersonalView = {
    template: `
        <v-container>
            <h1>
                Personal
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
