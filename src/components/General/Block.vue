<template>
  <v-card>
    <v-toolbar
      :color="toolbarColor"
      dense
      dark
    >
      <v-icon v-if="leftIcon" class="mr-2" dark>
          {{ leftIcon }}
      </v-icon>
      <v-toolbar-title>
          {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <slot name="buttons"></slot>
        <v-btn v-if="collapsed" text x-small @click="collapsed = !collapsed">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn v-if="!collapsed" text x-small @click="collapsed = !collapsed">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div v-if="!collapsed">
      <slot name="content"></slot>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class BlockClass extends Vue {
  collapsed = false;

  @Prop(String) readonly title: string | undefined
  @Prop(String) readonly leftIcon: string | undefined
  @Prop({default: 'primary'}) readonly toolbarColor: string | undefined
}
</script>
<style>
</style>
