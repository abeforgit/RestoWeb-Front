<template>
  <div>
    <h1>Menulijst</h1>
    <div v-if="pageData">
      <b-pagination
        :total-rows="pageData.total_menus"
        v-model="page"
        :per-page="pageData.limit"
      >
      </b-pagination>
    </div>
    <b-button v-if="isAdmin" v-b-modal="'EditModal'">Voeg toe</b-button>
    <FormModal id="EditModal">
      <EditMenuForm #default />
    </FormModal>
    <b-list-group>
      <b-list-group-item v-for="menu in menus" :key="menu.url">
        <MenuItem :item="menu" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import menuStore from '@/store/modules/menus';
import Component from 'vue-class-component';
import MenuItem from '@/components/MenuItem.vue';
import { Watch } from 'vue-property-decorator';
import userStore from '@/store/modules/user';
import FormModal from '@/components/FormModal.vue';
import EditMenuForm from '@/components/EditMenuForm.vue';

@Component({
  components: { MenuItem, FormModal, EditMenuForm },
})
export default class Menus extends Vue {
  private page: number = 1;

  get isAdmin() {
    return userStore.isAdmin;
  }

  private get menus() {
    return menuStore.restoMenus;
  }

  private get pageData() {
    return menuStore.pageData;
  }

  public async created() {
    await menuStore.fetchRestoMenus({
      page: this.page,
      restoMenusPath: this.$route.path,
    });
  }

  @Watch('page') public async onPageChanged(newPage: number, oldPage: number) {
    await menuStore.fetchRestoMenus({
      page: newPage,
      restoMenusPath: this.$route.path,
    });
  }
}
</script>

<style scoped></style>
