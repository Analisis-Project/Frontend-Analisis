<template>
  <div
    :class="isOpen ? 'w-[15%]' : 'w-[5%]'"
    class="bg-[#060d27] transition-all duration-500 ease-in-out rounded-xl"
  >
    <!-- Aquí va el contenido del sidenav -->
    <div class="p-4 flex flex-col" :class="!isOpen ? 'items-center' : ''">
      <div class="flex justify-between items-center">
        <img
          v-if="isOpen"
          src="../assets/img/Logo.png"
          alt="logo"
          class="w-1/2 rounded-full"
        />
        <button
          @click="isOpen = !isOpen"
          class="fill-white flex items-center"
          :class="isOpen ? 'justify-end w-1/4' : 'w-full'"
        >
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
            <MenuItem
              @open-sidebar="isOpen = true"
              :isOpen="isOpen"
              title="Archivo"
            >
              <template #icon>
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z"
                  />
                  <path d="M13 3v6h6" />
                </svg>
              </template>
              <SubMenuItem @click="navigateToPage('/new')" title="Nuevo Grafo">
                <template #icon>
                  <svg
                    class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
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
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path
                        d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"
                      />
                    </g>
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem @click="clearGraph" title="Cerrar">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" />
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem @click="downloadJson" title="Guardar">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                    ></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem title="Guardar como">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6"
                    />
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem @click="showModal" title="Exportar datos">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"
                    />
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem @click ="navigateToPage('/opentxt')" title="Importar datos">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"
                    />
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem title="Salir">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                  </svg>
                </template>
              </SubMenuItem>
            </MenuItem>
          </li>
          <li>
            <MenuItem
              @open-sidebar="isOpen = true"
              :isOpen="isOpen"
              title="Editar"
            >
              <template #icon>
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                </svg>
              </template>
              <SubMenuItem title="Deshacer">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M10 16l-6-6 6-6" />
                    <path d="M20 21v-7a4 4 0 0 0-4-4H5" />
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem title="Nodo" @click="showModalNode">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem title="Arco">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M10 17l5-5-5-5" />
                    <path d="M13.8 12H3m9 10a10 10 0 1 0 0-20" />
                  </svg>
                </template>
              </SubMenuItem>
            </MenuItem>
          </li>
          <li>
            <MenuItem
              @open-sidebar="isOpen = true"
              :isOpen="isOpen"
              title="Ejecutar"
            >
              <template #icon>
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </template>
              <SubMenuItem title="Proceso 1">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
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
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
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
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
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
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
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
            <MenuItem
              @open-sidebar="isOpen = true"
              :isOpen="isOpen"
              title="Herramientas"
            >
              <template #icon>
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                  ></path>
                </svg>
              </template>
            </MenuItem>
          </li>
          <li>
            <MenuItem
              @open-sidebar="isOpen = true"
              :isOpen="isOpen"
              title="Ventana"
            >
              <template #icon>
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 15h0M2 9.5h20" />
                </svg>
              </template>
              <SubMenuItem title="Gráfica">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M20.4 14.5L16 10 4 20" />
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem title="Tabla">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
                  </svg>
                </template>
              </SubMenuItem>
            </MenuItem>
          </li>
          <li>
            <MenuItem
              @open-sidebar="isOpen = true"
              :isOpen="isOpen"
              title="Ayuda"
            >
              <template #icon>
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </template>
              <SubMenuItem title="Ayuda">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </template>
              </SubMenuItem>
              <SubMenuItem title="Acerca de Grafos">
                <template #icon>
                  <svg
                    class="mr-2 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
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
        <button
          :class="graphType === 'random' ? 'bg-blue-500' : 'bg-gray-500'"
          class="mr-4 text-white flex items-center p-2 rounded-lg hover:bg-gray-700 border-gray-700 group"
          @click.prevent="graphType = 'random'"
        >
          <svg
            class="mr-2 w-5 h-5 text-white transition duration-75 group-hover:text-white"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="50" height="50" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlink:href="#image0_2_104" transform="scale(0.0111111)" />
              </pattern>
              <image
                id="image0_2_104"
                width="90"
                height="90"
                xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>
          <span>Excel</span>
        </button>
        <button
          :class="graphType === 'custom' ? 'bg-blue-500' : 'bg-gray-500'"
          class="mr-4 text-white flex items-center p-2 rounded-lg hover:bg-gray-700 group border-2 border-gray-700"
          @click.prevent="graphType = 'custom'"
        >
          <svg
            class="mr-2 w-5 h-5 text-white transition duration-75 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
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
          <span>Imagen</span>
        </button>
      </div>
    </template>
  </Modal>
  
</template>

<script setup>
import { defineProps, watch, defineEmits, ref, computed } from "vue";
import { useRouter } from "vue-router";
import IconArrowOpen from "./icons/IconArrowOpen.vue";
import IconArrowClose from "./icons/IconArrowClose.vue";
import MenuItem from "./MenuItem.vue";
import SubMenuItem from "./SubMenuItem.vue";
import { useStore } from "vuex";
import Modal from "./Modal.vue";

const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
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
</script>
