<script setup>
import {useRoute} from "vue-router";
import axios from 'axios'
import {onMounted,ref} from "vue";
import Categorycard from "@/components/CategoryCard.vue";
const router= useRoute()
let categori=ref(null)
console.log(router.params)
onMounted(() => {
  axios.get('http://localhost:8319/api/categoris/'+router.params.id).then((res)=> {
    console.log(res.data)
    categori.value=res.data
  })
})

</script>

<template>
  <div v-if="categori" >
    <categorycard :categori="categori"></categorycard>
  </div>
</template>