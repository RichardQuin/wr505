<template>
  <div>
    <div class="register-container">
      <h1>Inscription</h1>
      <form @submit.prevent="handleRegister" v-if="!success">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="Entrez votre email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" placeholder="Entrez votre mot de passe" required />
        </div>
        <button type="submit" class="btn-primary">S'inscrire</button>
      </form>

      <div v-if="success" class="success-message">
        Inscription réussie ! Vous pouvez maintenant vous <router-link to="/login">connecter ici</router-link>.
      </div>

      <div v-if="error" class="error">{{ error }}</div>
      <div class="login-prompt" v-if="!success">
        <p>Déjà inscrit? <router-link to="/login">Connectez-vous ici</router-link>.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import bcrypt from 'bcryptjs'; // Importez bcryptjs pour le hachage des mots de passe

// Références réactives
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref(false);
const router = useRouter();

// Fonction pour gérer l'inscription
const handleRegister = async () => {
  error.value = ''; // Réinitialiser le message d'erreur
  success.value = false; // Réinitialiser le message de succès
  try {
    // Hachage du mot de passe
    const hashedPassword = bcrypt.hashSync(password.value, 10);

    // Envoi des données à l'API
    const response = await axios.post('http://localhost:8319/api/users', {
      email: email.value,
      password: hashedPassword,
    });

    // Gestion du token
    const token = response.data.token;
    localStorage.setItem('token', token);

    // Afficher le message de succès
    success.value = true;

    // Redirection vers la page de connexion
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  } catch (err) {
    error.value = 'Une erreur est survenue lors de l\'inscription. Vérifiez vos informations.';
    console.error(err);
  }
};
</script>

<style scoped>
/* Layout and positioning */
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

/* Form elements */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

/* Button styles */
button {
  display: block;
  padding: 10px;
  font-size: 1.2em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto; /* Center the button */
}

button:hover {
  background-color: #0056b3;
}

/* Error message */
.error {
  color: red;
  margin-top: 15px;
  text-align: center;
}

/* Success message */
.success-message {
  color: green;
  margin-top: 15px;
  text-align: center;
}

/* Login prompt */
.login-prompt {
  margin-top: 20px;
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .register-container {
    margin: 50px 20px;
    padding: 20px;
  }
}
</style>
