<template>
  <v-container>
    <v-dialog 
      v-model="confirmDialog" 
      persistent 
      max-width="400"
    >
      <v-card>
        <v-toolbar
          dark
          dense
          color="primary"
        >
          <v-toolbar-title>
            {{ $t("Menubar.EmergencyStop") }}
          </v-toolbar-title>
        </v-toolbar>
        
        <v-card-text class="mt-4">
          <span class="text-button">
          {{ $t("Menubar.EmergencyStopMessage") }}
          </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" dark @click="confirmDialog = false">
            {{ $t("Menubar.No") }}
          </v-btn>

          <v-btn color="green darken-1" dark @click="sendEemergencyStop">
            {{ $t("Menubar.Yes") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-app-bar app clipped-left dense color="primary" dark>
      <v-app-bar-nav-icon
        @click="$store.state.sidebar = !$store.state.sidebar"
      ></v-app-bar-nav-icon>
      <v-app-bar-title> {{ $store.getters["getPrinterName"] }}</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn dark small @click="emergencyStop" color="orange darken-2" >
        <v-icon> mdi-alert-octagon </v-icon>
        <!-- {{ $t("Menubar.EmergencyStop") }} -->
      </v-btn>

      <v-badge
        
        offset-x="25"
        offset-y="15"
        color="red"
        
        :value="$store.getters['hardware/update/needUpdate']"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text small v-bind="attrs" v-on="on">
              <v-icon> mdi-bell </v-icon>
            </v-btn>
          </template>
          <!-- <v-card style="max-width: 500px">
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
                      :href="announcement.url"
                      target="__blank"
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
          </v-card> -->
        </v-menu>
      </v-badge>

      <v-badge
        v-if="announcementsLength !== 0"
        offset-x="25"
        offset-y="15"
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
                      :href="announcement.url"
                      target="__blank"
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
  confirmDialog = false;

  masAsRead(id: string): void {
    this.$store.dispatch("markAsRead", id);
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
    if (this.$store.state.config.general.confirmEmergencyStop)
      this.confirmDialog = true;
    else 
      this.sendEemergencyStop();
    
  }

  sendEemergencyStop(): void {
    this.$socket.sendObj("printer.emergency_stop", 4564);
    this.confirmDialog = false;
  }
}
</script>
<style>
</style>
