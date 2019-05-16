<template>
  <div>
    <span>{{ menu.date }}</span>
    <b-card-group horizontal>
      <DishDetails :dish="dish" v-for="dish in dishes" :key="dish.url" />
      {{ dishes }}
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MenuInfo } from '@/APITypes';
import dishStore from '@/store/modules/dishes';
import DishDetails from '@/components/DishDetails.vue';

@Component({
  components: {
    DishDetails,
  },
})
export default class MenuDetails extends Vue {
  @Prop()
  public menu!: MenuInfo;

  get dishes() {
    return dishStore.dishes;
  }

  public async created() {
    await dishStore.fetchDishList(this.menu.dishes);
  }
}
</script>

<style scoped></style>
