export const ErrorPageView = {
    template: `
        <v-main>
            <v-container
                class="d-flex flex-column justify-start align-center"
            >
                <h1>
                    Es ist ein Fehler aufgetreten
                </h1>
                <p
                    class="pa-2"
                    style="text-align:center"
                >
                    Sollte dieser Fehler häufiger auftreten die App neu starten oder ein Ticket aufmachen.
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
            </v-container>
        </v-main>
    `,
};
