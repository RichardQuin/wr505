<template>
  <div class="category-card">
    <h3>{{ categoris.title }}</h3>
    <button @click.stop="editCategory">Modifier</button> <!-- Bouton Modifier -->
    <button @click.stop="deleteCategory">Supprimer</button> <!-- Bouton Supprimer -->
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'; // Importer useRouter

export default {
  name: 'CategoryCard',
  props: {
    categoris: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter(); // Initialiser useRouter

    return {
      router,
    };
  },
  methods: {
    editCategory() {
      // Rediriger vers la page d'édition de catégorie
      this.router.push({ name: 'editcategory', params: { id: this.categoris.id } });
    },
    async deleteCategory() {
      const token = localStorage.getItem('token'); // Récupérer le token pour l'autorisation
      const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:8319/api/categoris/${this.categoris.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
            },
          });
          alert('Catégorie supprimée avec succès.');
          this.$emit('categoryDeleted', this.categoris.id); // Émettre un événement pour notifier la suppression
        } catch (error) {
          console.error('Erreur lors de la suppression de la catégorie:', error);
          alert("Une erreur s'est produite lors de la suppression de la catégorie.");
        }
      }
    },
  },
};
</script>

<style scoped>
.category-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  color: black;
  transition: box-shadow 0.3s, background-color 0.3s;
  background-color: #f0f0f0; /* Couleur de fond par défaut */
  text-align: center; /* Centrer le texte */
  margin: 10px; /* Espacement entre les cartes */
}

.category-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0; /* Couleur de fond au survol */
}

button {
  margin: 5px; /* Espacement entre les boutons */
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

button:hover {
  background-color: #0056b3;
}
</style>
