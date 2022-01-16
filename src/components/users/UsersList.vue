<template>
  <button @click="confirmInput">Go to Team</button>
  <button @click="saveTheChanges">Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changesSaved: false
    };
  },
  methods: {
    confirmInput() {
      // some actions
      this.$router.push('/teams');
      // this.$router.forward();
      // this.$router.back();
    },
    saveTheChanges() {
      this.changesSaved = true;
    }
  },
  beforeRouteEnter(_to, _from, next) {
    console.log('"beforeRouteEnter" inside "User List" comp');
    next();
  },
  beforeRouteLeave(_to, _from, next) {
    console.log('"beforeRouteLeave" inside "User List" comp');
    if(this.changesSaved) {
      next();
    } else {
      const usersConsent = confirm("You've some unsaved chnages, Are you sure to leave?");
      next(usersConsent);
    }

  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>