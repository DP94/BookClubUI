<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {UserService} from "@/services/user-service";
import {UserDto} from "@/dtos/user-dto";
import {ref} from "vue";

@Options({
  name: "UsersView", beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$emit('routeChange');
    });
  },
  emits: ["routeChange"]
})
export default class UserView extends Vue {

  users: UserDto[] = ref([]);

  async created() {
    const service = new UserService();
    this.users = await service.getAllUsers();
  }
}
</script>
<template>
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
        <td>
          <img class="user-profile-pic" src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile picture"/>
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

.user-profile-pic {
  border-radius: 50%;
  height: 200px;
  width: 200px;
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