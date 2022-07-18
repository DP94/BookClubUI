<script lang="ts">
import {Options, Vue} from "vue-class-component";
import UserForm from "@/components/form/UserForm.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {UserService} from "@/services/user-service";
import {userStore} from "@/stores/user-store";
import {UserDto} from "@/dtos/user-dto";
import {ref} from "vue";
import {notify} from "@kyvg/vue3-notification";

@Options({
  components: {UserForm, LoadingSpinner}
})
export default class UserView extends Vue {
  
  loading: boolean = ref(false);
  
  async mounted() {
    const store = userStore();
    const service = new UserService();
    this.loading = true;
    const user = await service.getUserById(store.user.id)
    this.$refs.userform.setIsRegister(false);
    this.$refs.userform.setUser(user);
    this.loading = false;
  }
  
  async submitUserForm() {
    const store = userStore();
    this.loading = true;
    const userService = new UserService();
    const user = this.$refs.userform.getUser();
    const createdUser: UserDto = await userService.updateUser(user);
    store.$patch({user: createdUser});
    this.loading = false;
    notify({
      title: `Successfully updated user`,
      type: 'success',
      duration: 3000
    })
  }
}
</script>

<template>
  <LoadingSpinner :loading="loading"></LoadingSpinner>
  <div class="user-form">
    <UserForm v-on:submit="this.submitUserForm()" ref="userform"></UserForm>
  </div>
</template>

<style>

.user-form {
  margin-top: 5%;
}

.formkit-wrapper {
  margin: 0 auto;
}
</style>