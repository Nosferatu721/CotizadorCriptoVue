<script setup>
import { ref, reactive } from 'vue';
import Alerta from './components/Alerta.vue';
import Spinner from './components/Spinner.vue';
import Cotizacion from './components/Cotizacion.vue';

import useCripto from './composables/useCripto';

const { monedas, criptomonedas, cotizacion, showSpinner, obtenerCotizacion } = useCripto();

const error = ref('');

// Usando reactive para objetos
const cotizar = reactive({
  moneda: '',
  criptomoneda: '',
});


const cotizarCripto = () => {
  if (!cotizar.moneda || !cotizar.criptomoneda) {
    error.value = 'Todos los campos son obligatorios';
    setTimeout(() => {
      error.value = '';
    }, 3000);
    return;
  }

  obtenerCotizacion(cotizar);
};

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">{{ error }}</Alerta>
      <form class="formulario" @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Seleccione una moneda</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">-- Seleccione --</option>
            <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">
              {{ moneda.texto }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="criptomoneda">Seleccione una criptomoneda</label>
          <select id="criptomoneda" v-model="cotizar.criptomoneda">
            <option value="">-- Seleccione --</option>
            <option v-for="cripto in criptomonedas" :key="cripto.CoinInfo.Name" :value="cripto.CoinInfo.Name">
              {{ cripto.CoinInfo.FullName }}
            </option>
          </select>
        </div>

        <input type="submit" value="Cotizar" />
      </form>

      <!-- Mostrar la cotización -->
      <Cotizacion :cotizacion="cotizacion" />
      <div v-if="showSpinner">
        <Spinner />
      </div>
    </div>
  </div>
</template>
