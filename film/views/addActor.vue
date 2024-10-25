<template>
  <div class="add-actor">
    <h1>Ajouter un Acteur</h1>
    <form @submit.prevent="handleAddActor">
      <div class="form-group">
        <label for="firstname">Prénom</label>
        <input type="text" v-model="firstname" required />
      </div>

      <div class="form-group">
        <label for="lastname">Nom</label>
        <input type="text" v-model="lastname" required />
      </div>

      <div class="form-group">
        <label for="dob">Date de Naissance</label>
        <input type="date" v-model="dob" required />
      </div>

      <div class="form-group">
        <label for="bio">Biographie</label>
        <textarea v-model="bio" required></textarea>
      </div>

      <div class="form-group">
        <label for="nationality">Nationalité</label>
        <input type="text" v-model="nationality" required />
      </div>

      <div class="form-group">
        <label for="gender">Genre</label>
        <select v-model="gender" required>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div class="form-group">
        <label for="awards">Récompenses</label>
        <input type="number" v-model.number="awards" placeholder="Entrez le nombre de récompenses (optionnel)" />
      </div>

      <div class="form-group">
        <label for="profileImage">Image de Profil</label>
        <input type="text" v-model="profileImage" placeholder="URL de l'image" />
      </div>

      <button type="submit">Ajouter l'Acteur</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const firstname = ref('');
const lastname = ref('');
const dob = ref('');
const bio = ref('');
const nationality = ref('');
const gender = ref('male'); // Valeur par défaut
const awards = ref(0); // Valeur par défaut pour les récompenses
const profileImage = ref('');
const error = ref(''); // Message d'erreur

const handleAddActor = async () => {
  error.value = ''; // Réinitialiser le message d'erreur
  try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8319/api/actors', {
      firstname: firstname.value,
      lastname: lastname.value,
      dob: dob.value,
      bio: bio.value,
      nationality: nationality.value,
      gender: gender.value,
      awards: parseInt(awards.value) || 0, // Convertir en entier, ou 0 par défaut
      profileImage: profileImage.value,
    }, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    alert('Acteur ajouté avec succès.');
    router.push('/actors'); // Redirige vers la page des acteurs après l'ajout
  } catch (err) {
    error.value = 'Une erreur est survenue lors de l\'ajout de l\'acteur. Vérifiez vos informations.';
    console.error(err);
  }
};
</script>

<style scoped>
.add-actor {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="date"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="number"]:focus,
select:focus,
textarea:focus {
  border-color: #007bff;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>

