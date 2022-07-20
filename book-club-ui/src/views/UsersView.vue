<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {UserService} from "@/services/user-service";
import {UserDto} from "@/dtos/user-dto";
import {ref} from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

@Options({
  name: "UsersView",
  components: {LoadingSpinner},
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$emit('routeChange');
    });
  },
  emits: ["routeChange"]
})
export default class UserView extends Vue {

  users: UserDto[] = ref([]);
  loading: boolean = ref(false);

  async created() {
    this.loading = true;
    const service = new UserService();
    this.users = await service.getAllUsers();
    this.loading = false;
  }

  getImageSource(user: UserDto) {
    if (user.profilePictureUrl) {
      return user.profilePictureUrl;
    }
    return "/src/assets/unknown.jpg";
  }
}
</script>
<template>
  <LoadingSpinner :loading="loading"></LoadingSpinner>
  <div>
    <table style="width:100%;" v-if="users?.length > 0">
      <tr style="background: #8080806e;">
        <th/>
        <th/>
        <th>Books read</th>
        <th>Current book reading</th>
        <th>Last book finished</th>
      </tr>
      <tr v-for="(user, index) in users" :class="['user', `user-info-${index % 2 === 0 ? 'even' : 'odd'}`]">
        <td class="user-image-row">
          <img class="user-profile-pic" :src="getImageSource(user)" alt="Profile picture"/>
        </td>
        <td>
          <p class="user-name">{{ user.username }}</p>
        </td>
        <td>
          {{ user.booksRead === null ? 0 : user.booksRead.length }}
        </td>
        <td>
          {{ user.booksRead.length > 0 ? user.booksRead[user.booksRead.length - 1].name : ''}}
        </td>
        <td>
          {{ user.booksRead.length > 0 ? user.booksRead[user.booksRead.length - 1].name : ''}}
        </td>
      </tr>

    </table>
  </div>
</template>
<style scoped>

.user div {
  padding: 1%;
}

.user-image-row {
  width: 10%;
}

.user-profile-pic {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.user-info-odd {
  background: rgb(122, 122, 122, 91%);
}

.user-info-even {
  background: rgb(227, 227, 227);
}

.user-name {
  font-size: 32px;
}
table, th, td {
  border-spacing: 0;
}

th, tr {
  text-align: center
}

td {
  font-size: 32px;
}
</style>