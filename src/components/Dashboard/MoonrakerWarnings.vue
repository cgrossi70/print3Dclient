<template>
  <v-container>
    <Block title="Moonraker Warnings" toolbarColor="red darken-3">
      <template v-slot:content>
        <v-card-text>
            <p class="red--text" v-for="(warning,index) in moonrakerwarnings" :key="index">
              {{ warning }}
            </p>
        </v-card-text>
      </template>
    </Block>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
      Block
  }
})
export default class MonnrakerWarningsClass extends Vue {
  get moonrakerwarnings(): string {
    return this.$store.getters['printer/getMoonrakerWarnings']
  }
}
</script>
<style>
</style>
