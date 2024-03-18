<template>
  <div :class="isOpen ? 'w-[15%]' : 'w-[5%]'" class="bg-[#060d27] transition-all duration-500 ease-in-out rounded-xl">
    <!-- Aquí va el contenido del sidenav -->
    <div class="p-4 flex flex-col" :class="!isOpen ? 'items-center' : ''">
      <div class="flex justify-between items-center">
        <img v-if="isOpen" src="../assets/img/Logo.png" alt="logo" class="w-1/2 rounded-full" />
        <button @click="isOpen = !isOpen" class="fill-white flex items-center"
          :class="isOpen ? 'justify-end w-1/4' : 'w-full'">
          <IconArrowClose class="w-full" v-if="isOpen" />
          <IconArrowOpen class="w-full" v-else />
        </button>
      </div>
      <h1 v-if="isOpen" class="text-xl pt-4 text-white text-center">
        Analisis de Algoritmos
      </h1>

      <div class="mt-4">
        <ul class="space-y-2 font-medium">
          <li>
            <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Archivo">
            <template #icon>
              <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" />
                <path d="M13 3v6h6" />
              </svg>
            </template>
            <SubMenuItem @click="navigateToPage('/new')" title="Nuevo Grafo">
              <template #icon>
                <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <g fill="none" fill-rule="evenodd">
                    <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" />
                  </g>
                </svg>
              </template>
            </SubMenuItem>
            <SubMenuItem @click="clearGraph" title="Cerrar">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" />
                </svg>
              </template>
            </SubMenuItem>
            <SubMenuItem @click="Save" title="Guardar">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </template>
            </SubMenuItem>
            <SubMenuItem @click="showModalSave" title="Guardar como">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
                </svg>
              </template>
            </SubMenuItem>
            <SubMenuItem @click="showModal" title="Exportar datos">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
              </template>
            </SubMenuItem>
            <SubMenuItem @click="navigateToPage('/opentxt')" title="Importar datos">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
                </svg>
              </template>
            </SubMenuItem>
            </MenuItem>
          </li>
          <li>
            <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Editar">
            <template #icon>
              <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
              </svg>
            </template>
            <SubMenuItem @click="undo" title="Deshacer">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 16l-6-6 6-6" />
                  <path d="M20 21v-7a4 4 0 0 0-4-4H5" />
                </svg>
              </template>
            </SubMenuItem>
            </MenuItem>
          </li>
          <li>
            <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Ejecutar">
            <template #icon>
              <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </template>
            <SubMenuItem title="Proceso 1">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
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
              <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M7 15h0M2 9.5h20" />
              </svg>
            </template>
            <SubMenuItem title="Gráfica" @click="goToGraph">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M20.4 14.5L16 10 4 20" />
                </svg>
              </template>
            </SubMenuItem>
            <SubMenuItem @click="goToTable" title="Tabla">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
                </svg>
              </template>
            </SubMenuItem>
            </MenuItem>
          </li>
          <li>
            <MenuItem @open-sidebar="isOpen = true" :isOpen="isOpen" title="Ayuda">
            <template #icon>
              <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </template>
            <SubMenuItem title="Ayuda">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </template>
            </SubMenuItem>
            <SubMenuItem title="Acerca de Grafos">
              <template #icon>
                <svg class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  <Modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      <h2 class="text-3xl text-white">Exportar datos</h2>
    </template>

    <template v-slot:body>
      <h3 class="text-xl">Seleccione de que manera desea exportar los datos</h3>
      <div class="flex mb-10">
        <button @click="saveExcel"
          class="bg-gray-500 mr-4 text-white flex items-center p-2 rounded-lg hover:bg-gray-700 border-gray-700 group">
          <svg class="mr-2 w-5 h-5" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="50" height="50" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_2_84" transform="scale(0.0111111)" />
              </pattern>
              <image id="image0_2_84" width="90" height="90"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFhklEQVR4nO2dWWhdRRjHp3Zzp4sitPVFqKk+uGCpIqjElkJdEDU+uIHQggs11QdXFFSCrWgLdV/wQVBaxQetUmtdoMFUqw+1uG+obZIqqOCaRrE/GTtXT76eZc69Z5k5nR/kIWfmP/PN/07mznzn3BulAoFAIBAIBLwB2B9YBmwBfqNeRoEBYJ5qEsAsYBvuMQIsVA2ayS6a3CyzzXLhOiPem23WZB8Y8dps4Ffc4vdGmo17nJbx4u8CzlG+gWOoPTE1z2wcQ/0fV7PMxjHU2NiaYzaOofaOrxlm4xgqPkb/zcYxVHKcfpuNY6j0WP01G8dQ2fH6aTaOoexi9s9sHEPZx+2X2TiGyhe7P2bjGCp//H6YjWOo9sbgvtk4hmp/HN0WKdb67kHiHjNKNHugWPfyBecaN3U4njSzR4tzLn9grjGqzS5rZhfrXr6g9ilUMLoagtEVEYyuiGB0RQSjKyIYXRHB6IoIRldEMLoigtEV4bPR24DVwI3A7cCjwPYMzcfAg8CtwC3AI8AHkfJPgMfEz08x7bwg6rzURKP7gbkJbV6SoPkCODMllrWm3lsxZa/EtDdL1LmmaUY/BIxPafO+GM2nwLSMWN6NJOknibKVor1fgHGiztNNMvo5izbfFJrdSbM/ohkP/BHRnCzKF4s2t8S08XVTjN4JTBH6g4B7gW+A74A3zGyL0i80+wH3AINm7d0M3Ck0y4TmVFH+lCifYTMA5YnRtwntBGCTha5P6C610KwVmimi/GZR3mMzAFUX2PM3cLjQXmmp7RU6vdPI4tuYWIci5eeJslU2gai6wJ6tMdr3LLXLhe5osR4nMVPoXouUdbXz6TJVF9jzgNAdYt7kbHgnpl+95u7I0PUIjd6vt+4rTohcPwD40yYQVRfYc4PQzSMf3TF9Hwo8maJZKepfZa5/JK6fbhuEqoscRi0WuoXkYzDpzjZwWcIH/TfH3N3WvNjGmv8vqi5yGNUjdOeSnw/1+pwQxwUxS5F+lGtypM5Mc32V0GYevVuoushh0uVCN5/20HvsixNi0XkSySmR8nFm5i8V136w7VzVRQ6DlgrdMXTGM/qbFUSbc2Jm9fWizlbgLKGxxYtHwu6POax0+gUqa2LiGU478uvftbkpR/M4vgIWqDrJYUp/jPZZOmdaxt58hyi/K/qXkLFrwRzvp6u6yWHIX8BhQnuc7f41Bdnm5zF1joyUj0mzmtw1KWnZ1IxhZeQ0pTdGr3MMP2fohk3SSfKwaGu6eUElF0Xq/Jee1S9SyqFJXz9DuUJOo7/Xh4yEg8fZwIXAiSb3HOUJk7Gbq3ccwBKZBjXtXJfQ75jtnOUW83XlEuTneW1aRpsb0nYOCZqjgB8T+nw7QbM8Jc4rEjSTTIp22CSpVsibDK4YrVkj89KizccZS+q3xgAnAF+SzC65FTS6tBTt7IS+tLGSFapsaJ9B4A7geJ1giiwhJwEvi7qvmvuIx+obBZH1dZFO4Fu+oZ5vZn3rZ3ZGBvDAhPFGU60thlw2WrK7pLptkXe8PhntFMHoighGV0QwuiKC0RURjC6PjebE2dXaQoZdR7F8pu8ZdrrLKmNHZ9WxJ2wCphYx3vIczujYk5k8tajxluOuRcce0F3keIt31rJjx9lY9HiLdTVHx46zxCIFWhTFpFLxk64cKdCi6CyVip8cnDCWImeyZGfTvnq+E6N1jrwstu8r/0whypyEsfRRHn2dGt2Lf1ydMJaJ+gHIEvrTbU7s1OjJwPv4xUDKePTOY12Bfa0r7Oat+RdOvpm9qAKzizNZzOxr9a19T94gh4AjMsy2fpy3EpObCnvMbmfNXh99LjtQjtnr454hCRRrdjC5ArP1h/rDTC7Z7GCyKhhjtn44Uu9a9JH9btvdxT+lHI069Wf8WgAAAABJRU5ErkJggg==" />
            </defs>
          </svg>

          <span>Excel</span>
        </button>
        <button @click="tomarImagen"
          class="bg-gray-500 mr-4 text-white flex items-center p-2 rounded-lg hover:bg-gray-700 group border-2 border-gray-700"
          @click.prevent="graphType = 'custom'">
          <svg class="mr-2 w-5 h-5" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="50" height="50" fill="url(#pattern2)" />
            <defs>
              <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_2_85" transform="scale(0.0111111)" />
              </pattern>
              <image id="image0_2_85" width="90" height="90"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJUlEQVR4nO2dv2tTURTHDw621iLoJNXJP6CtILEODi66uDsLLoI/RtGl/QeEVkf1H9HJoYqTdfIPaNVNKFWSCPqRh1c0bfJyb/Levefeng9kCeG87/nkcPLyEhIRwzAMwzCMbABmgfvAO+AbaekDm0BHSgI4C3xAH13gqhQ0yRollyXbrQvtdLOX7XZyDnSzlg3soYvvRcpGH5fHPPk94LrkBsqQP5nKk40y5F+usmSjDBnMVo5slCEH85UhG2XI8Iz5y0YZMjpn3rJRhtRnzVc2ypDxefOUjTLEL3N+slGG+OfOSzbKkLDs+chGGRKePw/ZKEMm60G/bJQhk/dxxeMSa7rPINHHQouyN5u1FxZOGw+m7KdOdr85c+HBtNGvZLc12c3aCwsVQhdYr3YdcNzdLgIb7gVHPTmI3gYWa+osuceoJq7dQUG+k7zoUWtJ+2THsTpcjg/rAfWeoJh2bdaL8aETUG8FxbRrs16MD/MB9eZRTLs268U0LfoEimnXZr0YHzoB9Wx1TCF6I0D0UxQjqfDM16tO3TxqLbt3dmqJY3W4HF+262Q7yTsoJ67dQUEh9Nx58oo7u6hul9y6UD3JuYnOHhMdCRMdCRMdCRMdCRMdCRMdCRMdCRMdCRMdCRMdCRMdidxFfwIeuk/B/15sWnb3fQ6o8wVYBS4AJ4FTwHngUVNXBnMW/RyYq6k/B7zwqPMVOF1Tp/qyzrNpw0oqpsy9FnCcNY96r4BjDdQZiaRiisyrExyr+k7dOF5X09tAnaFIKtqe5Ckme7aBOgeQVMSUHCjpsYxhEtmSirbXxSiAW8DPmmPtAkc86gStEUlFzEneD3Ab+DXieD+AGfEgZLIlFakke8h+KQH4ypZUaAgH3Nz3o4YfgXM59qI+HLAA3ACujTvj0N5LfuFK6kV1uJJ6UR2upF5UhyupF9XhSupFdbiSelEdrqReOGSIiY6DiY6EiY6EiY6EiT4EorX99Hyb7KYUncufKTTB25Si73F4uJNS9AywRfm8B44mE/3fXzhtFS75jGjATfbdao8V8gK5B7yp1kXySTYMwzAMw5AQfgPPoMzxcAO2qwAAAABJRU5ErkJggg==" />
            </defs>
          </svg>

          <span>Imagen</span>
        </button>
      </div>
    </template>
  </Modal>
  <Modal v-show="isModalVisibleSave" @close="closeModalSave">
    <template v-slot:header>
      <h2 class="text-3xl text-white">Guardar como...</h2>
    </template>

    <template v-slot:body>
      <h3 class="text-xl">Digite el nombre del archivo</h3>
      <div class="flex mb-10">
        <input v-model="nameArchive" type="text" class="border-2 border-gray-700 p-2 rounded-lg w-full text-black" />
      </div>
      <button @click="SaveAs"
        class="bg-gray-500 mr-4 text-white flex items-center p-2 rounded-lg hover:bg-gray-700 border-gray-700 group">
        <span>Guardar</span>
      </button>
    </template>
  </Modal>

</template>

<script setup>
import html2canvas from 'html2canvas';
import { defineProps, watch, defineEmits, ref, computed } from "vue";
import { useRouter } from "vue-router";
import IconArrowOpen from "./icons/IconArrowOpen.vue";
import IconArrowClose from "./icons/IconArrowClose.vue";
import MenuItem from "./MenuItem.vue";
import SubMenuItem from "./SubMenuItem.vue";
import { useStore } from "vuex";
import Modal from "./Modal.vue";
import axios from "axios";

const isModalVisible = ref(false);
const isModalVisibleSave = ref(false);

const nameArchive = ref("");

const goToGraph = () => {
  router.push("/");
};
const showModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const showModalSave = () => {
  isModalVisibleSave.value = true;
};

const closeModalSave = () => {
  isModalVisibleSave.value = false;
};

const props = defineProps({
  isOpen: Boolean,
});

const router = useRouter();

const navigateToPage = (page) => {
  router.push(page);
};

const store = useStore();

const clearGraph = () => {
  store.commit("clearJsonData");
};

const undo = () => {
  store.dispatch('undo');
}

const goToTable = () => {
  router.push("/table");
};

const jsonData = computed(() => store.state.jsonData);

const downloadJson = () => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(jsonData.value));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const Save = async () => {
  let nodesData = store.state.nodesData;
  let edgesData = store.state.edgesData;
  console.log(nodesData, edgesData);
  try {
    let response = await axios.post('http://127.0.0.1:8000/graph/save-json', {
      nodes: nodesData,
      edges: edgesData
    }, {
      responseType: 'text' // Indica a axios que la respuesta será un archivo
    });

    // Crear un objeto URL para el archivo
    let url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/json' }));
    // Crear un enlace para descargar el archivo
    let link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'graph.json'); // Nombre del archivo a descargar
    // Agregar el enlace al DOM
    document.body.appendChild(link);
    // Hacer clic en el enlace para descargar el archivo
    link.click();
    // Eliminar el enlace del DOM
    document.body.removeChild(link);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const SaveAs = async () => {
  closeModalSave();
  let nodesData = store.state.nodesData;
  let edgesData = store.state.edgesData;
  console.log(nodesData, edgesData);
  try {
    let response = await axios.post('http://127.0.0.1:8000/graph/save-json', {
      nodes: nodesData,
      edges: edgesData
    }, {
      responseType: 'text' // Indica a axios que la respuesta será un archivo
    });

    if (nameArchive.value === null || nameArchive.value === "") {
      nameArchive.value = "graph.json"; // Nombre por defecto si el usuario no ingresa nada
    }

    // Crear un objeto URL para el archivo
    let url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/json' }));
    // Crear un enlace para descargar el archivo
    let link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nameArchive.value); // Usar el nombre del archivo ingresado por el usuario
    // Agregar el enlace al DOM
    document.body.appendChild(link);
    // Hacer clic en el enlace para descargar el archivo
    link.click();
    // Eliminar el enlace del DOM
    document.body.removeChild(link);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const saveExcel = async () => {
  let nodesData = store.state.nodesData;
  let edgesData = store.state.edgesData;
  console.log(nodesData, edgesData);
  try {
    let response = await axios.post('http://127.0.0.1:8000/graph/excel-export', {
      nodes: nodesData,
      edges: edgesData
    }, {
      responseType: 'blob' // Indica a axios que la respuesta será un archivo
    });

    // Crear un objeto URL para el archivo
    let url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
    // Crear un enlace para descargar el archivo
    let link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv'); // Nombre del archivo a descargar
    // Agregar el enlace al DOM
    document.body.appendChild(link);
    // Hacer clic en el enlace para descargar el archivo
    link.click();
    // Eliminar el enlace del DOM
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};

const tomarImagen = async () => {
  const graphContainer = document.getElementById('network');
  const screenshot = await html2canvas(graphContainer);
  const imgData = screenshot.toDataURL("image/png");

  let link = document.createElement('a');
  link.href = imgData;
  link.download = 'screenshot.png';
  link.click();
};
</script>
