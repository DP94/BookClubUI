<template>
  <div class="topnav">
    <a class="active" href="/">Home</a>
    <a href="users">Users</a>
    <a class="nav-sign-out">Sign out</a>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.topnav {
  background-color: #476479 ;
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

.nav-sign-out {
  float: right !important;
}
</style>