<template>
  <div>
    <b-list-group>
      <DishItem v-for="dish in dishes" :item="dish" :key="dish.url"/>
    </b-list-group>
    <FormModal id="editModal">
      <EditDishForm #default/>
    </FormModal>
    <b-button v-b-modal="'editModal'">Add Dish</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DishItem from '@/components/DishItem.vue';
import dishStore from '@/store/modules/dishes';
import FormModal from '@/components/FormModal.vue';
import EditDishForm from '@/components/EditDishForm.vue';

@Component({
  components: { DishItem, FormModal, EditDishForm },
})
export default class Dishes extends Vue {
  get dishes() {
    return dishStore.dishes;
  }
  private async created() {
    await dishStore.fetchDishes();
  }
}
</script>

<style scoped></style>
