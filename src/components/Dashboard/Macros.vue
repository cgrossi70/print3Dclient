<template>
  <v-container>
    <Block :title="$t('Macros.Macros')">
      <template v-slot:content>
        <v-btn 
          v-for="(macro,id) in macros" :key="id"
          class = "ma-1"
          dark
          @click="handleMacro(macro.split(' ')[1])"
          color="cyan darken-2"
        >
          {{ macro.split(' ')[1]}}
        </v-btn>
      </template>
    </Block>
  </v-container>
</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
import { filter } from 'vue/types/umd'
@Component({
  components: {
    Block
  }
})
export default class MacrosClass extends Vue {
  get macros(): string[]{
    return this.$store.state.printer.printerObjects.filter((element: string) => {
      return element.search('gcode_macro')!=-1
    })
  }
  handleMacro(macro: string): void{
    this.$socket.sendCommand(macro)

  }
}
</script>

<style>

</style>