<template>
  <div>
    <span>{{ parsedDate }}</span>
    <span>{{ dishes }}</span>
    <b-card-group horizontal>
      <DishDetails :dish="dish" v-for="dish in dishes" :key="dish.url" />
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

@Component({
  components: {
    DishDetails,
  },
})
export default class MenuDetails extends Vue {
  get dishes() {
    return dishStore.dishes;
  }

  get parsedDate() {
    return parseDate(this.menu.date);
  }

  @Prop()
  public menu!: MenuDetail;

  public async created() {
    await dishStore.fetchDishList({
      dishList: this.menu.dishes,
    });
  }

  @Watch('menu') public async onMenuChanged(
    newMenu: MenuDetail,
    oldMenu: MenuDetail
  ) {
    console.log(newMenu.dishes);
    await dishStore.fetchDishList({
      dishList: newMenu.dishes,
    });
  }
}
</script>

<style scoped></style>
