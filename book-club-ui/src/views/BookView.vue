<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import {ref} from 'vue'
import Book from '../components/Book.vue'
import Meme from "../components/Meme.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "BookView",
  components: {LoadingSpinner, Meme, Book, Navbar},
  setup() {
    let book = ref();
    let memes = ref([]);
    let loading = ref();
    return {book, memes, loading}
  },
  methods: {
    beforeRouteEnter(x, y, z) {
      let i = 1;
      z();
    },
    getBook() {
      axios.get(`${import.meta.env.VITE_API_URL}v1/Book/${this.$route.query.id}`).then(response => {
        this.book = response.data;
        this.getMemesForBook();
      });
    },
    getMemesForBook() {
      axios.get(`${import.meta.env.VITE_API_URL}v1/Book/${this.$route.query.id}/meme`).then(response => {
        this.memes = response.data;
        this.book.memeCount = this.memes.length;
        this.loading = false;
      });
    },
    onFileChanged(e) {
      this.loading = true;
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios.post(`${import.meta.env.VITE_API_URL}v1/Book/${this.$route.query.id}/meme`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(response => {
        this.memes.push(response.data);
        this.book.memeCount++;
        this.loading = false;
      });
    }
  },
  created() {
    this.loading = true;
    this.getBook();
  }
}
</script>

<template>
  <LoadingSpinner v-bind:loading="loading"></LoadingSpinner>
  <div class="book-info-container" v-if="book">
    <Book v-bind:name="book.name" v-bind:bookImage="book.imageSource" v-bind:id="book.id" v-bind:summary="book.summary"
          v-bind:author="book.author" v-bind:memeCount="memes.length"></Book>
    <div class="book-summary-container">
      <div class="book-summary">
        <h3>Summary</h3>
        <p>
          {{ this.book.summary }}
        </p>
        <span>
          <b>
          Author: 
          </b> 
        </span>
        <span>
          {{ this.book.author }}
        </span>
      </div>
      <div class="book-users-reading">
        Users reading this book: Dan, Ronni
      </div>
      <div class="book-users-finished-reading">
        Users finished reading this book: Ed, Thomas, Reece, Peter<i style="color:red;">*</i>
      </div>
      <div class="buttons">
        <button class="book-reading-button" title="Mark as reading"><i class="fa fa-book-open"></i></button>
        <button class="book-finished-button" title="Mark as finished"><i class="fa fa-square-check"></i></button>
      </div>
    </div>
  </div>
  <hr class="book-meme-divider">
  <h1 v-if="book" style="text-align: center;">Memes for {{ book.name }}</h1>
  <div class="meme-upload">
    <input type="file" ref="file" style="display: none" @change="onFileChanged" accept="image/*">
    <button @click="$refs.file.click()">Upload new meme</button>
  </div>
  <div class="meme-container">
    <Meme v-bind:memeImage="meme.s3URL" v-for="meme in memes"></Meme>
  </div>
</template>

<style scoped>

.book-info-container {
  display: flex;
  justify-content: center;
  vertical-align: center;
  margin-top: 2%;
}

.book-summary-container {
  background: #efefef;
  border-radius: 15px;
  width: 50%;
  margin-left: 1%;
  height: 100%;
}

.book-summary-container div {
  padding: 20px;
}

.book-meme-divider {
  width: 80%;
  margin-top: 2%
}

.meme-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.meme-upload {
  text-align: center;
}

.buttons button {
  border: none;
  font-size: 50px;
  cursor: pointer;
  padding: 2%;
}

.book-finished-button {
  color: green;
}
</style>