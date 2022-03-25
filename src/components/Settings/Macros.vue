<template>
  <v-container>
    <Block :title="$t('Macros.Macros')">
      Prueba
    </Block>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  Block
})
export default class MacrosClass extends Vue {

}
</script>

<style>

</style>