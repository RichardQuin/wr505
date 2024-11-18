<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Formulaire pour l'ajout/mise à jour d'une catégorie
const categoryForm = ref({
  title: '', // Autres champs du formulaire
  updated_at: new Date().toISOString().slice(0, 16), // Initialise avec la date et l'heure actuelles
});

// Ajouter une nouvelle catégorie
const addCategory = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8319/api/categoris', categoryForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });
    alert('Catégorie ajoutée avec succès');
    router.push('/categories'); // Redirection après l'ajout
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie:", error);
  }
};

// Mettre à jour une catégorie existante (l'ID de la catégorie doit être fourni)
const updateCategory = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:8319/api/categoris/${id}`, categoryForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });
    alert('Catégorie mise à jour avec succès');
    router.push('/categories'); // Redirection après la mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie:", error);
  }
};
</script>

<template>
  <div class="category-form">
    <h2>Ajouter une Catégorie</h2>

    <!-- Champ Titre de la Catégorie -->
    <input
        type="text"
        v-model="categoryForm.title"
        placeholder="Titre de la catégorie"
    />

    <!-- Champ Date de Mise à Jour -->
    <label for="updated_at">Date de Mise à Jour :</label>
    <input
        type="datetime-local"
        v-model="categoryForm.updated_at"
        id="updated_at"
    />

    <!-- Bouton Ajouter Catégorie -->
    <button @click="addCategory">Ajouter la Catégorie</button>
  </div>
</template>

<style scoped>
.category-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
