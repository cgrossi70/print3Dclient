<template>
  <v-container>
    <v-card elevation="0">
      <FormRowInput
        :title="$t('Settings.Temperature.HideGraph')"
        :description="$t('Settings.Temperature.HideGraphDesc')"
      >
        <template v-slot:control>
          <v-switch dense v-model="hideGraph" class="mt-0"></v-switch>
        </template>
      </FormRowInput>
      <FormRowInput
        :title="$t('Settings.Temperature.AutoscaleGraph')"
        :description="$t('Settings.Temperature.AutoscaleGraph')"
      >
        <template v-slot:control>
          <v-switch dense v-model="autoscaleGraph" class="mt-0"></v-switch>
        </template>
      </FormRowInput>
      <FormRowInput
        :title="$t('Settings.Temperature.Preheat')"
        :description="$t('Settings.Temperature.PreheatDesc')"
      >
        <template v-slot:control>
          <div v-if="preheatList">
            <v-simple-table dense>
              <thead>
                <tr>
                  <th class="text-left text-subtitle-1">
                    {{ $t("Settings.Temperature.Preheat") }}
                  </th>
                  <th class="text-right text-subtitle-1">
                    {{ $t("Settings.Temperature.Actions") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,id) in $store.state.config.preheats"
                  :key="id"
                >
                  <td class="text-button">{{ item.name }}</td>
                  <td class="text-right">
                    <v-btn
                      @click = "handleDelete(id)"
                      v-if="id!=0"
                      text
                      color="error"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>  
                    <v-btn
                      @click = "handleEditPreheat(id)"
                      text
                      color="success"
                    >
                      <v-icon>mdi-file-edit</v-icon>
                    </v-btn>
                    
                  </td>
                </tr>
              </tbody>
            </v-simple-table>

            <v-btn
              class="mt-3"
              block
              small
              color="success"
              @click="handleAddPreheat"
            >
              {{ $t("Settings.Temperature.AddPreheat") }}
            </v-btn>
          </div>
          <div v-if="addPreheat">
            <v-row>
              <v-col class="my-0 py-0">
                {{ $t("Settings.Temperature.Title") }}
                <v-text-field outlined v-model="name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="my-0 py-0">
                {{ $t("Settings.Temperature.G-Codes") }}
                <v-textarea outlined v-model="script"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="modeModify" class="my-0 py-0">
                <v-btn block small color="success" @click="handleSave">
                  {{ $t("Settings.Temperature.Save") }}
                </v-btn>
              </v-col>
              <v-col v-if="modeAdd" class="my-0 py-0">
                <v-btn block small color="success" @click="handleAdd">
                  {{ $t("Settings.Temperature.Add") }}
                </v-btn>
              </v-col>
              <v-col class="my-0 py-0">
                <v-btn block small color="error" @click="handleCancel">
                  {{ $t("Settings.Temperature.Cancel") }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </template>
      </FormRowInput>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormRowInput from "@/components/General/FormRowInput.vue";
@Component({
  components: {
    FormRowInput,
  },
})
export default class Temperature extends Vue {
  // Maneja el modo vista o modo agregar/modificar
  addPreheat  = false;
  preheatList = true;
  // v-model del form
  name        = "";
  script      = "";
  // Identifica el id modificado en mode modify (1000 never used)
  modifiedId  = 1000 
  // indica el modo del from para cambiar el bonton verde
  modeModify  = false
  modeAdd     = false

  // Muestra el form de edicion
  handleEditPreheat(preheatId: number): void {
    this.name         = this.$store.state.config.preheats[preheatId].name 
    this.script       = this.$store.state.config.preheats[preheatId].script 
    this.modifiedId   = preheatId
    this.modeModify   = true
    this.modeAdd      = false
    this.addPreheat   = true
    this.preheatList  = false
  }

    // Muestra el form de Add
  handleAddPreheat(): void {
    this.name = ''
    this.script = ''
    this.modeModify   = false;
    this.modeAdd      = true
    this.addPreheat   = true;
    this.preheatList  = false;
  }
  
  // Borra el preheat modificado
  handleDelete(preheatId: number): void{
    this.$store.dispatch('deleteConfigArrayItem',{
      "item": "preheats",
      "value": preheatId
    })
  }
  
  // Guarda el preheat modificado
  handleSave(): void{
    this.$store.dispatch('editConfigArrayItem',{
      "item": "preheats",
      "value": {
        id:     this.modifiedId,
        name:   this.name,
        script: this.script
      }
    })
    this.modifiedId   = 1000
    this.modeModify   = false
    this.addPreheat   = false
    this.preheatList  = true
  }
  
  // Agrega el preheat nuevo
  handleAdd(): void {
    this.$store.dispatch('addConfigArrayItem',{
      "item": "preheats",
      "value": {
        name:   this.name,
        script: this.script
      }
    })
    this.addPreheat  = false;
    this.preheatList = true;
    this.modeAdd     = false
  }


  // Cancela la operaion
  handleCancel(): void {
    this.addPreheat   = false;
    this.preheatList  = true;
    this.modeModify   = false;
    this.modeAdd      = false
  }

  
  get autoscaleGraph(): boolean {
    return this.$store.getters["getAutoscaleGraph"];
  }
  set autoscaleGraph(value: boolean) {
    this.$store.dispatch("setConfigItem", {
      item: "autoscaleGraph",
      value: value,
    });
  }

  get hideGraph(): boolean {
    return this.$store.getters["getHideGraph"];
  }
  set hideGraph(value: boolean) {
    this.$store.dispatch("setConfigItem", { item: "hideGraph", value: value });
  }
}
</script>
<style lang="scss" scoped>
</style>
