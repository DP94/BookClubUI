<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue'
import Book from '../components/Book.vue'
import Navbar from "@/components/Navbar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

let books = ref([]);
let loading = ref();
loading.value = true;
axios.get(`${import.meta.env.VITE_API_URL}v1/Book/`).then(response => {
  books.value = response.data;
  loading.value = false;
});

</script>

<template>
  <main>
    <Navbar></Navbar>
    <LoadingSpinner v-bind:loading="loading"></LoadingSpinner>
    <div class="book-container">
      <div class="book" v-for="item in books">
        <Book v-bind:name="item.name" v-bind:bookImage="item.imageSource" v-bind:id="item.id"></Book>
      </div>
    </div>
  </main>
</template>


<style scoped>
.book-container {
  display: flex;
  flex-wrap: wrap;
  flex-basis: 33%;
  justify-content: center;
  background: #efefef;
  border-radius: 15px;
  width: 60%;
  margin: 0 auto;
}

.book {
  padding: 3%;
  position: relative;
}
</style>