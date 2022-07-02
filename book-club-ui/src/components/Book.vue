<script>

import router from "@/router";

export default {
  props: [
    'id',
    'name',
    'bookImage'
  ],

  methods: {
    getBookImage() {
      return this.$props.bookImage
    },

    openBook() {
      router.push({path: '/book', query: {id: this.$props.id}});
    }
  }
}
</script>


<template>
  <div class="book-info" @click="openBook">
    <div class="book-lock-container">
      <i class="fa fa-lock book-lock"/>
    </div>
    <img class="book-image" :src="getBookImage()"/>
    <h1 class="book-title">{{ name }}</h1>
    <span class="meme-count">0 memes</span>
  </div>
</template>

<style scoped>
.book-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

.book-image {
  align-items: center;
  justify-content: center;
}

.book-title {
  overflow-wrap: break-word;
  inline-size: 230px;
  text-align: center;
}

.book-lock-container {
  position: absolute;
  background: #8080809e;
}

.book-image, .book-lock-container {
  height: 350px;
  width: 250px;
}

.book-lock {
  font-size: 90px;
  position: absolute;
  top: 38%;
  left: 35%;
  color: black;
}
</style>