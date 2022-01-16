import { request } from "../../socket-server/handler.js";
import { alertify, Vuex } from "../libs.js";
import { appState } from "../AppState.js";

const { mapState, mapActions, mapGetters } = Vuex;

export const PersonalView = {
    template: `
        <v-main>
            <v-container
                class="d-flex flex-column justify-start align-center"
            >
                <h2>
                    Bearbeite dein Profil
                </h2>
                <v-row
                    justify="space-between"
                >
                    <v-col>
                        <v-form ref="form">
                            <v-text-field
                                v-model="profile.name"
                                label="Username"
                            ></v-text-field>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row
                    justify="space-between"
                >
                    <v-btn
                        @click="saveProfile"
                    >
                        Speichern
                    </v-btn>
                </v-row>
                <v-row
                    justify="space-between"
                >
                    <v-dialog
                        v-model="showDialog"
                        width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="red lighten-1"
                                v-bind="attrs"
                                v-on="on"
                            >
                                Profil Löschen
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title
                                    class="text-h5 red lighten-2"
                            >
                                Hinweis
                            </v-card-title>

                            <v-card-text>
                                Möchtest du wirklich dein Profil löschen?
                                Diese Aktion kann nicht rückgangig gemacht werden.
                                Alle deine mit dem Profil verknüften Daten werden gelöscht!
                            </v-card-text>

                            <v-divider/>

                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="deleteProfile"
                                >
                                    Ich bestätige
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-container>
        </v-main>
    `,
    mounted () {
        request("get", "/profile/read")
            .then((data) => {
                appState.commit("setProfileData", data);
            })
            .catch((err) => {
                console.error("GET /profile/read failed");
                alertify.error("Profile Access denied");
                this.$router.push("/err");
            });
    },
    data () {
        return {
            showDialog: false,
        };
    },
    computed: {
        ...mapState([
            "profile"
        ]),
    },
    methods: {
        saveProfile () {
            const body = JSON.stringify(this.profile);
            request("post", "/profile/update", {}, body)
                .then(() => {
                    alertify.success("Profile Update successful");
                })
                .catch((err) => {
                    this.$router.push("/err");
                    alertify.error("Profile Update failed");
                });
        },
        deleteProfile () {
            this.showDialog = false;
            request("get", "profile/delete")
                .then(() => {
                    alertify.success("Profile was deleted");
                    setTimeout(() => {
                        this.$router.push("/home");
                        location.reload();
                    }, 800);
                })
                .catch(() => {
                    alertify.error("Profile Delete failed");
                });
        },
    }
};
