<template>
  <div class="login">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import Component from 'vue-class-component';
import userStore from '@/store/modules/user';
import { Watch } from 'vue-property-decorator';

@Component({
  components: { LoginForm },
})
export default class Login extends Vue {
  get isLoggedIn() {
    return userStore.isLoggedIn;
  }
  @Watch('isLoggedIn')
  public redirectHome(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style scoped></style>
