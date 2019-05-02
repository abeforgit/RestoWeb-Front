<template>
  <div>
    <b-list-group>
      <DishItem v-for="dish in dishes" :item="dish" :key="dish.url" />
    </b-list-group>
    <b-button v-on:click="createDish">New</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DishItem from '@/components/DishItem.vue';
import dishStore from '@/store/modules/dishes';

@Component({
  components: { DishItem },
})
export default class Dishes extends Vue {
  get dishes() {
    return dishStore.dishes;
  }
  public async createDish() {
    await dishStore.createDish({ name: 'Test' });
  }
  private async created() {
    await dishStore.fetchDishes();
  }
}
</script>

<style scoped></style>
