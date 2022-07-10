<template>
  <div class="topnav">
    <router-link :class="{active : isActive(1)}" to="/" @click="setActiveTab(1)">Home</router-link>
    <router-link :class="{active : isActive(2)}" to="/users" @click="setActiveTab(2)">Users</router-link>
    <router-link :class="{active : isActive(3)}" class="nav-register" to="/register" @click="setActiveTab(3)">Register
    </router-link>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';

@Options()
export default class Navbar extends Vue {
  currentTabIndex = 0;

  setActiveTab(index: number) {
    this.currentTabIndex = index;
  }

  isActive(index: number) {
    return index === this.currentTabIndex;
  }
}
</script>

<style scoped>
.topnav {
  background-color: #476479;
  overflow: hidden;
  border-bottom: 2px solid #b78f0a;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #dbdede;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #582936;
  color: white;
}

.nav-register {
  float: right !important;
}
</style>