<template>
  <div>
    <span>{{ parsedDate }}</span>
    <b-card-group v-if="dishList" horizontal>
      <DishDetails :dish="dish" v-for="dish in dishList" :key="dish.url" />
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MenuDetail } from '@/APITypes';
import dishStore from '@/store/modules/dishes';
import DishDetails from '@/components/DishDetails.vue';
import { parseDate } from '@/util';
import menuStore from '@/store/modules/menus';

@Component({
  components: {
    DishDetails,
  },
})
export default class MenuDetails extends Vue {
  get dishList() {
    return dishStore.dishList;
  }

  get parsedDate() {
    if (this.menu) {
      return parseDate(this.menu.date);
    }
    return null;
  }

  get menu() {
    return menuStore.currentMenu;
  }

  // @Prop()
  // public menu!: MenuDetail;

  // public async mounted() {
  //   if (this.menu) {
  //     await dishStore.fetchDishList({
  //       dishList: this.menu.dishes,
  //     });
  //   }
  // }

  @Watch('menu') public async onMenuChanged(
    newMenu: MenuDetail,
    oldMenu: MenuDetail
  ) {
    await dishStore.fetchDishList({
      dishList: newMenu.dishes,
    });
  }
}
</script>

<style scoped></style>
