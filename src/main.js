import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex';

const store = createStore({
    state: {
      jsonData: {
        "graph": [
          {
            "name": "G",
            "data": [
              {
                "id": 1,
                "label": "N1",
                "data": {},
                "type": " ",
                "linkedTo": [
                  {
                    "nodeId": 2,
                    "weight": 120
                  },
                  {
                    "nodeId": 4,
                    "weight": 87
                  },
                  {
                    "nodeId": 5,
                    "weight": 101
                  }
                ],
                "radius": 0.4,
                "coordenates": {
                  "x": 25,
                  "y": 34
                }
              },
              {
                "id": 2,
                "label": "N2",
                "data": {},
                "type": "Object",
                "linkedTo": [
                  {
                    "nodeId": 1,
                    "weight": 120
                  },
                  {
                    "nodeId": 7,
                    "weight": 45
                  },
                  {
                    "nodeId": 3,
                    "weight": 17
                  }
                ],
                "radius": 0.2,
                "coordenates": {
                  "x": 37,
                  "y": 15
                }
              },
              {
                "id": 3,
                "label": "N3",
                "data": {},
                "type": " ",
                "linkedTo": [
                  {
                    "nodeId": 5,
                    "weight": 86
                  },
                  {
                    "nodeId": 2,
                    "weight": 17
                  },
                  {
                    "nodeId": 9,
                    "weight": 15
                  }
                ],
                "radius": 1,
                "coordenates": {
                  "x": 75,
                  "y": 43
                }
              },
              {
                "id": 12,
                "label": "N12",
                "data": {},
                "type": "function",
                "linkedTo": [
                  {
                    "nodeId": 14,
                    "weight": 120
                  },
                  {
                    "nodeId": 17,
                    "weight": 87
                  },
                  {
                    "nodeId": 11,
                    "weight": 101
                  }
                ],
                "radius": 0.6,
                "coordenates": {
                  "x": 123,
                  "y": 167
                }
              }
            ]
          }
        ],
        "generalData1": 100,
        "generalData2": "Alg",
        "generalData3": 300
      },
      undo: false,
      nodesData: [],
      edgesData: [],
      responseData: [],
    },
    mutations: {
      setJsonData(state, data) {
        state.jsonData = data;
      },
      clearJsonData(state) {
        state.jsonData = null;
      },
      UNDO(state) {
        state.undo = !state.undo;
      },
      setNodesData(state, data) {
        state.nodesData = data;
      },
      setEdgesData(state, data) {
        state.edgesData = data;
      },
      setIsBipartite(state, isBipartite) {
        state.isBipartite = isBipartite;
      },
      setConnectedComponents(state, connectedComponents) {
        state.connectedComponents = connectedComponents;
      },
      setResponseData(state, data) {
        state.responseData = data;
      },
    },
    actions: {
      undo({ commit }) {
        commit('UNDO');
      },
    },
  });
  
const app = createApp(App);

app.use(router)
app.use(store)

app.mount('#app')
