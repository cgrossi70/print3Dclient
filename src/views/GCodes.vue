
<template>
    <v-container>
        <GCodesFiles/>
    </v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import GCodesFiles from '@/components/GCodes/ListFiles.vue'
export default Vue.extend ({
  components: {
    GCodesFiles
  }
})
</script>

<style>

</style>
