<template>
  <div class="signup_form">
    <div id="credentials">
      <b-card id="credentials_card">
        <h1>Sign up</h1>
        <b-form @submit="onSubmit">
          <b-form-group label="Gebruikersnaam" label-for="username">
            <b-form-input
              v-model="form.username"
              id="username"
              type="text"
              placeholder="Gebruikersnaam"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Wachtwoord" label-for="password">
            <b-form-input
              v-model="form.password"
              id="password"
              type="password"
              placeholder="Wachtwoord"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Herhaal wachtwoord" label-for="password_repeat">
            <b-form-input
              v-model="form.passwordRepeat"
              id="password_repeat"
              type="password"
              placeholder="Herhaal wachtwoord"
              required
            ></b-form-input>
          </b-form-group>

          <div class="text-center">
            <b-button type="submit" variant="primary">Sign up</b-button>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import userState from '@/store/modules/user.ts';

interface SignupFormData {
  username: string;
  password: string;
  passwordRepeat: string;
}
@Component
export default class SignUpForm extends Vue {
  private formData: SignupFormData = {
    username: '',
    password: '',
    passwordRepeat: '',
  };

  get form() {
    return this.formData;
  }
  set form(form: SignupFormData) {
    this.formData = form;
  }

  public async onSubmit(evt: Event): Promise<void> {
    evt.preventDefault();
    if (this.formData.password === this.formData.passwordRepeat) {
      const { username, password } = this.formData;

      await userState.createUser({
        username,
        password,
      });
    }
  }
}
</script>

<style scoped></style>
