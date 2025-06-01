<template>
  <div>
    <div class="hoja-de-vida-container">
      <div class="header">
        <img class="profile-picture" src="/img/perfil.jpg" />
        <div class="header-info">
          <h1>Alejandro Castillo Romero</h1>
          <h2>Estudiante de Ingeniería de Software</h2>
        </div>
      </div>

      <div class="section">
        <h3>SOBRE MÍ</h3>
        <p>
          Soy estudiante de Ingeniería de Software en la Universidad de Cartagena en el Centro Tutorial San Juan Nepomuceno.
          A lo largo de mis estudios he aprendido a manejar lenguajes de programación, para distintos fines, como el desarrollo web
          y he aprendido sobre componentes de computadores y sobre sistemas operativos. Me considero una persona proactiva,
          responsable y con muchas ganas de aprender y aplicar mis conocimientos en un entorno profesional. Estoy en busca de
          oportunidades para crecer y aportar valor mientras sigo avanzando en mi formación académica.
        </p>
      </div>

      <div class="section">
        <h3>EDUCACIÓN</h3>
        <p><strong>2021 - 2022:</strong> Bachiller Técnico en Asistencia Administrativa</p>
        <p><strong>2023 - Actualidad:</strong> Ingeniería de Software</p>
      </div>

      <div class="section">
        <h3>HABILIDADES</h3>
        <div class="skills">
          <span>Liderazgo</span>
          <span>Gestión del tiempo</span>
          <span>Comunicación</span>
          <span>Trabajo en equipo</span>
          <span>Toma de decisiones</span>
          <span>Pensamiento estratégico</span>
        </div>
      </div>

      <div class="section">
        <h3>HOBBIES/INTERESES</h3>
        <ul>
          <li>Estudiar programación</li>
          <li>Hacer ejercicio</li>
          <li>Ver temas relacionados con computadores y sistemas operativos y experimentar con los mismos</li>
        </ul>
      </div>

      <div class="section">
        <h3>IDIOMAS</h3>
        <div class="languages">
          <span>Español</span>
          <span>Inglés</span>
        </div>
      </div>
    </div>

    <div class="experiencias-container">
      <h3>EXPERIENCIAS PROFESIONALES</h3>
      <form @submit.prevent="experienciaEnEdicion ? guardarEdicion() : agregarExperiencia()">
        <input v-model="nuevaExperiencia.empresa" placeholder="Empresa" required />
        <input v-model="nuevaExperiencia.titulo" placeholder="Título" required />
        <textarea v-model="nuevaExperiencia.descripcion" placeholder="Descripción" required></textarea>
        <input v-model="nuevaExperiencia.fechaInicio" type="date" required />
        <input v-model="nuevaExperiencia.fechaFin" type="date" required />
        <button type="submit">
          {{ experienciaEnEdicion ? 'Guardar Cambios' : 'Agregar Experiencia' }}
        </button>
    </form>

      <ul>
        <li v-for="experiencia in experiencias" :key="experiencia._id">
          <h4>{{ experiencia.titulo }}</h4>
          <p><strong>Empresa:</strong> {{ experiencia.empresa }}</p>
          <p>{{ experiencia.descripcion }}</p>
          <p><strong>Desde:</strong> {{ experiencia.fechaInicio }} <strong>Hasta:</strong> {{ experiencia.fechaFin }}</p>
          <button @click="prepararEdicion(experiencia)">Editar</button>
          <button @click="eliminarExperiencia(experiencia._id)">Eliminar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      experiencias: [],
      nuevaExperiencia: {
        empresa: '',
        titulo: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
      },
      experienciaEnEdicion: null,
    };
  },

methods: {
  async cargarExperiencias() {
    try {
      const response = await axios.get('http://localhost:3000/api/experiencias');
      this.experiencias = response.data;
    } catch (err) {
      console.error('Error al cargar experiencias:', err);
    }
  },

  async agregarExperiencia() {
    try {
      console.log('Método agregarExperiencia llamado');
      const response = await axios.post('http://localhost:3000/api/experiencias', this.nuevaExperiencia);
      this.experiencias.push(response.data);
      this.nuevaExperiencia = { empresa: '', titulo: '', descripcion: '', fechaInicio: '', fechaFin: '' };
    } catch (err) {
      console.error('Error al agregar experiencia:', err);
    }
  },

  prepararEdicion(experiencia) {
    this.experienciaEnEdicion = { ...experiencia };
    this.nuevaExperiencia = { ...experiencia };
  },

  async guardarEdicion() {
    if (!this.experienciaEnEdicion) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/experiencias/${this.experienciaEnEdicion._id}`,
        this.nuevaExperiencia
      );
      this.experiencias = this.experiencias.map((exp) =>
        exp._id === this.experienciaEnEdicion._id ? response.data : exp
      );
      this.nuevaExperiencia = { empresa: '', titulo: '', descripcion: '', fechaInicio: '', fechaFin: '' };
      this.experienciaEnEdicion = null;
    } catch (err) {
      console.error('Error al guardar la edición:', err);
    }
  },

  async eliminarExperiencia(id) {
    try {
      await axios.delete(`http://localhost:3000/api/experiencias/${id}`);
      this.experiencias = this.experiencias.filter((exp) => exp._id !== id);
    } catch (err) {
      console.error('Error al eliminar experiencia:', err);
    }
  },
},
  mounted() {
    this.cargarExperiencias();
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(rgba(138, 43, 226, 0.3), rgba(127, 24, 223, 0.3)),
    url('/public/img/abstract-lines-with-dots-dark-background-lines-wave-abstract-stripe-design-curvy-white-surfaces-modern-abstract-background-digital-frequency-track-equalizer-stylized-line-art-background-vector.jpg') no-repeat center center fixed;
  background-size: cover;
}

.hoja-de-vida-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 20px;
  border: 3px solid #4a148c;
}

.header-info h1 {
  font-size: 1.8rem;
  color: #4a148c;
  margin: 0;
}

.header-info h2 {
  font-size: 1.2rem;
  color: #1e88e5;
  margin: 5px 0 0;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  font-size: 1.4rem;
  color: #4a148c;
  margin-bottom: 10px;
  border-bottom: 2px solid #4a148c;
  display: inline-block;
}

.section p {
  font-size: 1rem;
  color: #333;
  margin: 5px 0;
}

.skills,
.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skills span,
.languages span {
  background: #e3f2fd;
  color: #1e88e5;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

ul {
  padding-left: 20px;
  list-style-type: disc;
}

ul li {
  font-size: 1rem;
  color: #333;
}

.experiencias-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

form input,
form textarea,
form button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1rem;
}

li {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #e57373;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #d32f2f;
}
</style>
