<template>
  <div>
    <b-pagination
      v-model="page"
      @change="fetchMenus"
      :total-rows="pageData.total_menus"
      :per-page="pageData.limit"
      aria-controls="my-table"
    ></b-pagination>
    <MenuItem v-for="item in menus" :item="item" :key="item.url"></MenuItem>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import menuStore from '@/store/modules/menus';
import Component from 'vue-class-component';
import MenuItem from '@/components/MenuItem.vue';

@Component({
  components: { MenuItem },
})
export default class Dishes extends Vue {
  public page: number = 1;

  get menus() {
    return menuStore.menus;
  }

  get pageData() {
    return menuStore.pageData;
  }

  public async created() {
    await this.fetchMenus();
  }

  public async fetchMenus() {
    await menuStore.fetchMenus(this.page);
  }
}
</script>

<style scoped></style>
