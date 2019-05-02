<template>
  <div>
    <b-list-group>
      <DishItem v-for="dish in dishes" :item="dish" />
    </b-list-group>
    <b-button>New</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import config from '@/config';
import { Dish } from '@/APITypes';
import DishItem from '@/components/DishItem.vue';
@Component({
  components: { DishItem },
})
export default class Dishes extends Vue {
  public dishes: Dish[] = [];
  private async created() {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: config.URL,
        url: 'dishes',
      });
      this.dishes = response.data.dishes;
    } catch (e) {
      console.log('Unable to fetch dishes');
    }
  }
}
</script>

<style scoped></style>
