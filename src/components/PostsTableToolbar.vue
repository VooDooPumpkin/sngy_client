<template>
  <div>
    <div>
      <v-text-field
          append-icon="search"
          label="Поиск по сотруднику"
          :value="search"
          @input="$emit('update:search', $event)"
      ></v-text-field>
    </div>
    <div class="d-flex align-center flex-nowrap ctrl-row">
      <v-checkbox
          label="Показывать уволенных"
          color="green darken-2"
          :input-value="showFired"
          @change="$emit('update:show-fired', $event)"
      >
      </v-checkbox>
      <v-btn
          color="green lighten-3"
      >
        принять на должность
      </v-btn>
      <v-btn
          color="red lighten-3"
          :disabled="cntSelected === 0"
      >
        снять с должност{{cntSelected > 1 ? 'ей' : 'и'}}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "posts-table-toolbar",
  props: {
    cntSelected: {
      type:Number,
      required: true
    },
    showFired: {
      type: Boolean,
      required: true,
    },
    search: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.ctrl-row>*:not(:last-child) {
  margin-right: 1rem;
}
</style>
