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
    <div class="topnav">
      <a class="active" href="/">Home</a>
      <a href="users">Users</a>
      <a class="nav-sign-out">Sign out</a>
    </div>
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

.topnav {
  background-color: #476479 ;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #dbdede;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #582936;
  color: white;
}

.nav-sign-out {
  float: right !important;
}
</style>