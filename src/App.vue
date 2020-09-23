<template>
  <v-app>
    <posts-dashboard></posts-dashboard>
  </v-app>
</template>

<script>
import PostsDashboard from "@/components/PostsDashboard";
export default {
  components:{
    "posts-dashboard": PostsDashboard
  }
}
</script>
