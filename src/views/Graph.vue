<script setup>
import { ref, onMounted, onBeforeMount, watch, computed } from "vue";
import { useStore } from "vuex";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network.js";
import Modal from "@/components/Modal.vue";

let resolveModalPromise = null;
let resolveModalEdit = null;

let currentNode = null;

const store = useStore();
const jsonData = computed(() => store.state.jsonData);
let json = null;
let container = ref(null);
let nodesDataSet = new DataSet();
let edgesDataSet = new DataSet();

let nodesData = [];
let edgesData = [];

let newNode = null;

const isModalVisibleNodeAdd = ref(false);
const isModalVisibleNodeEdit = ref(false);

const showModalNodeAdd = () => {
  isModalVisibleNodeAdd.value = true;
};

const closeModalNodeAdd = () => {
  isModalVisibleNodeAdd.value = false;
};

const showModalNodeEdit = () => {
  isModalVisibleNodeEdit.value = true;
};

const closeModalNodeEdit = () => {
  resolveModalEdit();
  isModalVisibleNodeEdit.value = false;
};

class Node {
  constructor(
    id,
    label,
    data = {},
    type = "",
    radius = 0,
    coordenates = { x: 0, y: 0 }
  ) {
    this.id = id;
    this.label = label;
    this.data = data;
    this.type = type;
    this.radius = radius;
    this.coordenates = coordenates;
  }
}

class Edge {
  constructor(from, to, weight = 0) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

onBeforeMount(() => {
  json = jsonData.value;
});

// Watcher para actualizar el grafo cuando cambia jsonData
watch(jsonData, (newData, oldData) => {
  updateGraph(newData);
});

onMounted(() => {
  // Inicializar el grafo con los datos actuales
  updateGraph(json);
});

function updateGraph(jsonData) {
  let nodes = [];
  let edges = [];

  if (jsonData && jsonData.graph && jsonData.graph[0].data) {
    jsonData.graph[0].data.forEach((node) => {
      let newnode = new Node(
        node.id,
        node.label,
        node.data,
        node.type,
        node.radius,
        node.coordenates
      );
      nodesData.push(newnode);
      nodes.push({
        id: newnode.id,
        label: newnode.label,
        x: newnode.coordenates.x,
        y: newnode.coordenates.y,
      });
      node.linkedTo.forEach((link) => {
        let newedge = new Edge(node.id, link.nodeId, link.weight);
        edgesData.push(newedge);
        edges.push({
          from: newedge.from,
          to: newedge.to,
          label: String(newedge.weight),
        });
      });
    });
  }
  console.log("Nodos: ", nodesData);
  console.log("Aristas: ", edgesData);

  nodesDataSet = new DataSet(nodes);
  edgesDataSet = new DataSet(edges);

  let data = {
    nodes: nodesDataSet,
    edges: edgesDataSet,
  };

  let network = new Network(container.value, data, {});
  // Si la red ya existe, actualizar datos, de lo contrario, crear una nueva

  network = new Network(container.value, data, {});
  var options = {
    autoResize: true,
    height: "100%",
    width: "100%",
    locale: "en",
    clickToUse: false,
    manipulation: {
      enabled: true,
      initiallyActive: false,
      addNode: addNodeFunction,
      addEdge: true,
      editNode: editNodeFunction,
      editEdge: true,
      deleteNode: deleteNodeFunction,
      deleteEdge: true,
    },
    physics: {
      enabled: false,
    },
  };

  network.setOptions(options);
}

function addNodeFunction(nodeData, callback) {
  showModalNodeAdd();

  // Crear una nueva Promise que se resolverá cuando el modal se cierre
  new Promise((resolve) => {
    resolveModalPromise = resolve;
  }).then(() => {
    // Este código se ejecutará cuando el modal se cierre
    nodeData.id = newNode.id;
    nodeData.label = newNode.label;
    nodeData.x = newNode.coordenates.x;
    nodeData.y = newNode.coordenates.y;
    callback(nodeData);
  });
}

// Función para agregar un nodo
const addNodeForm = () => {
  newNode = new Node(
    nodesData.length + 1, // ID del nuevo nodo
    label.value,
    {}, // Datos del nodo
    type.value,
    radius.value,
    { x: posx.value, y: posy.value }
  );

  nodesData.push(newNode);
  console.log("Agregando nodos: ", nodesData);
  // Cerrar el modal y resolver la Promise
  closeModalNodeAdd();
  resolveModalPromise();
};

function editNodeFunction(nodeData, callback) {
  // Encuentra el índice del nodo que se está editando en el array nodesData
  const index = nodesData.findIndex((node) => node.id === nodeData.id);

  // Si el nodo se encuentra en el array, actualiza ese elemento
  if (index !== -1) {
    let nodearray = nodesData[index];
    // Configura el formulario con los datos del nodo existente
    label.value = nodeData.label;
    type.value = nodearray.type;
    radius.value = nodearray.radius;
    posx.value = nodeData.x;
    posy.value = nodeData.y;
  }

  currentNode = nodeData;

  showModalNodeEdit();

  // Crear una nueva Promise que se resolverá cuando el modal se cierre
  new Promise((resolve) => {
    resolveModalEdit = resolve;
  }).then(() => {
    // Este código se ejecutará cuando el modal se cierre
    callback(currentNode);
  });
}

const editNodeForm = () => {
  // Actualiza el nodo existente con los nuevos valores del formulario
  currentNode.label = label.value;
  currentNode.type = type.value;
  currentNode.radius = radius.value;
  currentNode.x = posx.value;
  currentNode.y = posy.value;

  // Encuentra el índice del nodo que se está editando en el array nodesData
  const index = nodesData.findIndex((node) => node.id === currentNode.id);

  // Si el nodo se encuentra en el array, actualiza ese elemento
  if (index !== -1) {
    nodesData[index] = new Node(
      currentNode.id,
      currentNode.label,
      currentNode.data,
      currentNode.type,
      currentNode.radius,
      { x: currentNode.x, y: currentNode.y }
    );
  }
  console.log("Editando nodos: ", nodesData);
  // Cerrar el modal y resolver la Promise
  closeModalNodeEdit();
  resolveModalEdit();
};

function deleteNodeFunction(nodeData, callback) {
  console.log("Eliminando nodo: ", nodeData.nodes[0]);
  // Filtra el array nodesData para eliminar el nodo con el id dado
  nodesData = nodesData.filter((node) => node.id !== nodeData.nodes[0]);
  console.log("Eliminando nodos: ", nodesData);
  // Llama al callback
  callback(nodeData);
}

// Función para agregar una arista
function addEdge(edge) {
  edgesDataSet.add(edge);
}

// Función para editar una arista
function editEdge(id, newInfo) {
  edgesDataSet.update({ id, ...newInfo });
}

// Función para eliminar una arista
function removeEdge(id) {
  edgesDataSet.remove(id);
}

const label = ref("");
const type = ref("");
const radius = ref(0);
const posx = ref(0);
const posy = ref(0);
</script>

<template>
  <main class="w-full h-full">
    <div class="w-full h-full" id="network" ref="container"></div>
    <Modal v-show="isModalVisibleNodeAdd" @close="closeModalNodeAdd">
      <template v-slot:header>
        <h2 class="text-3xl text-white">Agregar Nodo</h2>
      </template>
      <template v-slot:body>
        <form @submit.prevent="addNodeForm" class="mb-10">
          <div class="mb-10">
            <div class="mb-5">
              <label
                for="label"
                class="block mb-2 text-sm font-medium text-white"
              >
                Nombre del nodo</label
              >
              <input
                type="text"
                id="label"
                v-model="label"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="type"
                class="block mb-2 text-sm font-medium text-white"
              >
                Tipo del nodo</label
              >
              <input
                type="text"
                id="type"
                v-model="type"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="radius"
                class="block mb-2 text-sm font-medium text-white"
              >
                Radio del nodo</label
              >
              <input
                type="number"
                id="radius"
                v-model="radius"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="posx"
                class="block mb-2 text-sm font-medium text-white"
              >
                Posicion X</label
              >
              <input
                type="number"
                id="posx"
                v-model="posx"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="posy"
                class="block mb-2 text-sm font-medium text-white"
              >
                Posicion Y</label
              >
              <input
                type="number"
                id="posy"
                v-model="posy"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Crear Nodo
          </button>
        </form>
      </template>
    </Modal>
    <Modal v-show="isModalVisibleNodeEdit" @close="closeModalNodeEdit">
      <template v-slot:header>
        <h2 class="text-3xl text-white">Agregar Nodo</h2>
      </template>
      <template v-slot:body>
        <form @submit.prevent="editNodeForm" class="mb-10">
          <div class="mb-10">
            <div class="mb-5">
              <label
                for="label"
                class="block mb-2 text-sm font-medium text-white"
              >
                Nombre del nodo</label
              >
              <input
                type="text"
                id="label"
                v-model="label"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="type"
                class="block mb-2 text-sm font-medium text-white"
              >
                Tipo del nodo</label
              >
              <input
                type="text"
                id="type"
                v-model="type"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="radius"
                class="block mb-2 text-sm font-medium text-white"
              >
                Radio del nodo</label
              >
              <input
                type="number"
                id="radius"
                v-model="radius"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="posx"
                class="block mb-2 text-sm font-medium text-white"
              >
                Posicion X</label
              >
              <input
                type="number"
                id="posx"
                v-model="posx"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="posy"
                class="block mb-2 text-sm font-medium text-white"
              >
                Posicion Y</label
              >
              <input
                type="number"
                id="posy"
                v-model="posy"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Editar Nodo
          </button>
        </form>
      </template>
    </Modal>
  </main>
</template>
<style>
div.vis-network div.vis-manipulation {
  background: #060d27 !important;
  color: white;
  border: 1px solid black;
  font-size: bold;
}

div.vis-network div.vis-edit-mode button.vis-button.vis-edit.vis-edit-mode{
  color: #060d27 ;
}
</style>
