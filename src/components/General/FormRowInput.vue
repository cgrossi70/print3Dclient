<template>
    <v-card elevation="0" class="mb-0 pb-0">
      <v-row dense class="my-2">
        <v-col  dense cols="12" lg="7" xl="7">
          <v-row class="text-button">{{ title }}</v-row>
          <v-row class="text-caption mt-0 pt-1">{{ description }}</v-row>
        </v-col>
        <v-col  dense cols="12" lg="5" xl="5">
            <slot name="control"></slot>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card>
  
</template>
<script lang="ts">
import  {Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class FormRowSwitch extends Vue {

@Prop(String) readonly title: string | undefined
@Prop(String) readonly description: string | undefined

}
</script>
<style lang="scss" scoped>
.v-text-field__slot {
  height:32px;
}
</style>
