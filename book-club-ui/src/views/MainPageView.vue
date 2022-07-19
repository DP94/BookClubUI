<script lang="ts">
import {ref} from 'vue'
import Book from '../components/Book.vue'
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {Options, Vue} from "vue-class-component";
import {BookService} from "@/services/book-service";

let loading = ref();
loading.value = true;

@Options({
  components: {LoadingSpinner, Book},
  name: "MainPageView", 
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$emit('routeChange');
    });
  },
  emits: ["routeChange"]
})
export default class MainPageView extends Vue {
  
  books: Array<any> = ref([]);
  loading: boolean = ref(false);
  
  async created() {
    const bookService = new BookService();
    this.loading = true;
    this.books = await bookService.getAllBooks();
    this.loading = false;
  }
}

</script>

<template>
  <LoadingSpinner :loading="loading"></LoadingSpinner>
  <div class="book-container">
    <div class="book" v-for="item in books">
      <Book v-bind:name="item.name" v-bind:bookImage="item.imageSource" v-bind:id="item.id"></Book>
    </div>
  </div>
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