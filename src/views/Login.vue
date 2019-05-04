<template>
  <LoginForm></LoginForm>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginForm from '@/components/LoginForm';
import Component from 'vue-class-component';

@Component({
  components: { LoginForm },
})
export default class Login extends Vue {}
</script>

<style scoped></style>
