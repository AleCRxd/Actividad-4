<template>
    <div class="welcome-container">
      <h1 class="welcome-title">Bienvenido</h1>
      <a href="#" class="explore-button" @click.prevent="$emit('irAlCrud')">
        Explorar hoja de vida
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PantallaBienvenida',
  };
  </script>
  
  <style scoped>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

  .welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background: linear-gradient(rgba(178, 111, 240, 0.5), rgb(178, 112, 240)), 
              url('/public/img/abstract-lines-with-dots-dark-background-lines-wave-abstract-stripe-design-curvy-white-surfaces-modern-abstract-background-digital-frequency-track-equalizer-stylized-line-art-background-vector.jpg');
  background-size: cover;
  background-position: center;
}
  
  .welcome-title {
    font-size: 3rem;
    color: #4a148c;
    margin-bottom: 20px;
  }
  
  .explore-button {
    padding: 10px 20px;
    font-size: 1.2rem;
    color: white;
    background-color: #1e88e5;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .explore-button:hover {
    background-color: #1565c0;
  }
  </style>