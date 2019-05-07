<template>
  <b-form @submit.stop.prevent="onSubmit">
    <b-form-group>
      <b-form-input v-model="form.username" type="text" placeholder="Username" required/>
    </b-form-group>

    <b-form-group>
      <b-form-input v-model="form.password" type="password" placeholder="Password" required/>
    </b-form-group>

    <div class="text-center">
      <b-button type="submit" variant="primary">Sign In</b-button>
      <b-button variant="link" :to="{ name: 'signup' }">Create an account</b-button>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import userState from '@/store/modules/user.ts';
import Component from 'vue-class-component';

@Component
export default class LoginForm extends Vue {
  public form = {
    username: '',
    password: '',
  };

  public async onSubmit(): Promise<void> {
    await userState.loginUser(this.form);
  }
}
</script>

<style scoped></style>
