<template>
  <v-container>
    <Controls/>
  </v-container>
</template>

<script>
import { Component,Vue } from 'vue-property-decorator'
import Controls from '@/components/Autolevel/Controls.vue'
@Component({
  components: {
    Controls
  }
})
export default class AutolevelClass extends Vue{

}
</script>

<style>

</style>