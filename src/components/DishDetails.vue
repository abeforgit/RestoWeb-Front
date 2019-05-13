<template>
  <b-card>
    <b-card-header>{{ dish.name }}</b-card-header>
    <b-card-body>
      <div>{{ dish.price }}</div>
      <div>{{ dish.type }}</div>
      <div>{{ dish.diet }}</div>
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Dish } from '@/APITypes';

@Component
export default class DishDetails extends Vue {
  @Prop()
  public dish!: Dish;
}
</script>

<style scoped></style>
