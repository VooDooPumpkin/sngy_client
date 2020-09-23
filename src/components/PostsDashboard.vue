<template>
<v-container>
  <posts-table
      :loading="loading"
      :data="data"
      @update:data-field="updateDataField"
  ></posts-table>
</v-container>
</template>

<script>
import PostsTable from "@/components/PostsTable";
export default {
  name: "posts-dashboard",
  components: {
    "posts-table": PostsTable
  },
  methods: {
    updateDataField: function({ index, field, value }) {
      this.data[index][field] = value
    }
  },
  created () {
    fetch('http://localhost:8000/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "{getOccupations{ name, companyName, positionName, hireDate, fireDate, salary, fraction, base, advance, byHours }}"
      })
    }).then(res => {
      if(res.ok){
        this.loading = false
        res.json().then(res => {
          this.data = res.data.getOccupations
        })
      }
      else {
        res.json().then(res => {
          throw(res)
        })
      }
    }).catch(error => {
      this.loading = false
      console.error(error)
      alert("Ошибка загрузки данных")
    })
  },
  data: function () {
    return {
      loading: true,
      data: []
    }
  }
}
</script>

<style scoped>

</style>
