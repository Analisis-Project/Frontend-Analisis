<template>
  <div class="flex items-center justify-center ">
    <!-- Diagnóstico: Imprimir `data.value` para ver su contenido actual -->
    <table v-if="dataIsReady" class="w-1/2 text-sm text-center rounded-3xl mt-20"> 
      <thead class="text-base  text-gray-400">
        <tr>
          <th class="px-6 py-3 font-medium text-white  bg-gray-500">Nodo / Conexión</th>
          <th class="px-6 py-3 font-medium  text-white bg-gray-800" v-for="(value, key) in data" :key="'header-' + key">Nodo {{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-700" v-for="(conexiones, nodoOrigen) in data" :key="'row-' + nodoOrigen">
          <td  class="px-6 py-4 font-medium  whitespace-nowrap text-white bg-gray-800">Nodo {{ nodoOrigen }}</td>
          <td v-for="(estado, nodoDestino) in conexiones" :key="'cell-' + nodoOrigen + '-' + nodoDestino">
            {{ estado }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import axios from 'axios'
import {ref, onBeforeMount,computed} from 'vue'
import { useStore } from "vuex";

const data = ref();

// Esta propiedad computada asegura que solo intentamos renderizar la tabla
// cuando data tiene propiedades y, por lo tanto, es "listo" para ser mostrado.
const dataIsReady = computed(() => !!data.value && Object.keys(data.value).length > 0);

const store = useStore();


onBeforeMount(() => {
  Save();
});

const Save = async () => {
  let nodesData = store.state.nodesData;
  let edgesData = store.state.edgesData;
  try {
    let response = await axios.post('http://127.0.0.1:8000/graph/matrix', {
      nodes: nodesData,
      edges: edgesData
    }, {
      responseType: 'text' // Indica a axios que la respuesta será un archivo
    });

    data.value = JSON.parse(response.data);
    console.log(data.value);
  } catch (error) {
    console.error(error);
  }
};
</script>
