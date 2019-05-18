<template>
  <div>
    <MenuDetails v-if="menu" :menu="menu" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import menuStore from '@/store/modules/menus';
import MenuDetails from '@/components/MenuDetails.vue';

@Component({
  components: {
    MenuDetails,
  },
})
export default class MenusInfo extends Vue {
  get menu() {
    return menuStore.currentMenu;
  }

  private async beforeCreate() {
    await menuStore.fetchCurrentMenu({
      menuPath: this.$route.path,
    });
  }
}
</script>

<style></style>
