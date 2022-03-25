<template>
  <v-container>
    <Block :title="$t('console.console')">
      <span slot="buttons">
          <v-menu
            bottom
            :offset-x="true"
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-list>
                  <v-list-item class="minHeight36">
                      <v-checkbox class="mt-0" v-model="hideTemperature" hide-details  :label="$t('console.HideTemperatures')"></v-checkbox>
                  </v-list-item>
              </v-list>
          </v-menu>
      </span>

      <v-card-text slot="content">
          <v-row class="mb-0">
              <v-col class="pb-0" lg="10" xl="10">
                  <v-text-field
                      @keyup="uppercase"
                      class="pt-0 to_uppercase"
                      v-model = "command"
                      height = "20px"
                      :placeholder = "$t('console.GCodeCommand')"
                  >
                  </v-text-field>
              </v-col>
              <v-col lg="2" xl="2">
                  <v-btn
                      small
                      @click="send"
                      block
                      color="success"
                  >
                      <v-icon>
                          mdi-send
                      </v-icon>
                  </v-btn>
              </v-col>
          </v-row>
          <v-row class="my-0">
             <v-card-text class="py-0">
              <div  :style="`overflow-y: auto; height: ${divHeight};`">

                     <v-simple-table dense>
                         <tbody>
                             <tr class="my-0 py-0" v-for="(command,id) in $store.getters['printer/getConsoleCommands'].slice().reverse()" :key="id">
                                  <td style="width:50px" class="text-caption">{{command.date}}</td>
                                  <td class="text-caption"><div :class="`${command.color}--text`">{{command.message}}</div></td>
                              </tr>
                         </tbody>
                     </v-simple-table>
                 </div>
             </v-card-text>
          </v-row>
      </v-card-text>
    </Block>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Block from '@/components/General/Block.vue'

@Component({
  components: {
      Block,
  }
})
export default class ConsoleClass extends Vue {
  private command = ''
  private items = [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
  ]

  @Prop(String) readonly divHeight: string

  uppercase(event: KeyboardEvent): void {
    if(event.key === "Enter")
      this.send();
  }
  send(): void {
      this.$socket.sendCommand(this.command)
      this.command = ''
  }

  get hideTemperature(): boolean{
    return this.$store.getters.getHideTemperature
  }
  set hideTemperature(value: boolean ){
    this.$store.dispatch('setConfigItem',{"section": "console","key": "hideTemperature", "value": value})
  }


}
</script>

<style>
.minHeight36 {
  min-height: 24px;
}
.divRoute {
  height: calc(100vh - 230px)
}
.divComponent {
  height: 200px
}
</style>
