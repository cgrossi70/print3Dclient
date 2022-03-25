<template>
  <v-container>
      <Console divHeight="calc(100vh - 230px)"/>
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
