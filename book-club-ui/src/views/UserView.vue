<script lang="ts">
import {Options, Vue} from "vue-class-component";
import UserForm from "@/components/form/UserForm.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {UserService} from "@/services/user-service";
import {userStore} from "@/stores/user-store";

@Options({
  components: {UserForm, LoadingSpinner}
})
export default class UserView extends Vue {
  
  async mounted() {
    const store = userStore();
    const service = new UserService();
    const user = await service.getUserById(store.user.id)
    this.$refs.userform.setUser(user);
  }
}
</script>

<template>
  <UserForm v-on:submit="this.submitUserForm()" ref="userform"></UserForm>
</template>

<style scoped>
</style>