<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue'
import Book from '../components/Book.vue'

let books = ref([]);

axios.get(`${import.meta.env.VITE_API_URL}v1/Book/`).then(response => {
  books.value = response.data;
});

</script>

<template>
  <main>
    <div class="book-container">
      <div class="book" v-for="item in books">
        <Book v-bind:name="item.name" v-bind:bookImage="item.imageSource"></Book>
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