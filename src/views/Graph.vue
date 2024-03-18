<script setup>
import { ref, onMounted, onBeforeMount, watch, computed } from "vue";
import { useStore } from "vuex";
import { DataSet, Network } from "vis-network/standalone/esm/vis-network.js";
import Modal from "@/components/Modal.vue";

let resolveModalPromise = null;
let resolveModalEdit = null;

let currentNode = null;
let currentEdge = null;

let indexEdge = null;
const store = useStore();
const jsonData = computed(() => store.state.jsonData);
let json = null;
let container = ref(null);
let nodesDataSet = new DataSet();
let edgesDataSet = new DataSet();

let nodesData = [];
let edgesData = [];

let newNode = null;
let newEdge = null;

const isModalVisibleNodeAdd = ref(false);
const isModalVisibleNodeEdit = ref(false);

const isModalVisibleEdgeAdd = ref(false);
const isModalVisibleEdgeEdit = ref(false);

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

const showModalEdgeAdd = () => {
  isModalVisibleEdgeAdd.value = true;
};

const closeModalEdgeAdd = () => {
  isModalVisibleEdgeAdd.value = false;
};

const showModalEdgeEdit = () => {
  isModalVisibleEdgeEdit.value = true;
};

const closeModalEdgeEdit = () => {
  resolveModalEdit();
  isModalVisibleEdgeEdit.value = false;
};

class Node {
  constructor(
    id,
    value = null,
    label,
    data = {},
    type = "",
    radius = 0,
    coordenates = { x: 0, y: 0 }
  ) {
    this.id = id;
    this.value = value;
    this.label = label;
    this.data = data;
    this.type = type;
    this.radius = radius;
    this.coordenates = coordenates;
  }
}

class Edge {
  constructor(type = "", from, to, weight = 0) {
    this.type = type;
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

function updateGraph(jsonData = "", isundo = false, nodedataset = null, edgedataset = null) {
  let nodes = [];
  let edges = [];

  if (jsonData && jsonData.graph && jsonData.graph[0].data) {
    jsonData.graph[0].data.forEach((node) => {
      let newnode = new Node(
        node.id,
        node.value,
        node.label,
        node.data,
        node.type,
        node.radius,
        node.coordenates
      );
      nodesData.push(newnode);
      nodes.push({
        id: newnode.id,
        value: newnode.value,
        label: newnode.label,
        x: newnode.coordenates.x,
        y: newnode.coordenates.y,
      });
      node.linkedTo.forEach((link) => {
        let newedge = new Edge("", node.id, link.nodeId, link.weight);
        edgesData.push(newedge);
        edges.push({
          from: newedge.from,
          to: newedge.to,
          label: String(newedge.weight),
          color: { color: "#000FFF" },
        });
      });
    });
  }
  console.log("Nodos: ", nodesData);
  console.log("Aristas: ", edgesData);

  if (isundo) {
    if (nodedataset && edgedataset) {
      nodesDataSet = new DataSet(nodedataset);
      edgesDataSet = new DataSet(edgedataset);
    }
    else {
      nodesDataSet = new DataSet(nodes);
      edgesDataSet = new DataSet(edges);
    }
  } else {
    nodesDataSet = new DataSet(nodes);
    edgesDataSet = new DataSet(edges);
  }
  let data = {
    nodes: nodesDataSet,
    edges: edgesDataSet,
  };
  store.commit('setNodesData', nodesData);
  store.commit('setEdgesData', edgesData);
  console.log("primer data:", edgesData)
  let network = new Network(container.value, data, {});

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
      addEdge: addEdgeFunction,
      editNode: editNodeFunction,
      editEdge: editEdge,
      deleteNode: deleteNodeFunction,
      deleteEdge: removeEdge,
    },
    physics: {
      enabled: true,
      barnesHut: {
        centralGravity: 0.1,
      },
      
    },
    edges: {
      physics: false,
      arrows: {
      to: {
        enabled: true,
        imageHeight: 1,
        imageWidth: 1,
        scaleFactor: 1,
        type: "arrow"
      },
    },
    },
  };

  network.setOptions(options);
}

function addNodeFunction(nodeData, callback) {
  saveState();
  label.value = "";
  value.value = "";
  type.value = "";
  radius.value = 0;
  posx.value = 0;
  posy.value = 0;
  showModalNodeAdd();

  // Crear una nueva Promise que se resolverá cuando el modal se cierre
  new Promise((resolve) => {
    resolveModalPromise = resolve;
  }).then(() => {
    // Este código se ejecutará cuando el modal se cierre
    nodeData.id = newNode.id;
    nodeData.value = newNode.value;
    nodeData.label = newNode.label;
    nodeData.x = newNode.coordenates.x;
    nodeData.y = newNode.coordenates.y;
    callback(nodeData);
    console.log("Agregando nodos: ", nodesDataSet.get());
  });
}

// Función para agregar un nodo
const addNodeForm = () => {
  newNode = new Node(
    nodesData.length + 1, // ID del nuevo nodo
    value.value, // Valor del nuevo nodo
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
  saveState();
  // Encuentra el índice del nodo que se está editando en el array nodesData
  const index = nodesData.findIndex((node) => node.id === nodeData.id);

  // Si el nodo se encuentra en el array, actualiza ese elemento
  if (index !== -1) {
    let nodearray = nodesData[index];
    // Configura el formulario con los datos del nodo existente
    label.value = nodeData.label;
    value.value = nodeData.value;
    color.value = nodeData.color.background;
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
    currentNode.color.background = color.value;
    const nodeToUpdate = nodesDataSet.get(nodeData.id);
    if (nodeToUpdate) {
      // Actualiza el nodo con los nuevos datos
      nodesDataSet.update({ ...nodeToUpdate, ...currentNode });
    } else {
      console.error(`No se encontró el nodo con id ${nodeData.id}`);
    }
    callback(currentNode);
    console.log("Editando nodos: ", nodesData);
    console.log("Editando nodos: ", nodesDataSet.get());
  });
}

const editNodeForm = () => {
  // Actualiza el nodo existente con los nuevos valores del formulario
  currentNode.label = label.value;
  currentNode.value = value.value;
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
      currentNode.value,
      currentNode.label,
      currentNode.data,
      currentNode.type,
      currentNode.radius,
      { x: currentNode.x, y: currentNode.y }
    );
  }

  // Cerrar el modal y resolver la Promise
  closeModalNodeEdit();
  resolveModalEdit();
};

function deleteNodeFunction(nodeData, callback) {
  saveState();
  console.log("Eliminando nodo: ", nodeData.nodes[0]);
  // Filtra el array nodesData para eliminar el nodo con el id dado
  nodesData = nodesData.filter((node) => node.id !== nodeData.nodes[0]);
  nodesDataSet.remove(nodeData.nodes[0]);
  console.log("Eliminando nodos: ", nodesData);
  console.log("Eliminando nodos: ", nodesDataSet.get());
  // Llama al callback
  callback(nodeData);
}

// Función para agregar una arista
function addEdgeFunction(edgeData, callback) {
  saveState();
  typeEdge.value = "";
  weight.value = 0;
  colorEdge.value = "";

  showModalEdgeAdd();
  // Crear una nueva Promise que se resolverá cuando el modal se cierre
  new Promise((resolve) => {
    resolveModalPromise = resolve;
  }).then(() => {
    // Este código se ejecutará cuando el modal se cierre

    newEdge.from = edgeData.from;
    newEdge.to = edgeData.to;

    edgesData.push(newEdge);
    console.log("Agregando arista: ", edgesData);

    if (!edgeData.color) {
      edgeData.color = {};
    }
    edgeData.color.color = colorEdge.value;
    edgeData.label = String(weight.value);
    if (newEdge.type === "continuo") {
      edgeData.dashes = false;
    } else {
      edgeData.dashes = true;
    }
    callback(edgeData);
    console.log("Agregando arista: ", edgesDataSet.get());
  });
}

const addEdgeForm = () => {
  newEdge = new Edge(
    typeEdge.value,
    "",
    "",
    weight.value
  );

  // Cerrar el modal y resolver la Promise
  closeModalEdgeAdd();
  resolveModalPromise();
}

// Función para editar una arista
function editEdge(edgeData, callback) {
  saveState();
  // Encuentra el índice de la arista que se está editando en el array edgesData
  indexEdge = edgesDataSet.get().findIndex((edge) => edge.id === edgeData.id);
  // Si la arista se encuentra en el array, actualiza ese elemento
  if (indexEdge !== -1) {
    let edgearray = edgesData[indexEdge];
    // Configura el formulario con los datos de la arista existente
    typeEdge.value = edgearray.type;

    colorEdge.value = edgesDataSet.get()[indexEdge].color.color || "#000000";
    weight.value = edgearray.weight;
  }

  currentEdge = edgeData;

  showModalEdgeEdit();

  // Crear una nueva Promise que se resolverá cuando el modal se cierre
  new Promise((resolve) => {
    resolveModalEdit = resolve;
  }).then(() => {
    // Este código se ejecutará cuando el modal se cierre
    if (!currentEdge.color) {
      currentEdge.color = {};
    }
    currentEdge.color.color = colorEdge.value;
    currentEdge.label = String(weight.value);
    if (currentEdge.type === "continuo") {
      currentEdge.dashes = false;
    } else {
      currentEdge.dashes = true;
    }
    callback(currentEdge);
    console.log("Editando aristas: ", edgesData);
    console.log("Editando aristas: ", edgesDataSet.get());
  });
}

const editEdgeForm = () => {
  // Actualiza la arista existente con los nuevos valores del formulario
  currentEdge.type = typeEdge.value;
  currentEdge.weight = weight.value;

  // Si el nodo se encuentra en el array, actualiza ese elemento
  if (indexEdge !== -1) {
    edgesData[indexEdge] = new Edge(
      currentEdge.type,
      currentEdge.from,
      currentEdge.to,
      currentEdge.weight
    );
  }

  // Cerrar el modal y resolver la Promise
  closeModalEdgeEdit();
  resolveModalEdit();
};

// Función para eliminar una arista
function removeEdge(edgeData, callback) {
  saveState();
  console.log(edgeData.edges[0]);
  indexEdge = edgesDataSet.get().findIndex((edge) => edge.id === edgeData.edges[0]);
  console.log("Eliminando arista: ", indexEdge);
  // Filtra el array nodesData para eliminar el nodo con el id dado
  edgesData.splice(indexEdge, 1);
  edgesDataSet.remove(edgeData.edges[0]);
  console.log("Eliminando arista: ", edgesData);
  console.log("Eliminando arista: ", edgesDataSet.get());
  // Llama al callback
  callback(edgeData);
}

//Node

const value = ref("");
const label = ref("");
const type = ref("");
const radius = ref(0);
const posx = ref(0);
const posy = ref(0);
const color = ref("");

//Edge
const typeEdge = ref("");
const weight = ref(0);
const colorEdge = ref("");

let history = [];

function saveState() {
  // Guarda una copia del estado actual del grafo
  history.push({
    nodesData: nodesData,
    edgesData: edgesData,
    nodesDataSet: nodesDataSet.get(),
    edgesDataSet: edgesDataSet.get(),
  });
  store.commit('setNodesData', nodesData);
  store.commit('setEdgesData', edgesData);
}

function undoChanges() {
  // Restaura el estado del grafo al último estado guardado
  if (history.length > 0) {
    console.log("Deshaciendo cambios")
    let lastState = history.pop();
    console.log(lastState);
    nodesData = lastState.nodesData;
    edgesData = lastState.edgesData;
    nodesDataSet = lastState.nodesDataSet;
    edgesDataSet = lastState.edgesDataSet;
    updateGraph("", true, nodesDataSet, edgesDataSet);
  }
}

const undo = computed(() => store.state.undo);

watch(undo, (newVal) => {
  if (newVal == true || newVal == false) {
    undoChanges();
  }
});

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
              <label for="label" class="block mb-2 text-sm font-medium text-white">
                Nombre del nodo</label>
              <input type="text" id="label" v-model="label"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
            <div class="mb-5">
              <label for="value" class="block mb-2 text-sm font-medium text-white">
                Valor del nodo</label>
              <input type="text" id="value" v-model="value"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
            <div class="mb-5">
              <label for="type" class="block mb-2 text-sm font-medium text-white">
                Tipo del nodo</label>
              <input type="text" id="type" v-model="type"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
            <div class="mb-5">
              <label for="radius" class="block mb-2 text-sm font-medium text-white">
                Radio del nodo</label>
              <input type="number" id="radius" v-model="radius"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
            <div class="mb-5">
              <label for="posx" class="block mb-2 text-sm font-medium text-white">
                Posicion X</label>
              <input type="number" id="posx" v-model="posx"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
            <div class="mb-5">
              <label for="posy" class="block mb-2 text-sm font-medium text-white">
                Posicion Y</label>
              <input type="number" id="posy" v-model="posy"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
          </div>

          <button type="submit"
            class="text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Crear Nodo
          </button>
        </form>
      </template>
    </Modal>
    <Modal v-show="isModalVisibleNodeEdit" @close="closeModalNodeEdit">
      <template v-slot:header>
        <h2 class="text-3xl text-white">Editar Nodo</h2>
      </template>
      <template v-slot:body>
        <form @submit.prevent="editNodeForm" class="mb-10">
          <div class="mb-10">
            <div class="mb-5">
              <label for="label" class="block mb-2 text-sm font-medium text-white">
                Nombre del nodo</label>
              <input type="text" id="label" v-model="label"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
            <div class="mb-5">
              <label for="value" class="block mb-2 text-sm font-medium text-white">
                Valor del nodo</label>
              <input type="text" id="value" v-model="value"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>
            <div class="mb-5">
              <label for="color" class="block mb-2 text-sm font-medium text-white">
                Color del nodo</label>
              <input type="color" id="color" v-model="color" class="w-full" required />

            </div>
          </div>

          <button type="submit"
            class="text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Editar Nodo
          </button>
        </form>
      </template>
    </Modal>
    <Modal v-show="isModalVisibleEdgeAdd" @close="closeModalEdgeAdd">
      <template v-slot:header>
        <h2 class="text-3xl text-white">Agregar Arista</h2>
      </template>
      <template v-slot:body>
        <form @submit.prevent="addEdgeForm" class="mb-10">
          <div class="mb-10">
            <div class="mb-5">
              <label for="typeEdge" class="block mb-2 text-sm font-medium text-white">
                Tipo de Arista</label>
              <select id="typeEdge" v-model="typeEdge"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required>
                <option disabled value="">Por favor selecciona un tipo</option>
                <option value="continuo">Continuo</option>
                <option value="interlineado">Interlineado</option>
                <!-- Agrega más opciones según sea necesario -->
              </select>
            </div>
            <div class="mb-5">
              <label for="colorEdge" class="block mb-2 text-sm font-medium text-white">
                Color de la linea</label>
              <input type="color" id="colorEdge" v-model="colorEdge" class="w-full" required />

            </div>
            <div class="mb-5">
              <label for="weight" class="block mb-2 text-sm font-medium text-white">
                Peso de la Arista</label>
              <input type="number" id="weight" v-model="weight"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>

          </div>

          <button type="submit"
            class="text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Crear Arista
          </button>
        </form>
      </template>
    </Modal>
    <Modal v-show="isModalVisibleEdgeEdit" @close="closeModalEdgeEdit">
      <template v-slot:header>
        <h2 class="text-3xl text-white">Editar Arista</h2>
      </template>
      <template v-slot:body>
        <form @submit.prevent="editEdgeForm" class="mb-10">
          <div class="mb-10">
            <div class="mb-5">
              <label for="typeEdge" class="block mb-2 text-sm font-medium text-white">
                Tipo de Arista</label>
              <select id="typeEdge" v-model="typeEdge"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required>
                <option disabled value="">Por favor selecciona un tipo</option>
                <option value="continuo">Continuo</option>
                <option value="interlineado">Interlineado</option>
                <!-- Agrega más opciones según sea necesario -->
              </select>
            </div>
            <div class="mb-5">
              <label for="colorEdge" class="block mb-2 text-sm font-medium text-white">
                Color de la linea</label>
              <input type="color" id="colorEdge" v-model="colorEdge" class="w-full" required />

            </div>
            <div class="mb-5">
              <label for="weight" class="block mb-2 text-sm font-medium text-white">
                Peso de la Arista</label>
              <input type="number" id="weight" v-model="weight"
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="" required />
            </div>

          </div>

          <button type="submit"
            class="text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Editar Arista
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

div.vis-network div.vis-edit-mode button.vis-button.vis-edit.vis-edit-mode {
  color: #060d27;
}
</style>
