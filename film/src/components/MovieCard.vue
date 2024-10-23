<template>
  <div class="movie-card" @click="$emit('click')">
    <h3>{{ movie.title }}</h3>
    <p><strong>Release Date:</strong> {{ formattedReleaseDate }}</p>
    <p><strong>Duration:</strong> {{ movie.duration }} minutes</p>
    <p><strong>Director:</strong> {{ movie.director }}</p>
    <p><strong>Rating:</strong> {{ movie.rating }}</p>
    <p><strong>Categories:</strong> {{ movie.categories.join(', ') }}</p>
    <p><strong>Actors:</strong> {{ formattedActors }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Format le champ de date
    formattedReleaseDate() {
      const date = new Date(this.movie.releaseDate);
      return date.toLocaleDateString(); // Format de la date (par exemple, "11/10/1935")
    },
    // Formate la liste des acteurs
    formattedActors() {
      // Remplacez ici avec un appel API si vous avez besoin de récupérer les détails des acteurs
      return this.movie.actors.length
          ? this.movie.actors.map((actor) => `Actor ID: ${actor.split('/').pop()}`).join(', ')
          : 'No actors listed';
    },
  },
};
</script>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  margin: 10px; /* Ajoute un espace entre les cartes */
}
.movie-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
