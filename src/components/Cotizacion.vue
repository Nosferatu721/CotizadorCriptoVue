<script setup>
defineProps({
  cotizacion: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-if="Object.keys(cotizacion).length > 0" class="contenedor-resultado">
    <h2>Cotización</h2>
    <div class="resultado">
      <img :src="`https://www.cryptocompare.com/${cotizacion.IMAGEURL}`" />
      <div>
        <p>
          Precio: <span>{{ cotizacion.PRICE }}</span>
        </p>
        <p>
          Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span>
        </p>
        <p>
          Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span>
        </p>
        <p>
          Variación últimas 24h: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span>
        </p>
        <p>
          Última actualización: <span>{{ cotizacion.LASTUPDATE }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
