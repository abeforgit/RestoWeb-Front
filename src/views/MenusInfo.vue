<template>
  <div>
    <MenuDetails />
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
  private async beforeCreate() {
    await menuStore.fetchCurrentMenu({
      menuPath: this.$route.path,
    });
  }
}
</script>

<style></style>
