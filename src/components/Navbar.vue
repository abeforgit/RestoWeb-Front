<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-brand :to="{ name: 'home' }">RESTOWEB</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'restos' }">Resto's</b-nav-item>
          <b-nav-item :to="{ name: 'dishes' }">Gerechten</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'login' }">Log in</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Navbar extends Vue {}
</script>

<style scoped>
</style>
