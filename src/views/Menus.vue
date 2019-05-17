<template>
  <div>
    <h1>Menulijst</h1>
    <div v-if="pageData">
      <b-pagination 
        :total-rows="pageData.total_menus" 
        v-model="page"
        :per-page="pageData.limit">
      </b-pagination>
      <b-list-group>
        <b-list-group-item v-for="menu in menus" :key="menu.url"><MenuItem :item="menu"/></b-list-group-item>
      </b-list-group>
     </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import menuStore from '@/store/modules/menus';
import Component from 'vue-class-component';
import MenuItem from '@/components/MenuItem.vue';
import { Watch } from 'vue-property-decorator';

@Component({
  components: { MenuItem },
})
export default class Menus extends Vue {
  private page: number = 1;

  private get menus() {
    return menuStore.menus;
  }

  private get pageData() {
    return menuStore.pageData;
  }

  public async created() {
    await this.fetchMenus(this.page);
  }

  public changePage(next: boolean) {
    if (this.pageData !== null) {
      if (next) {
        if (this.page < this.pageData.total_pages) {
          this.page++;
        }
      } else {
        if (this.page > 1) {
          this.page--;
        }
      }
      menuStore.fetchMenus(this.page);
    }
  }

  public async fetchMenus(page: number) {
    await menuStore.fetchMenus(this.page);
  }

  @Watch('page') public onPageChanged(oldPage: number, newPage: number) {
    this.fetchMenus(newPage);
  }
}
</script>

<style scoped></style>
