<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar ref="nav"></Navbar>
  <RouterView/>
  <notifications position="top center"/>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
