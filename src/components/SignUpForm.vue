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
        v-model="form.password"
        type="password"
        placeholder="Password"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-input
        v-model="form.passwordRepeat"
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
