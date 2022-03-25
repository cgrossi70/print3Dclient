<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar
            dense
            color="primary"
            dark
          >
            Config
          </v-toolbar>
          <v-card-text class="text-caption">
            <pre style="white-space: pre-wrap">
              {{ $store.state.printer}}
            </pre>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend ({
  data:  () => ({
  }),
})
</script>

<style lang="scss" scoped>
</style>
