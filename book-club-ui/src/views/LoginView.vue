<script lang="ts">
import {Options, Vue} from "vue-class-component";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {UserDto} from "@/dtos/user-dto";
import {ref} from "vue";
import {UserService} from "@/services/user-service";
import {userStore} from "@/stores/user-store";
import {notify} from "@kyvg/vue3-notification";

@Options({
  components: {LoadingSpinner},
  name: "LoginView", beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$emit('routeChange');
    });
  },
  emits: ["routeChange", "loggedIn"]
})
export default class LoginView extends Vue {
  user: UserDto = ref(UserDto);
  
  async login() {
    const userService = new UserService();
    const response = await userService.login(this.user.username, this.user.password);
    if (response !== null) {
      notify({
        title: `Successfully logged in`,
        text: `Welcome to BookClub, ${response.username}`,
        type: 'info',
        duration: 3000
      })
      this.$router.push('/');
    }

  }
}
</script>

<template>
  <div class="login-form-container">
    <h1 class="site-header">BookClub</h1>
    <FormKit type="form" v-model="this.user" :actions="false" @submit="login()">
      <FormKit
          type="text"
          label="Username"
          name="username"
          validation="required|username"
      />
      <FormKit
          type="password"
          label="Password"
          name="password"
          validation="required|password"
      />
      <FormKit
          type="submit"
          label="Login"
      />
    </FormKit>
    <span>New to BookClub? <router-link to="/register">Register here!</router-link></span>
  </div>
</template>

<style scoped>
.site-header {
  font-size: 64px
}

.login-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<style>
[data-type="submit"] .formkit-wrapper {
  text-align: center;
}
</style>