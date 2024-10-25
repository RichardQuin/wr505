<template>
  <div class="actor-card" @click="goToActorDetails">
    <img :src="actorImage" alt="Actor Image" class="actor-photo" />
    <h3>{{ actor.lastname + ' ' + actor.firstname }}</h3>
  </div>
</template>

<script>
import defaultImage from '../assets/image/sacha.png'; // Image par défaut

export default {
  name: 'ActorCard',
  props: {
    actor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    actorImage() {
      // Utilise l'image de l'acteur s'il y en a une, sinon l'image par défaut
      return this.actor.profileImage || defaultImage;
    },
  },
  methods: {
    goToActorDetails() {
      // Redirige vers la page des détails de l'acteur
      this.$router.push(`/actor/${this.actor.id}`);
    },
  },
};
</script>

<style scoped>
.actor-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  text-align: center;
}
.actor-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.actor-photo {
  width: 100px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
