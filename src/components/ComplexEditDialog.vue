<template>
  <v-edit-dialog
      @cancel="refresh"
      @save="$emit('update:complex-value', {index, data:genReturnValue()})"
      large
      persistent
      save-text="Сохранить"
      cancel-text="Отменить"
  >
    <slot></slot>
    <template v-slot:input>
      <div class="d-flex flex-nowrap">
        <v-text-field
            v-for="(input, index) in inputs"
            :key="input.name"
            :class=" inputs.length == index + 1 ? '' : 'mr-2'"
            v-model="input.value"
            :type="input.type"
            :label="input.label"
            :autofocus="index === 0"
        ></v-text-field>
      </div>
    </template>
  </v-edit-dialog>
</template>

<script>
export default {
  name: "complex-edit-dialog",
  props: {
    index: Number,
    initInputs: {
      type: Array,
      required: true,
      validate: function(value) {
        const fieldRequired = ['name', 'value', 'label', 'type']
        for (let i = 0; i < value.length; i++){
          const el = value[i]
          if (!el instanceof Object){
            console.error(`Element with index ${i} is not an Object`)
            return false
          }
          for (let i = 0; i < fieldRequired.length; i++) {
            if (!el.hasOwnProperty(fieldRequired[i])) {
              console.error(`Field '${fieldRequired[i]}' is required`)
              return false
            }
          }
        }
        return true
      }
    }
  },
  data: function () {
    return {
      inputs: [...this.initInputs]
    }
  },
  methods: {
    refresh: function () {
      this.inputs = [...this.initInputs]
    },
    genReturnValue: function () {
      let result = {}
      this.inputs.forEach((el) => {
        result[el.name] = el.value
      })
      return result
    }
  }
}
</script>

<style scoped>

</style>
