<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import {ref} from 'vue'
import Book from '../components/Book.vue'
import Meme from "../components/Meme.vue";

export default {
  name: "BookView",
  components: {Meme, Book, Navbar},
  setup() {
    let book = ref();
    let memes = ref([]);
    return {book, memes}
  },
  methods: {
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
      });
    },
    onFileChanged(e) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios.post(`${import.meta.env.VITE_API_URL}v1/Book/${this.$route.query.id}/meme`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(response => {
        this.memes.push(response.data);
        this.book.memeCount++;
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
    <Book v-bind:name="book.name" v-bind:bookImage="book.imageSource" v-bind:id="book.id" v-bind:summary="book.summary"
          v-bind:author="book.author" v-bind:memeCount="memes.length"></Book>
    <div class="book-summary-container">
      <div class="book-summary">
        <h3>Summary</h3>
        <p>
          {{ this.book.summary }}
        </p>
        <span>
          Author: {{ this.book.author }}
        </span>
      </div>
      <div class="book-users-reading">
        Users reading this book: Dan, Ronni
      </div>
      <div class="book-users-finished-reading">
        Users finished reading this book: Ed, Thomas, Reece, Peter<i style="color:red;">*</i>
      </div>
      <div class="buttons">
        <button>Mark as finished</button>
        <button>Mark as reading</button>
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
</style>