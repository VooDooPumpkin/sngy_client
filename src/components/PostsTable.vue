<template>
  <v-data-table
      :loading="loading"
      show-select
      v-model="selected"
      :search="search"
      :headers="headers"
      :items="tableData"
      item-key="name"
      :item-class="itemClass"
      :items-per-page="5"
  >
    <template v-slot:top>
      <div class="d-flex">
        <h1>Занимаемые должности</h1>
        <v-spacer></v-spacer>
        <posts-table-toolbar
            :cnt-selected="selected.length"
            :show-fired="showFired"
            @update:show-fired="showFired=$event"
            :search="search"
            @update:search="search=$event"
        ></posts-table-toolbar>
      </div>
    </template>
    <template v-slot:header.data-table-select="{ props, on }">
      <v-simple-checkbox
          v-bind="props"
          @input="on.input"
          color="primary"
      ></v-simple-checkbox>
    </template>
    <template v-slot:item.data-table-select="{ item, isSelected, select}">
      <v-simple-checkbox v-if="!item.isFired"
          :value="isSelected"
          @input="select"
          color="primary"
      ></v-simple-checkbox>
    </template>
    <template v-slot:item.byHours="{ item }">
      <v-simple-checkbox
          color="primary"
          :value="item.byHours"
          @input="$emit('update:data-field', {index: item.index, field: 'byHours', value: $event})"
          :disabled="item.isFired"
      ></v-simple-checkbox>
    </template>
    <template v-slot:item.salaryAndFraction="{ item }">
      <div v-if="item.isFired">{{item.salaryAndFraction}}</div>
      <complex-edit-dialog
          v-else
          :index="item.index"
          :init-inputs="[
            {
              name: 'salary',
              value: item.salary,
              label: 'Ставка, руб',
              type: 'number'
            },
            {
              name: 'fraction',
              value: item.fraction,
              label: 'Ставка, %',
              type: 'number'
            }
          ]"
          @update:complex-value="updateComplexValue"
      >{{item.salaryAndFraction}}</complex-edit-dialog>
    </template>
    <template v-slot:item.base="{ item }">
      <div v-if="item.isFired">{{item.base}}</div>
      <complex-edit-dialog
          v-else
          :index="item.index"
          :init-inputs="[
            {
              name: 'base',
              value: item.base,
              label: 'База',
              type: 'number'
            },
          ]"
          @update:complex-value="updateComplexValue"
      >{{item.base}}</complex-edit-dialog>
    </template>
    <template v-slot:item.advance="{ item }">
      <div v-if="item.isFired">{{item.advance}}</div>
      <complex-edit-dialog
          v-else
          :index="item.index"
          :init-inputs="[
            {
              name: 'advance',
              value: item.advance,
              label: 'Аванс',
              type: 'number'
            },
          ]"
          @update:complex-value="updateComplexValue"
      >{{item.advance}}</complex-edit-dialog>
    </template>
  </v-data-table>
</template>

<script>
import ComplexEditDialog from "@/components/ComplexEditDialog";
import PostsTableToolbar from "@/components/PostsTableToolbar";

export default {
  name: "posts-table",
  props: {
    loading: Boolean,
    data: {
      type: Array,
      required: true,
      validator: function (value) {
        // Обязательные поля
        const fieldRequired = ['name', 'companyName', 'positionName', 'hireDate', 'fireDate', 'salary', 'fraction',
        'base', 'advance', 'byHours']
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
  computed: {
    tableData: {
      get: function () {
        let result = []
        this.data.forEach((el, index) => {
          if (this.showFired || el.fireDate === null ) {
            result.push({
              ...el,
              index,
              salaryAndFraction: `${el.salary}Р(${el.fraction}%)`,
              hireDate: el.hireDate !== null ? new Date(el.hireDate).toLocaleDateString() : null,
              fireDate: el.fireDate !== null ? new Date(el.fireDate).toLocaleDateString() : null,
              isFired: el.fireDate !== null
            })
          }
        })
        return result
      }
    }
  },
  methods: {
    updateComplexValue: function({index, data}) {
      for (const [field, value] of Object.entries(data)) {
        this.$emit('update:data-field', {index, field, value})
      }
    },
    itemClass: (item) => {
      return item.isFired ? "red lighten-3" : ""
    }
  },
  data: function () {
    return {
      showFired: true,
      search: '',
      headers: [
        {
          text: 'Сотрудник',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Компания',
          align: 'start',
          value: 'companyName',
          filterable: false
        },
        {
          text: 'Должность',
          align: 'start',
          value: 'positionName',
          filterable: false
        },
        {
          text: 'Дата приёма',
          align: 'end',
          value: 'hireDate',
          filterable: false
        },
        {
          text: 'Дата увольнения',
          align: 'end',
          value: 'fireDate',
          filterable: false
        },
        {
          text: 'Ставка',
          align: 'end',
          value: 'salaryAndFraction',
          filterable: false
        },
        {
          text: 'База',
          align: 'end',
          value: 'base',
          filterable: false
        },
        {
          text: 'Аванс',
          align: 'end',
          value: 'advance',
          filterable: false
        },
        {
          text: 'По часовая',
          align: 'end',
          value: 'byHours',
          filterable: false
        },
      ],
      selected: [],
    }
  },
  components: {
    "complex-edit-dialog": ComplexEditDialog,
    "posts-table-toolbar": PostsTableToolbar,
  },
}
</script>

<style scoped>
h1{
  font-size: 1.4rem;
  font-weight: normal;
}
</style>
