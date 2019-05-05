<template>
  <b-list-group-item button>
    <b-card class="text-left">
      <b-row>
        <b-col>
          <b-card-text>{{ item.name }}</b-card-text>
        </b-col>
        <b-col md="auto">
          <b-button>Edit</b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Dish } from '@/APITypes';

@Component
export default class DishItem extends Vue {
  @Prop()
  private item!: Dish;
}
</script>

<style scoped></style>
