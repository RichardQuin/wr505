<script setup>
import {useRoute} from "vue-router";
import axios from 'axios'
import {onMounted,ref} from "vue";
import ActorCard from "@/components/ActorCard.vue";
const router= useRoute()
let actor=ref(null)
console.log(router.params)
onMounted(() => {
  axios.get('http://localhost:8319/api/actors/'+router.params.id).then((res)=> {
    console.log(res.data)
    actor.value=res.data
  })
})


</script>

<template>
  <div v-if="actor" >
    <actor-card :actor="actor"></actor-card>
  </div>
</template>