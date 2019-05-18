<template>
    <div>
        <MenuDetails v-if="menu" menu="menu" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import menuStore from '@/store/modules/menus';

@Component
export default class MenusInfo extends Vue {
  get menu() {
    return menuStore.currentMenu;
  }

  private async beforeCreate() {
    await menuStore.fetchCurrentMenu(parseInt(this.$route.params.id, 10));
  }
}
</script>

<style>

</style>
