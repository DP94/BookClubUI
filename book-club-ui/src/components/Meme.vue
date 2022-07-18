<script>
export default {
  name: "Meme",
  props: [
      'memeImage',
      'uploader',
  ],
  methods: {
    getMemeImage() {
      return this.$props.memeImage;
    }
  }
}
</script>


<template>
  <div class="book-meme">
    <img class="book-meme-image" :src="getMemeImage()"/>
    <span>Uploaded by: {{uploader}}</span>
  </div>
</template>

<style scoped>
.book-meme {
  padding: 10px;
  display: flex;
  text-align: center;
  flex-direction: column;
}

.book-meme-image {
  height: 200px;
  width: 200px;
}
</style>