<template>
  <v-container>
    <v-app-bar app clipped-left dense color="primary" dark>
      <v-app-bar-nav-icon
        @click="$store.state.sidebar = !$store.state.sidebar"
      ></v-app-bar-nav-icon>
      <v-app-bar-title> {{ $store.getters["getPrinterName"] }}</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn @click="emergencyStop" color="amber" text>
        <v-icon> mdi-alert-octagon </v-icon>
        {{ $t("Menubar.EmergencyStop") }}
      </v-btn>

      <v-badge
        v-if="announcementsLength !== 0"
        overlap
        color="red"
        :content="announcementsLength"
        :value="announcementsLength"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text small v-bind="attrs" v-on="on">
              <v-icon> mdi-email </v-icon>
            </v-btn>
          </template>
          <v-card style="max-width: 500px">
            <div v-for="(announcement, id) in announcements" :key="id">
              <v-card-title class="text-body-2 font-weight-bold">
                {{ announcement.title }}
              </v-card-title>

              <v-card-title class="text-body-2">
                {{ announcement.description }}
                <v-row class="mt-1">
                  <v-col>
                    <v-btn
                      small
                      color="primary"
                      dark
                      block
                      :href="announcement.url" target="__blank"
                    > 
                        ReadMore ...
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="success"
                      small
                      dark
                      block
                      @click="masAsRead(id)"
                    >
                      Mark as Read
                    </v-btn>
                  </v-col>
                </v-row>
                
                
                
              </v-card-title>
            </div>
          </v-card>
        </v-menu>
      </v-badge>

      <v-btn text small @click="$store.state.rightbar = !$store.state.rightbar">
        <v-icon> mdi-dots-vertical </v-icon>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Announcement } from "@/store/types";

@Component({})
export default class NavBarClass extends Vue {
  masAsRead(id: string){
    this.$store.dispatch('markAsRead',id)
  }

  get announcements(): Announcement[] {
    return this.$store.state.announcements.filter(
      (announcement: Announcement) => {
        return announcement.dismissed === false;
      }
    );
  }
  get announcementsLength(): number {
    return this.announcements.length;
  }

  emergencyStop(): void {
    this.$socket.sendObj("printer.emergency_stop", 4564);
  }
}
</script>
<style>
</style>
