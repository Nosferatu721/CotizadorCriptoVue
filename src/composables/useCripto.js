import { ref, onMounted, reactive } from 'vue';

export default function useCripto() {
  const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', texto: 'Peso Mexicano' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
    { codigo: 'COP', texto: 'Peso Colombiano' },
  ]);

  const criptomonedas = ref([]);
  const cotizacion = reactive({});
  const showSpinner = ref(false);

  onMounted(async () => {
    try {
      const { Data } = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD').then((r) => r.json());
      criptomonedas.value = Data;
    } catch (error) {
      console.error('Error:', error);
    }
  });

  const obtenerCotizacion = async (cotizar) => {
    try {
      showSpinner.value = true;
      Object.keys(cotizacion).forEach((key) => delete cotizacion[key]);
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cotizar.criptomoneda}&tsyms=${cotizar.moneda}`;
      const response = await fetch(url);
      const data = await response.json();
      // Con reactive, asignamos las propiedades directamente
      Object.assign(cotizacion, data.DISPLAY[cotizar.criptomoneda][cotizar.moneda]);
    } catch (error) {
      console.error('Error al obtener la cotización:', error);
      // Limpiar cotización en caso de error
      Object.keys(cotizacion).forEach((key) => delete cotizacion[key]);
    } finally {
      showSpinner.value = false;
    }
  };

  return {
    monedas,
    criptomonedas,
    cotizacion,
    showSpinner,
    obtenerCotizacion,
  };
}
