<template>
  <v-container>
      <Console divHeight="divRoute"/>
  </v-container>
</template>

<script lang="ts">
import Console from '@/components/Dashboard/Console.vue'
import Vue from 'vue'
export default Vue.extend ({
    components: {
        Console
    }
})
</script>

<style>

</style>
