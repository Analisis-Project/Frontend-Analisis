<template>
    <div :class="isOpen ? 'w-[15%]' : 'w-[5%]'" class="bg-[#060d27] transition-all duration-500 ease-in-out rounded-xl">
        <!-- Aquí va el contenido del sidenav -->
        <div class="p-4 flex flex-col" :class="!isOpen ? 'items-center' : ''">
            <div class="flex justify-between items-center">
                <img v-if="isOpen" src="../assets/img/Logo.png" alt="logo" class="w-1/2 rounded-full" />
                <button @click="isOpen = !isOpen" class=" fill-white flex items-center"
                    :class="isOpen ? 'justify-end w-1/4' : 'w-full'">
                    <IconArrowClose class="w-full" v-if="isOpen" />
                    <IconArrowOpen class="w-full" v-else />
                </button>
            </div>
            <h1 v-if="isOpen" class="text-xl pt-4 text-white text-center">Analisis de Algoritmos</h1>

            <div class="mt-4">
                <ul class="space-y-2 font-medium">
                    <li>
                        <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Archivo">
                        <template #icon>
                            <svg class="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" />
                                <path d="M13 3v6h6" />
                            </svg>
                        </template>
                        <SubMenuItem @click="navigateToPage('/new')" title="Nuevo Grafo">
                            <template #icon>
                                <svg class="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem @click="navigateToPage('/openjson')" title="Abrir">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <g fill="none" fill-rule="evenodd">
                                        <path
                                            d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" />
                                    </g>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem @click="clearGraph" title="Cerrar">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem @click="downloadJson" title="Guardar">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                    <polyline points="7 3 7 8 15 8"></polyline>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Guardar como">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Exportar datos">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Importar datos">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Salir">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                                </svg>
                            </template>
                        </SubMenuItem>
                        </MenuItem>
                    </li>
                    <li>
                        <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Editar">
                        <template #icon>
                            <svg class="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                            </svg>
                        </template>
                        <SubMenuItem title="Deshacer">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M10 16l-6-6 6-6" />
                                    <path d="M20 21v-7a4 4 0 0 0-4-4H5" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Nodo">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Arco">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M13.8 12H3m9 10a10 10 0 1 0 0-20" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        </MenuItem>
                    </li>
                    <li>
                        <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Ejecutar">
                        <template #icon>
                            <svg class="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </template>
                        <SubMenuItem title="Proceso 1">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                    <rect x="9" y="9" width="6" height="6"></rect>
                                    <line x1="9" y1="1" x2="9" y2="4"></line>
                                    <line x1="15" y1="1" x2="15" y2="4"></line>
                                    <line x1="9" y1="20" x2="9" y2="23"></line>
                                    <line x1="15" y1="20" x2="15" y2="23"></line>
                                    <line x1="20" y1="9" x2="23" y2="9"></line>
                                    <line x1="20" y1="14" x2="23" y2="14"></line>
                                    <line x1="1" y1="9" x2="4" y2="9"></line>
                                    <line x1="1" y1="14" x2="4" y2="14"></line>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Proceso 2">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                    <rect x="9" y="9" width="6" height="6"></rect>
                                    <line x1="9" y1="1" x2="9" y2="4"></line>
                                    <line x1="15" y1="1" x2="15" y2="4"></line>
                                    <line x1="9" y1="20" x2="9" y2="23"></line>
                                    <line x1="15" y1="20" x2="15" y2="23"></line>
                                    <line x1="20" y1="9" x2="23" y2="9"></line>
                                    <line x1="20" y1="14" x2="23" y2="14"></line>
                                    <line x1="1" y1="9" x2="4" y2="9"></line>
                                    <line x1="1" y1="14" x2="4" y2="14"></line>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Proceso 3">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                    <rect x="9" y="9" width="6" height="6"></rect>
                                    <line x1="9" y1="1" x2="9" y2="4"></line>
                                    <line x1="15" y1="1" x2="15" y2="4"></line>
                                    <line x1="9" y1="20" x2="9" y2="23"></line>
                                    <line x1="15" y1="20" x2="15" y2="23"></line>
                                    <line x1="20" y1="9" x2="23" y2="9"></line>
                                    <line x1="20" y1="14" x2="23" y2="14"></line>
                                    <line x1="1" y1="9" x2="4" y2="9"></line>
                                    <line x1="1" y1="14" x2="4" y2="14"></line>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Proceso 4">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                    <rect x="9" y="9" width="6" height="6"></rect>
                                    <line x1="9" y1="1" x2="9" y2="4"></line>
                                    <line x1="15" y1="1" x2="15" y2="4"></line>
                                    <line x1="9" y1="20" x2="9" y2="23"></line>
                                    <line x1="15" y1="20" x2="15" y2="23"></line>
                                    <line x1="20" y1="9" x2="23" y2="9"></line>
                                    <line x1="20" y1="14" x2="23" y2="14"></line>
                                    <line x1="1" y1="9" x2="4" y2="9"></line>
                                    <line x1="1" y1="14" x2="4" y2="14"></line>
                                </svg>
                            </template>
                        </SubMenuItem>
                        </MenuItem>
                    </li>
                    <li>
                        <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Herramientas">
                        <template #icon>
                            <svg class="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path
                                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                                </path>
                            </svg>
                        </template>
                        </MenuItem>
                    </li>
                    <li>
                        <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Ventana">
                        <template #icon>
                            <svg class="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M7 15h0M2 9.5h20" />
                            </svg>
                        </template>
                        <SubMenuItem title="Gráfica">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M20.4 14.5L16 10 4 20" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Tabla">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
                                </svg>
                            </template>
                        </SubMenuItem>
                        </MenuItem>
                    </li>
                    <li>
                        <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Ayuda">
                        <template #icon>
                            <svg class="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </template>
                        <SubMenuItem title="Ayuda">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </template>
                        </SubMenuItem>
                        <SubMenuItem title="Acerca de Grafos">
                            <template #icon>
                                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                            </template>
                        </SubMenuItem>
                        </MenuItem>
                    </li>

                </ul>
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps, watch, defineEmits,ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import IconArrowOpen from './icons/IconArrowOpen.vue';
import IconArrowClose from './icons/IconArrowClose.vue';
import MenuItem from './MenuItem.vue';
import SubMenuItem from './SubMenuItem.vue';
import Modal from './Modal.vue';
import { useStore } from 'vuex';

const props = defineProps({
    isOpen: Boolean
});

const router = useRouter();

const navigateToPage = (page) => {
    router.push(page);
};

const store = useStore();

  const clearGraph = () => {
    store.commit('clearJsonData');
  };

const jsonData = computed(() => store.state.jsonData);

const downloadJson = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData.value));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
</script>
