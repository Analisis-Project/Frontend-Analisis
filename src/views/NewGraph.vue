<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="flex flex-col text-white">
            <h1 class="text-4xl mb-10">Seleccione el tipo de grafo</h1>
            <div class="flex mb-10">
                <button :class="graphType === 'random' ? 'bg-blue-500' : 'bg-gray-500'"
                    class="mr-4 text-white flex  items-center p-2 rounded-lg hover:bg-gray-700  border-gray-700 group"
                    @click.prevent="graphType = 'random'">
                    <svg class="mr-2 w-5 h-5 text-white transition duration-75  group-hover:text-white"
                        viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="50" height="50" fill="url(#pattern1)" />
                        <defs>
                            <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#image0_2_104" transform="scale(0.0111111)" />
                            </pattern>
                            <image id="image0_2_104" width="90" height="90"
                                xlink:href="data:image/png;base64,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" />
                        </defs>
                    </svg>
                    <span>Aleatorio</span>
                </button>
                <button :class="graphType === 'custom' ? 'bg-blue-500' : 'bg-gray-500'"
                    class="mr-4 text-white flex  items-center p-2 rounded-lg hover:bg-gray-700 group border-2 border-gray-700"
                    @click.prevent="graphType = 'custom'">
                    <svg class="mr-2 w-5 h-5 text-white transition duration-75  group-hover:text-white"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14"></line>
                        <line x1="4" y1="10" x2="4" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="3"></line>
                        <line x1="20" y1="21" x2="20" y2="16"></line>
                        <line x1="20" y1="12" x2="20" y2="3"></line>
                        <line x1="1" y1="14" x2="7" y2="14"></line>
                        <line x1="9" y1="8" x2="15" y2="8"></line>
                        <line x1="17" y1="16" x2="23" y2="16"></line>
                    </svg>
                    <span>Personalizado</span>
                </button>
            </div>
            <form @submit.prevent="createGraph" class="mb-10">
                <div v-if="graphType === 'random'" class="mb-10">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-white">
                            Cantidad de nodos</label>
                        <input v-model="nodeCount" type="number" id="email"
                            class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="" required />
                    </div>
                    <div class="mb-5">
                        <input v-model="isComplete" type="checkbox" id="grafocompleto" name="grafocompleto" value="grafocompleto"
                            class="hidden peer"  />
                        <label for="grafocompleto"
                            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div class="block">
                                <div class="w-full text-lg font-semibold">Grafo Completo</div>
                            </div>
                            <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </label>
                    </div>
                    <div class="mb-5">
                        <input v-model="isConnected" type="checkbox" id="grafoconexo" name="grafoconexo" value="grafoconexo"
                            class="hidden peer"  />
                        <label for="grafoconexo"
                            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div class="block">
                                <div class="w-full text-lg font-semibold">Grafo Conexo</div>
                            </div>
                            <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </label>
                    </div>
                    <div class="mb-5">
                        <input v-model="isWeighted" type="checkbox" id="grafoponderado" name="grafoponderado" value="grafoponderado"
                            class="hidden peer"  />
                        <label for="grafoponderado"
                            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div class="block">
                                <div class="w-full text-lg font-semibold">Grafo Ponderado</div>
                            </div>
                            <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </label>
                    </div>
                    <div class="mb-5">
                        <input v-model="isDirected" type="checkbox" id="grafodirigido" name="grafodirigido" value="grafodirigido"
                            class="hidden peer"  />
                        <label for="grafodirigido"
                            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div class="block">
                                <div class="w-full text-lg font-semibold">Grafo Dirigido</div>
                            </div>
                            <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </label>
                    </div>

                </div>

                <button type="submit"
                    class="text-whitefocus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Crear
                    Grafo</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const graphType = ref('random');
const nodeCount = ref(1);
const isComplete = ref(false);
const isConnected = ref(false);
const isWeighted = ref(false);
const isDirected = ref(false);

const store = useStore();
const router = useRouter();

const createGraph = () => {
    if (graphType.value === 'random') {
        submitForm();
    } else {
        store.commit("clearJsonData");
        router.push('/');
    }
};

const getRandomGraph = () => {
    // Aquí puedes manejar la lógica para crear un grafo aleatorio
    console.log(nodeCount.value,isComplete.value, isConnected.value, isWeighted.value, isDirected.value )
    return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/graph/random-graph", {
            num_nodes: nodeCount.value,
            complete: isComplete.value,
            conex: isConnected.value,
            pondered: isWeighted.value,
            directed: isDirected.value
        })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};

const submitForm = async () => {
    // Aquí puedes manejar la lógica para crear el grafo basado en las opciones seleccionadas

    let response = await getRandomGraph();
    console.log(response.data);
    const jsonData = response.data;
    store.commit('setJsonData', jsonData);
    router.push('/');
};
</script>