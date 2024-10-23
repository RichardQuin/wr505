<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  error.value = ''; // Réinitialiser le message d'erreur
  try {
    const response = await axios.post('http://localhost:8319/api/auth', {
      email: email.value,
      password: password.value,
    });

    // Supposons que le token se trouve dans response.data.token
    const token = response.data.token;

    // Stocker le token dans le localStorage
    localStorage.setItem('token', token);

    // Rediriger vers la page d'accueil ou la route souhaitée
    router.push('/');
  } catch (err) {
    error.value = 'Email ou mot de passe invalide.';
    console.error(err);
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
