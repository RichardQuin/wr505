<template>
  <div>
    <div class="login-container">
      <h1>Connexion</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="Entrez votre email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" placeholder="Entrez votre mot de passe" required />
        </div>
        <button type="submit" class="btn-primary">Se connecter</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>

      <!-- Register button -->
      <button @click="navigateToRegister" class="btn-secondary">Créer un compte</button>
    </div>
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
  error.value = ''; // Reset error message
  try {
    const response = await axios.post('http://localhost:8319/api/auth', {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;

    // Store token
    localStorage.setItem('token', token);

    // Redirect to homepage
    router.push('/');
  } catch (err) {
    error.value = 'Email ou mot de passe invalide.';
    console.error(err);
  }
};

// Navigate to the register page
const navigateToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
/* Layout and positioning */
.login-container {
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
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 15px auto; /* Centers the button */
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

/* Error message */
.error {
  color: red;
  margin-top: 15px;
  text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
  .login-container {
    margin: 50px 20px;
    padding: 20px;
  }
}
</style>
