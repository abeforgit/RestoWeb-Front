<template>
  <SignUpForm></SignUpForm>
</template>

<script lang="ts">
import Vue from 'vue';
import SignUpForm from '../components/SignUpForm.vue';
import Component from 'vue-class-component';
import userStore from '@/store/modules/user';
import { Watch } from 'vue-property-decorator';
import { APIStatus } from '@/APITypes';

@Component({
  components: { SignUpForm },
})
export default class SignUp extends Vue {
  get apiStatus() {
    return userStore.status.createUser;
  }
  @Watch('apiStatus')
  public redirectLogin(newStatus: APIStatus, oldStatus: APIStatus) {
    // TODO: not so sure about this code
    if (newStatus === 'OK') {
      this.$router.push({ name: 'login' });
      userStore.status = { createUser: 'NONE' };
    }
  }
}
</script>

<style scoped></style>
