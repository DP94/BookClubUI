<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import {ref} from 'vue'
import Book from '../components/Book.vue'
import Meme from "../components/Meme.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {BookService} from "@/services/book-service";
import {Options, Vue} from "vue-class-component";
import {BookDto} from "@/dtos/book-dto";
import {MemeDto} from "@/dtos/meme-dto";
import {userStore} from "@/stores/user-store";
import {UserService} from "@/services/user-service";
import {notify} from "@kyvg/vue3-notification";

@Options({
  components: {Book, Meme, Navbar, LoadingSpinner},
  name: "BookView"
})
export default class BookView extends Vue {
  book: BookDto = ref(BookDto);
  memes: Array<MemeDto> = ref([]);
  loading: boolean = ref(false);
  memeCount: number = ref(0);
  
  async getBook() {
    const bookService = new BookService();
    this.book = await bookService.getBookById(this.$route.query.id);
    await this.getMemesForBook();
  }

  async getMemesForBook() {
    const bookService = new BookService();
    this.memes = await bookService.getBookMemes(this.$route.query.id);
    this.book.memeCount = this.memes.length;
    this.loading = false;
  }

  async onFileChanged(e) {
    this.loading = true;
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const bookService = new BookService();
    const response = await bookService.createMemeForBook(this.$route.query.id, formData);
    this.memes.push(response);
    this.book.memeCount++;
    this.loading = false;
  }

  async markBookAsReadForUser(){
    this.loading = true;
    const store = userStore();
    const user = store.user;
    user.booksRead.push(this.book);
    const userService = new UserService();
    const updatedUser = await userService.updateUser(user);
    store.$patch({user: updatedUser});
    this.loading = false;
    notify({
      title: `Successfully updated user`,
      type: 'success',
      duration: 3000
    })
  }

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
        <button class="book-finished-button" title="Mark as finished" @click="markBookAsReadForUser"><i class="fa fa-square-check"></i></button>
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
    <Meme v-bind:memeImage="meme.s3Url" v-bind:uploader="meme.uploadedBy" v-for="meme in memes"></Meme>
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