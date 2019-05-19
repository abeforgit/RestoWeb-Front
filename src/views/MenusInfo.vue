<template>
  <div>
    <MenuDetails v-if="menu" :menu="menu" />
    <b-button>Wijzig</b-button>
    <b-button v-on:click="deleteMenu">Verwijder</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import menuStore from '@/store/modules/menus';
import MenuDetails from '@/components/MenuDetails.vue';
import userStore from '../store/modules/user';

@Component({
  components: {
    MenuDetails,
  },
})
export default class MenusInfo extends Vue {
  get menu() {
    return menuStore.currentMenu;
  }

  public async beforeCreate() {
    await menuStore.fetchCurrentMenu({
      menuPath: this.$route.path,
    });
  }

  public async deleteMenu() {
    await menuStore.deleteMenu({
      menuPath: this.$route.path,
      token: userStore.auth!.token,
    });
    this.$router.go(-1);
  }
}
</script>

<style></style>
