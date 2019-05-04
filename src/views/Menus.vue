<template>
  <div>
    <MenuItem v-for="item in menus" :item="item" :key="item.url"></MenuItem>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import menuStore from '@/store/modules/menus';
import MenuItem from '@/components/MenuItem.vue';

@Component({
  components: { MenuItem },
})
export default class Dishes extends Vue {
  get menus() {
    return menuStore.menus;
  }

  private async created() {
    await menuStore.fetchMenus(1);
  }
}
</script>

<style scoped></style>
