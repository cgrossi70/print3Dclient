<template>
    <v-container class="pt-0">
      <FileEditor/>
      <Block :title="$t('ConfigFiles.Files')">

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
                      <v-checkbox
                        @change="onBackupFiles"
                        class="mt-0"
                        v-model="hideBackupFiles"
                        hide-details
                        :label="$t('ConfigFiles.HideBackupFiles')"
                      >
                    </v-checkbox>
                  </v-list-item>
                  <v-list-item class="minHeight36">
                      <v-checkbox
                        @change="onHiddenFiles"
                        class="mt-0"
                        v-model="hideHiddenFiles"
                        hide-details
                        :label="$t('ConfigFiles.HideHiddenFiles')"
                      >
                    </v-checkbox>
                  </v-list-item>
              </v-list>
          </v-menu>
        </span>

        <v-card-text class="pt-0 mt-0 mx-0 px-0" slot="content">
          <v-tabs
            @change="onTabChange()"
            v-model="tab"
            background-color="primary"
            dark
          >
            <v-tab key="config">{{ $t('ConfigFiles.Config') }}</v-tab>
            <v-tab key="logs">{{ $t('ConfigFiles.Logs') }}</v-tab>
            <v-tab key="docs">{{ $t('ConfigFiles.Docs') }}</v-tab>
            <v-tab key="config_examples">{{ $t('ConfigFiles.ConfigExamples') }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab"  >
            <v-tab-item key="config"  >
              <v-card>
                <v-card-text>
                  <FileManager/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item key="logs">
              <v-card>
                <v-card-text>
                  <FileManager/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item key="docs">
              <v-card>
                <v-card-text>
                  <FileManager/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item key="config_examples">
              <v-card>
                <v-card-text>
                  <FileManager/>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </Block>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FileEditor from '@/components/FileEditor.vue'
import FileManager from '@/components/FileManager.vue'
import Block from '@/components/General/Block.vue'
@Component({
  components:{
    FileEditor,
    FileManager,
    Block
  }
})
export default class ConfigFilesClass extends Vue {
  tab =  0
  editor = true
  tabs = ["config","logs","docs","config_examples"]
  hideHiddenFiles = false
  hideBackupFiles = false

  onHiddenFiles(): void{
    alert('Hidden')
  }
  onBackupFiles(): void{
    alert('Backup')
  }

  onTabChange(): void{
    this.$store.dispatch('file_manager/setPath','/'+this.tabs[this.tab])
    this.$socket.sendObj("server.files.get_directory",777777,{
      "path": this.$store.getters['file_manager/getPath'],
      "extended": false
    })
  }
}
</script>
<style>
</style>
