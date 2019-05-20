<template>
  <div>
    <MenuDetails v-if="menu" :menu="menu" />
    <div v-if="isAdmin">
      <b-button v-b-modal="'EditModal'">Wijzig</b-button>
      <b-button v-on:click="deleteMenu">Verwijder</b-button>
      <FormModal id="EditModal">
        <EditMenuForm :menu="menu" />
      </FormModal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import menuStore from '@/store/modules/menus';
import MenuDetails from '@/components/MenuDetails.vue';
import userStore from '../store/modules/user';
import FormModal from '@/components/FormModal.vue';
import EditMenuForm from '@/components/EditMenuForm.vue';

@Component({
  components: {
    MenuDetails,
    FormModal,
    EditMenuForm,
  },
})
export default class MenusInfo extends Vue {
  get menu() {
    return menuStore.currentMenu;
  }

  get isAdmin() {
    return userStore.isAdmin;
  }

  public async deleteMenu() {
    await menuStore.deleteMenu({
      menuPath: this.$route.path,
      token: userStore.auth!.token,
    });
    this.$router.go(-1);
  }

  private async beforeCreate() {
    await menuStore.fetchCurrentMenu({
      menuPath: this.$route.path,
    });
  }
}
</script>

<style></style>
