<template>
  <div id="app">
    <PantallaBienvenida
      v-if="mostrarBienvenida"
      @irAlCrud="mostrarCrud = true; mostrarBienvenida = false"
    />
    <HojaDeVida v-if="mostrarCrud" />
  </div>
</template>

<script>
import PantallaBienvenida from './components/PantallaBienvenida.vue';
import HojaDeVida from './components/HojaDeVida.vue';

export default {
  name: 'App',
  components: {
    PantallaBienvenida,
    HojaDeVida,
  },
  data() {
    return {
      mostrarBienvenida: true,
      mostrarCrud: false,
    };
  },
};
</script>
