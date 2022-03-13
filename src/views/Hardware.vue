<template>
    <v-container>
        <v-row >
            <v-col lg="6" xl="4">
                <v-row><Machine/></v-row>
                <v-row v-if="$vuetify.breakpoint.name !== 'xl'">
                  <ConfigFiles/>
                </v-row>

            </v-col>
            <v-col lg="6" xl="3">
                <v-row><Updates/></v-row>
                <v-row>
                    <v-col><Services/></v-col>
                  </v-row>
                  <v-row>
                    <v-col><EndStops/></v-col>
                </v-row>
                <v-row v-if="$vuetify.breakpoint.name !== 'xl'">
                  <Auxiliar/>
                </v-row>
            </v-col>
            <v-col v-if="$vuetify.breakpoint.name === 'xl'" lg="6" xl="5">
              <ConfigFiles/>
            </v-col>

        </v-row>
    </v-container>
</template>

<script lang="ts">
import Machine from "@/components/Hardware/Machine.vue";
import EndStops from "@/components/Hardware/EndStops.vue";
import Services from "@/components/Hardware/Services.vue";
import Updates from "@/components/Hardware/Updates.vue";
import ConfigFiles from "@/components/Hardware/ConfigFiles.vue";
import Vue from 'vue'

export default Vue.extend ({
  data:  () => ({

  }),
  components: {
    Machine,
    EndStops,
    Services,
    Updates,
    ConfigFiles,
  }
})
</script>

<style>

</style>
