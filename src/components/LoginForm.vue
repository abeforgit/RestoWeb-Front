<template>
  <b-form>
    <b-form-group>
      <b-form-input
        v-model="form.username"
        type="text"
        placeholder="Username"
        required
      />
    </b-form-group>

    <b-form-group>
      <b-form-input
        v-model="form.password"
        type="password"
        placeholder="Password"
        required
      />
    </b-form-group>

    <div class="text-center">
      <b-button type="submit" variant="primary" block>Sign In</b-button>
      <b-button variant="link">Sign Up?</b-button>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LoginForm extends Vue {
  public form = {
    username: '',
    password: '',
  };
}
</script>

<style scoped></style>
