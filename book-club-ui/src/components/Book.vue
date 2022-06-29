<script>

export default {
  props: [
    'name',
    'bookImage'
  ],

  methods: {
    getBookImage() {
      return this.$props.bookImage
    }
  }
}
</script>


<template>
  <div class="book-info">
    <div class="book-lock-container">
      <font-awesome-icon icon="fa fa-lock" class="book-lock"/>
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
  height: 63%;
  width: 79%;
  background: #8080809e;
}

.book-lock {
  font-size: 90px;
  position: absolute;
  top: 34%;
  left: 32%;
  color: black;
}
</style>