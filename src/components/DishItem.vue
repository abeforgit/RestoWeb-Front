<template>
  <b-list-group-item>
    <b-card class="text-left">
      <b-row>
        <b-col>
          <b-card-text>{{ item.name }}</b-card-text>
        </b-col>
        <b-col md="auto">
          <b-button v-if="auth" v-b-modal="item.url">Edit</b-button>
        </b-col>
      </b-row>
    </b-card>
    <FormModal v-if="auth" :id="item.url">
      <EditDishForm :dish="item" />
    </FormModal>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Dish } from '@/APITypes';
import FormModal from '@/components/FormModal.vue';
import EditDishForm from '@/components/EditDishForm.vue';
import userStore from '@/store/modules/user';

@Component({
  components: { FormModal, EditDishForm },
})
export default class DishItem extends Vue {
  @Prop()
  private item!: Dish;

  get auth() {
    return userStore.auth;
  }
}
</script>

<style scoped></style>
