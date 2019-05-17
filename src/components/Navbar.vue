<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-brand :to="{ name: 'home' }">RW</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'restos' }">Resto's</b-nav-item>
          <b-nav-item :to="{ name: 'menus' }">Menu's</b-nav-item>
          <b-nav-item :to="{ name: 'dishes' }">Gerechten</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <template v-if="!loggedIn">
            <b-nav-item :to="{ name: 'login' }">Sign in</b-nav-item>
            <b-nav-item :to="{ name: 'signup' }">Sign up</b-nav-item>
          </template>
          <template v-else>
            <b-nav-item v-on:click="logout">Logout</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import userState from '@/store/modules/user';

@Component
export default class Navbar extends Vue {
  get loggedIn() {
    console.log(userState.auth);
    return userState.auth != null;
  }

  public async logout() {
    userState.logout();
  }
}
</script>

<style scoped></style>
