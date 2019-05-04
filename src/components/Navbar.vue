<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-brand to="/">
        RW
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/restos">Restos</b-nav-item>
          <b-nav-item to="/dishes">Dishes</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item to="/login">Login</b-nav-item>
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

<style scoped></style>
