<template>
  <div class="dishes">
    <h1>Gerechtenlijst</h1>
    <b-list-group>
      <DishItem v-for="dish in dishes" :item="dish" :key="dish.url" />
    </b-list-group>
    <div v-if="isAdmin">
      <FormModal id="editModal">
        <EditDishForm #default />
      </FormModal>
      <b-button v-b-modal="'editModal'">Voeg gerecht toe</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DishItem from '@/components/DishItem.vue';
import dishStore from '@/store/modules/dishes';
import userStore from '@/store/modules/user';
import FormModal from '@/components/FormModal.vue';
import EditDishForm from '@/components/EditDishForm.vue';

@Component({
  components: { DishItem, FormModal, EditDishForm },
})
export default class Dishes extends Vue {
  get dishes() {
    return dishStore.dishes;
  }
  get isAdmin() {
    return userStore.isAdmin;
  }
  private async beforeCreate() {
    await dishStore.fetchDishes();
  }
}
</script>

<style scoped></style>
