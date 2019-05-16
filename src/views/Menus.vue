<template>
  <div>
    <div v-if="pageData">
      <p>Pagina {{ page }} van {{ pageData.total_pages }}</p>
      <b-button :disabled="page <= 1" v-on:click="changePage(false)">Vorige</b-button>
      <b-button :disabled="page >= pageData.total_pages" v-on:click="changePage(true)">Volgende</b-button>
    </div>
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
export default class Menus extends Vue {
  public page: number = 1;

  private get menus() {
    return menuStore.menus;
  }

  private get pageData() {
    return menuStore.pageData;
  }

  public async created() {
    await this.fetchMenus();
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

  public async fetchMenus() {
    await menuStore.fetchMenus(this.page);
  }
}
</script>

<style scoped></style>
