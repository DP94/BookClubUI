<template>
  <div class="topnav">
    <router-link data-nav-name="books" to="/">Books</router-link>
    <router-link data-nav-name="users" to="/users">Users</router-link>
    <router-link data-nav-name="profile" to="/user" v-if="store.hasSession()">Profile</router-link>
    <router-link data-nav-name="login" id="login" class="nav-register" to="/login" v-if="!store.hasSession()">Log in</router-link>
    <a data-nav-name="logout" id="logout" class="nav-register" to="/login" @click="onLogout()" v-if="store.hasSession()">Log out</a>
    <span class="nav-register" v-if="store.hasSession()">{{store.user.username}}</span>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-class-component';
import {userStore} from "@/stores/user-store";

@Options({
  emits: ["loggedIn"]
})
export default class Navbar extends Vue {
  
  store = userStore();
  
  onLogout() {
    this.store.$patch({ token: ''});
    this.$router.push('/login');
  }
  
  onChange() {
    const routerValue = this.$router.currentRoute.value.name;
    const navName = document.querySelector(`[data-nav-name="${routerValue}"]`)
    if (navName === null) {
      return;
    }
    const navBars = document.querySelectorAll('.topnav a')
    navBars.forEach((nav) => {
      nav.classList.remove('active');
    })
    navName.classList.add('active');
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
.topnav a, .topnav span {
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