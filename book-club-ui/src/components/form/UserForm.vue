<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {UserDto} from "@/dtos/user-dto";
import {ref} from "vue";

@Options({})
export default class UserForm extends Vue {
  user: UserDto = ref(UserDto);
  
  getUser(): UserDto {
    return this.user;
  }
  
  setUser(user: UserDto) {
    this.user = user;
  }
}
</script>
<template>
  <FormKit type="form" v-model="this.user">
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
        label="Your Email"
        name="email"
        prefix-icon="email"                                  
        placeholder="email@domain.com"
        validation="required|email"
    />
    <FormKit
        type="password"
        label="Password"
        name="password"
        validation="required|password"
    />
    <FormKit
        type="select"
        label="Loyalty"
        name="loyalty"
        placeholder="Praise the emperor?"
        :options="['Loyalist', 'Traitor']"
    />
  </FormKit>
</template>
<style scoped>

</style>