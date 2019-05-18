<template>
  <div>
    <span>{{ parsedDate }}</span>
    <b-card-group horizontal>
      <DishDetails :dish="dish" v-for="dish in dishes" :key="dish.url" />
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
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

  @Prop()
  public menu!: MenuDetail;
  private parsedDate!: string;

  public async created() {
    this.parsedDate = parseDate(this.menu.date);
    await dishStore.fetchDishList(this.menu.dishes);
  }
}
</script>

<style scoped></style>
