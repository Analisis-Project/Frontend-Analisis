<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="flex flex-col text-white">
            <h1 class="text-4xl mb-10">Sube el archivo TXT</h1>
            <input type="file" @change="onFileChange">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex';

const store = useStore();
const router = useRouter();

const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                if(e.target.result !== null){
                    const jsonData = JSON.parse(e.target.result);
                    store.commit('setJsonData', jsonData);
                    router.push('/');
                }
            } catch (err) {
                console.error('The file could not be parsed as JSON:', err);
            }
        };
        reader.readAsText(file);
    }
};
</script>
