<template>
  <b-list-group-item>
    <b-card class="text-left">
      <b-row>
        <b-col>
          <b-card-text>{{ item.name }}</b-card-text>
        </b-col>
        <b-col md="auto">
          <star-rating
                  v-if="authorized"
                       v-bind:star-size="30"
                       @rating-selected="setRating" />
        </b-col>
        <b-col md="auto">
          <b-button v-if="isAdmin" v-b-modal="item.url">Wijzig</b-button>
        </b-col>
      </b-row>
    </b-card>
    <FormModal v-if="isAdmin" :id="item.url">
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
import dishStore from '@/store/modules/dishes';
import { getRoute } from '@/router';

@Component({
  components: { FormModal, EditDishForm },
})
export default class DishItem extends Vue {
  @Prop()
  private item!: Dish;

  get auth() {
    return userStore.auth;
  }
  get authorized() {
    return userStore.auth && userStore.auth.token;
  }
  get isAdmin() {
    return userStore.user && userStore.user.admin;
  }

  public async setRating(rating: number) {
    await dishStore.addRating({
      dishPath: getRoute(this.item.url),
      rating,
      token: userStore.auth!.token,
    });
  }
}
</script
<style scoped>
</style>
