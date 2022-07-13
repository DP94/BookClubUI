<script lang="ts">

import {Options, Vue} from "vue-class-component";
import {UserDto} from "@/dtos/user-dto";
import {ref} from "vue";
import {UserService} from "@/services/user-service";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UserForm from "@/components/form/UserForm.vue";
@Options({
  components: {UserForm, LoadingSpinner}
})
export default class RegisterView extends Vue {
  loading: boolean = ref();
  
  async submitUserForm() {
    const userService = new UserService();
    this.loading = true;
    const user = this.$refs.userform.getUser();
    const createdUser: UserDto = await userService.createUser(user);
    this.loading = false;
    this.$router.push({path: '/user', query: {id: createdUser.id}})
  }
}

</script>

<template>
  <LoadingSpinner v-bind:loading="loading"></LoadingSpinner>
  <div class="form-container">
    <UserForm v-on:submit="this.submitUserForm()" ref="userform"></UserForm>
  </div>
</template>

<style scoped>

.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 35em;
}
</style>