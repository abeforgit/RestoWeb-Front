<template>
  <div>
    <h1>{{ user.username }}</h1>
    <h1 v-if="user.admin">Administrator</h1>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import userStore from '@/store/modules/user';

@Component
export default class Profile extends Vue {
  get user() {
    return userStore.user;
  }
}
</script>

<style scoped></style>
