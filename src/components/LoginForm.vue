<template>
  <div class="login_form">
    <div id="credentials">
      <b-card id="credentials_card">
        <h1>Login</h1>
        <b-form @submit.stop.prevent="onSubmit">
          <b-form-group label="Gebruikersnaam" label-for="username">
            <b-form-input
              v-model="form.username"
              id="username"
              type="text"
              placeholder="Gebruikersnaam"
              required
            />
          </b-form-group>

          <b-form-group label="Wachtwoord" label-for="password">
            <b-form-input
              v-model="form.password"
              id="password"
              type="password"
              placeholder="Wachtwoord"
              required
            />
          </b-form-group>

          <div class="text-center">
            <b-button type="submit" variant="primary">Sign In</b-button>
            <b-button variant="link" :to="{ name: 'signup' }">
              Create an account
            </b-button>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
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
