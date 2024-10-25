<template>
  <div class="edit-actor">
    <h1>Modifier l'Acteur</h1>

    <div class="form-group">
      <label for="firstname">Prénom:</label>
      <input type="text" v-model="actorForm.firstname" id="firstname" required />
    </div>

    <div class="form-group">
      <label for="lastname">Nom:</label>
      <input type="text" v-model="actorForm.lastname" id="lastname" required />
    </div>

    <div class="form-group">
      <label for="dob">Date de Naissance:</label>
      <input type="date" v-model="formattedDob" id="dob" required />
    </div>

    <div class="form-group">
      <label for="nationality">Nationalité:</label>
      <input type="text" v-model="actorForm.nationality" id="nationality" required />
    </div>

    <div class="form-group">
      <label for="gender">Genre:</label>
      <select v-model="actorForm.gender" id="gender" required>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="other">Autre</option>
      </select>
    </div>

    <div class="form-group">
      <label for="awards">Récompenses:</label>
      <input type="number" v-model="actorForm.awards" id="awards" min="0" required />
    </div>

    <div class="form-group">
      <label for="bio">Biographie:</label>
      <textarea v-model="actorForm.bio" id="bio" rows="4" required></textarea>
    </div>

    <button @click="updateActor">Sauvegarder les Modifications</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const actorForm = ref({
  firstname: '',
  lastname: '',
  dob: '',
  nationality: '',
  gender: 'male',
  awards: 0,
  bio: ''
});

// Formater la date de naissance pour l'affichage
const formattedDob = computed({
  get() {
    return actorForm.value.dob ? actorForm.value.dob.substring(0, 10) : '';
  },
  set(value) {
    actorForm.value.dob = value;
  }
});

// Charger les détails de l'acteur pour l'édition
onMounted(async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8319/api/actors/${route.params.id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const actor = response.data;
    actorForm.value = {
      firstname: actor.firstname,
      lastname: actor.lastname,
      dob: actor.dob,
      nationality: actor.nationality,
      gender: actor.gender,
      awards: actor.awards,
      bio: actor.bio
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'acteur:", error);
  }
});

// Mettre à jour les détails de l'acteur
const updateActor = async () => {
  const token = localStorage.getItem('token');
  try {
    await axios.patch(`http://localhost:8319/api/actors/${route.params.id}`, actorForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/merge-patch+json"
      },
    });
    alert('Acteur modifié avec succès.');
    router.push(`/actors/${route.params.id}`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'acteur:", error);
    alert("Une erreur s'est produite lors de la mise à jour de l'acteur.");
  }
};
</script>

<style scoped>
.edit-actor {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
