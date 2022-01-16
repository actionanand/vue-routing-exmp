import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamFooter from './components/teams/TeamFooter.vue';
import UserFooter from './components/users/UserFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: '/', redirect: '/users' },
    { name: 'teams', path: '/teams', alias: '/',
      components: { default: TeamsList, footer: TeamFooter }, 
      children: [
        { name: 'team-member', path: ':teamId', component: TeamMembers, props: true }
      ] 
    },
    { path: '/users', components: { default: UsersList, footer: UserFooter },
      beforeEnter(_to, _from, next) {
        console.log('beforeEnter from "router array"');
        next();
      } 
    },
    { path: '/:notFound(.*)', component: NotFound }   
  ],
  linkActiveClass: 'active', // default css class is 'router-link-active'
  scrollBehavior(to, from, savedPosition) {
    console.log('Scroll position');
    console.log(to, from, savedPosition); // savedPosition will be having vaue when we click back button
    if (savedPosition) {
      return savedPosition;
    }
    return {left: 0, top: 0};
  }
});

router.beforeEach((to, from, next) => {
  console.log("beforeEach from 'Global Guard'");
  console.log(to, from);
  // if(to.name === 'team-member') {
  //   next();
  // } else {
  //   next({ name: 'team-member', params: {teamId: 't3' }});
  // }
  next();
});

router.afterEach((to, from) => {
  // routes can't be denied. It can be used to send analytics data
  console.log('Global "afterEach"');
  console.log(to, from);
});

const app = createApp(App);

app.use(router);

app.mount('#app');
