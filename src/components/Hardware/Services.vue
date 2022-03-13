<template>
  <v-container class="py-0 my-0">
    <Block :title="$t('Services.Services')">
      <template v-slot:content>
        <v-card-text slot="content" class="pb-7">
            <div v-for="(item, index) in services" :key="index">
                <v-row>
                    <v-col class="py-0 mt-3">
                        {{item.name}}
                    </v-col>
                    <v-col class="py-0 mt-3" id="chips-container">
                        <v-chip x-small :class="item.active_state" class="white--text justify-center font-weight-bold text-uppercase">
                            {{ item.active_state }}
                        </v-chip>
                    </v-col>
                </v-row>
            </div>
        </v-card-text>
      </template>
    </Block>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Service } from '@/store/hardware/types.ts'
import Block from '@/components/General/Block.vue'

@Component({
  components: {
    Block
  }
})
export default class ServicesClass  extends Vue {
  get services (): Service {
    return this.$store.getters['hardware/getServices']
  }
}
</script>

<style>
#chips-container .v-chip.active {
  background: green;
  width:100px;
}
#chips-container .v-chip.activating {
  background: orange;
  width:100px;
}
#chips-container .v-chip.deactivating {
  background: orange;
  width:100px;
}
#chips-container .v-chip.inactive {
  background: #f83e70;
  width:100px;
}
#chips-container .v-chip.failed {
  background: brown;
  width:100px;
}
</style>
