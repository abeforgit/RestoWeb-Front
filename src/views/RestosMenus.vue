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
      <b-list-group>
        <b-list-group-item v-for="menu in menus" :key="menu.url"
          ><MenuItem :item="menu"
        /></b-list-group-item>
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
    return menuStore.restoMenus;
  }

  private get pageData() {
    return menuStore.pageData;
  }

  public async created() {
    await menuStore.fetchRestoMenus({
      page: this.page,
      restoId: parseInt(this.$route.params.id, 10),
    });
  }

  @Watch('page') public async onPageChanged(newPage: number, oldPage: number) {
    await menuStore.fetchRestoMenus({
      page: newPage,
      restoId: parseInt(this.$route.params.id, 10),
    });
  }
}
</script>

<style scoped></style>
