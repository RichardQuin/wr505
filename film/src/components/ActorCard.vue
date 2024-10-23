<template>
  <div class="actor-card" @click="$emit('click')">
    <h3>{{ actor.lastname + ' ' + actor.firstname }}</h3>
    <p>{{ actorAge }} years old</p>
    <p><strong>Nationality:</strong> {{ actor.nationality }}</p>
    <p><strong>Gender:</strong> {{ actor.gender }}</p>
    <p><strong>Awards:</strong> {{ actor.awards }}</p>
    <p><strong>Bio:</strong> {{ truncatedBio }}</p>
    <p><strong>Movies:</strong></p>
    <ul>
      <li v-for="movie in actor.movies" :key="movie">{{ movie }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ActorCard',
  props: {
    actor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    actorAge() {
      const birthDate = new Date(this.actor.dob);
      const ageDiff = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiff);
      return Math.abs(ageDate.getUTCFullYear() - 1970); // Calculates age
    },
    truncatedBio() {
      // Vérifie si la bio dépasse 200 caractères
      if (this.actor.bio.length > 200) {
        return this.actor.bio.slice(0, 200) + '...'; // Ajoute "..." si tronquée
      }
      return this.actor.bio; // Retourne la bio complète si elle ne dépasse pas 200 caractères
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
}
.actor-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
