<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {UserDto} from "@/dtos/user-dto";
import {ref} from "vue";

@Options({})
export default class UserForm extends Vue {
  user: UserDto = ref(UserDto);
  isRegister: boolean = ref(false);
  
  getUser(): UserDto {
    return this.user;
  }
  
  setUser(user: UserDto) {
    this.user = user;
  }
  
  setIsRegister(isRegister: boolean) {
    this.isRegister = isRegister;
  }
}
</script>
<template>
  <FormKit type="form" v-model="this.user" :actions="false">
    <FormKit
        type="text"
        label="Username"
        name="username"
        validation="required|username"
    />
    <FormKit
        type="text"
        label="Real name"
        name="name"
        validation="required|name"
    />
    <FormKit
        type="text"
        label="Email"
        name="email"
        prefix-icon="email"                                  
        placeholder="email@domain.com"
        validation="required|email"
    />
    <FormKit
        type="password"
        label="Password"
        name="password"
        :validation="isRegister ? 'required|password' : ''"
    />
    <FormKit
        type="select"
        label="Loyalty"
        name="loyalty"
        placeholder="Praise the emperor?"
        :options="['Loyalist', 'Traitor']"
    />
    <FormKit
        type="submit"
        :label="isRegister ? 'Register' : 'Update'"
    />
  </FormKit>
</template>
<style scoped>

</style>