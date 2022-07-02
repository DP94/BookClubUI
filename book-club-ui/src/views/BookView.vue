<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import {ref} from 'vue'
import Book from '../components/Book.vue'

export default {
  name: "BookView",
  components: {Book, Navbar},
  setup() {
    let book = ref();
    return {book}
  },
  methods: {
    getBook() {
      axios.get(`${import.meta.env.VITE_API_URL}v1/Book/${this.$route.query.id}`).then(response => {
        this.book = response.data;
      });
    }
  },
  created() {
    this.getBook();
  }
}
</script>

<template>
  <Navbar/>
  <div class="book-info-container" v-if="book">
    <Book v-bind:name="book.name" v-bind:bookImage="book.imageSource" v-bind:id="book.id"></Book>
    <div class="book-summary">
      <p>
        Placeholder
      </p>
    </div>
  </div>
</template>

<style scoped>

.book-info-container {
  display: flex;
  justify-content: center;
  vertical-align: center;
}

.book-summary {
  background: #efefef;
  border-radius: 15px;
  width: 50%;
  margin-left: 1%;
}
</style>