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
  
  onFileChanged(event) {
    const file = event.target.files[0];
    this.$refs.profilePic.src = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.user.profilePicImage = reader.result.replace("data:", "")
          .replace(/^.+,/, "");
    }
    reader.readAsDataURL(file);
  }
  
  clearProfilePicture() {
    this.user.profilePictureUrl = '';
    this.$refs.profilePic.src = "/src/assets/unknown.jpg";
    this.$refs.profilePicInput.focus();
  }
  
  getImageSource() {
    if (this.user.profilePictureUrl) {
      return this.user.profilePictureUrl;
    }
    return "/src/assets/unknown.jpg";
  }
}
</script>
<template>
  <FormKit type="form" v-model="this.user" :actions="false">
    <div class="user-profile-pic-container">
      <div class="inner-pic-container">
        <img class="user-profile-pic" ref="profilePic" :src="getImageSource()"/>
        <div class="user-profile-overlay">
          <div class="user-profile-pic-change">
            <button type="button" @click="$refs.profilePicInput.click()">Change</button>
            <button type="button" @click="clearProfilePicture()">Clear</button>
          </div>
        </div>
      </div>
      <input type="file" ref="profilePicInput" style="display: none" @change="onFileChanged" accept="image/*">
    </div>
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

.user-profile-pic-container {
  margin-bottom: 2%;
  display: flex;
  justify-content: center;
  position: relative;
}

.user-profile-pic {
  border-radius: 100%;
  width: 15%;
  cursor: pointer;
  backface-visibility: hidden;
}

.user-profile-overlay {
  transition: .2s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
}

.user-profile-pic:hover + .user-profile-pic {
  opacity: 0.3;
}

.inner-pic-container {
  width: 100%;
  text-align: center;
}

.inner-pic-container:hover  .user-profile-overlay {
  opacity: 1;
}

.inner-pic-container:hover  .user-profile-pic {
  opacity: 0.3;
}

</style>