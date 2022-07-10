<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar></Navbar>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
