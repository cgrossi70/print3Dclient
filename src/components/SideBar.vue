<template>
    <v-container>
        <v-navigation-drawer v-model="sidebar" clipped app color="primary">
        <v-list dense>
            <v-list-item v-for="(item, index) in drawerItems" :key="index">
            <v-list-item-title class="white--text">
              <router-link :to="item.path">
                <v-icon class="white--text">{{ item.icon }}</v-icon>
                <span class="text-uppercase pl-5 white--text">
                    {{ $t('Sidebar.'+item.name) }}
                </span>
              </router-link>
            </v-list-item-title>
            </v-list-item>
        </v-list>
        <template  v-slot:append>
          <span class="ml-2 font-weight-bold white--text">
            Version: {{ $store.state.hardware.update.updates.version_info['print3Dclient'].version}}
          </span>
        </template>
      </v-navigation-drawer>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class SideBarClass extends Vue {
  get drawerItems() {
    return this.$router.options.routes
  }
  get sidebar(): boolean {
    return this.$store.state.sidebar
  }
  set sidebar(newValue: boolean) {
    this.$store.state.sidebar=newValue
  }
}
</script>
<style>
</style>
