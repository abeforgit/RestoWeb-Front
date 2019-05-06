<template>
  <SignUpForm></SignUpForm>
</template>

<script lang="ts">
import Vue from 'vue';
import SignUpForm from '../components/SignUpForm.vue';
import Component from 'vue-class-component';

@Component({
  components: { SignUpForm },
})
export default class SignUp extends Vue {}
</script>

<style scoped></style>
