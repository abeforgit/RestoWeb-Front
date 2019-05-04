<template>
  <b-form @submit="onSubmit">
    <b-form-group>
      <b-form-input
        v-model="form.username"
        type="text"
        placeholder="Username"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-input
        v-model="passwordRepeat"
        type="password"
        placeholder="Password"
        required
      ></b-form-input>
    </b-form-group>

    <div class="text-center">
      <b-button type="submit" variant="primary">Sign up</b-button>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import userState from '@/store/modules/user.ts';

@Component
export default class SignUpForm extends Vue {
  public password: string;
  public passwordRepeat: string;

  public form = {
    username: '',
    password: '',
  };

  public async onSubmit(): void {
    if (this.password === this.passwordRepeat) {
      this.form.password = this.password;

      await userState.createUser(this.form);
    }
  }
}
</script>

<style scoped></style>
