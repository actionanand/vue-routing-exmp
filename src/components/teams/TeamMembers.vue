<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  created() {
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.query); // to access query params
  },
  beforeRouteUpdate(_to, _from, next) {
    console.log('beforeRouteUpdate inside "Team Member"');
    // the same logic of 'watch' here can be achieved using this 'beforeRouteUpdate'
    // this.loadTeamMembers(_to.params.teamId);
    next();
  },
  methods: {
    loadTeamMembers(teamId) {
      // this.$route.path // will give relative path
      // const teamId = this.$route.params.teamId;
      const selectedTeam = this.teams.find(team => team.id === teamId);
      // if (!selectedTeam) return;
      const members = selectedTeam.members;
      const selectedMembers = [];

      for(const member of members) {
        const selectedUser = this.users.find(user => user.id === member);
        selectedMembers.push(selectedUser);
      }

      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    }
  },
  watch: {
    teamId(newId) {
      // this is to update the content when url chnages being in the same page(only data change)
      this.loadTeamMembers(newId);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>