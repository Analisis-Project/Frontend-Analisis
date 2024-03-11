<script setup>
import { ref, onMounted, onBeforeMount, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network.js';

const store = useStore();
const jsonData = computed(() => store.state.jsonData);
let json = null;
let container = ref(null);

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

  if(jsonData && jsonData.graph && jsonData.graph[0].data){
    jsonData.graph[0].data.forEach(node => {
    nodes.push({ id: node.id, label: node.label });

    node.linkedTo.forEach(link => {
      edges.push({ from: node.id, to: link.nodeId, label: String(link.weight) });
    });
  });
  }
  

  let nodesDataSet = new DataSet(nodes);
  let edgesDataSet = new DataSet(edges);

  let data = {
    nodes: nodesDataSet,
    edges: edgesDataSet
  };

  let network = new Network(container.value, data, {});
  // Si la red ya existe, actualizar datos, de lo contrario, crear una nueva
  
  network = new Network(container.value, data, {});
    var options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      locale: 'en',
      clickToUse: false
    };

    network.setOptions(options);
  }
</script>

<template>
  <main class="w-full h-full">
    <div class="w-full h-full" id="network" ref="container"></div>
  </main>
</template>