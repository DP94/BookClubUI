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
    },
    onFileChanged(e) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios.post(`${import.meta.env.VITE_API_URL}v1/Book/${this.$route.query.id}/meme`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
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
          v-bind:author="book.author"></Book>
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
    <input type="file" ref="file" style="display: none" @change="onFileChanged">
    <button @click="$refs.file.click()">Upload new meme</button>
  </div>
  <div class="meme-container">
    <div class="book-meme">
      <img src="https://media0.giphy.com/media/kYsBThMhhalLG/200.gif"/>
      <span>Uploaded by: Dan</span>
    </div>
    <div class="book-meme">
      <img src="https://media0.giphy.com/media/kYsBThMhhalLG/200.gif"/>
      <span>Uploaded by: Dan</span>
    </div>
    <div class="book-meme">
      <img src="https://media0.giphy.com/media/kYsBThMhhalLG/200.gif"/>
      <span>Uploaded by: Dan</span>
    </div>
    <div class="book-meme">
      <img src="https://media0.giphy.com/media/kYsBThMhhalLG/200.gif"/>
      <span>Uploaded by: Dan</span>
    </div>
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

.book-meme {
  padding: 10px;
  display: flex;
  text-align: center;
  flex-direction: column;
}

.meme-upload {
  text-align: center;
}
</style>