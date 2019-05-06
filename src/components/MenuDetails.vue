<template>
  <div>
    <span>{{menu.url}}</span>
    <b-card-group horizontal>
      <DishDetails :dish="dish" v-for="dish in menu.dishes" :key="dish.url"/>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MenuDetail } from '../APITypes';
import DishDetails from '@/components/DishDetails.vue';

@Component({
  components: {
    DishDetails,
  },
})
export default class MenuDetails extends Vue {
  @Prop()
  public menu!: MenuDetail;
}
</script>

<style scoped>
</style>


