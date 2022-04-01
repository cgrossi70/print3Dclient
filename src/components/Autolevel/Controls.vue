<template>
  <v-container>
    <v-row>
      <v-col cols="12" xl="4" lg="8">  
        <Block :title="$t('Autolevel.ControProfiles')" toolbarColor="primary">

        </Block>
      </v-col>
      <v-col cols="12" xl="8" lg="7">
         <Block :title="$t('Autolevel.Mesh')" toolbarColor="primary">

        </Block>
      </v-col>
    </v-row>  

  </v-container> 
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'
@Component({
  components: {
    Block
  }
})
export default class ControlsClass extends Vue {

}
</script>

<style>

</style>