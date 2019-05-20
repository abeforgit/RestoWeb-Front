<template>
  <b-list-group-item>
    <b-card class="text-left">
      <b-row>
        <b-col>
          <b-card-text>{{ item.name }}</b-card-text>
        </b-col>
        <b-col md="auto">
          <b-card-text v-if="averageRating"
            >Gemiddelde Rating: {{ averageRating }}</b-card-text
          >
        </b-col>
        <b-col md="auto">
          <star-rating
            v-if="authorized"
            v-bind:star-size="30"
            @rating-selected="setRating"
            :rating="myRating ? myRating.rating : null"
          />
        </b-col>
        <b-col v-if="isAdmin" md="auto">
          <b-button v-b-modal="item.url">Wijzig</b-button>
          <b-button v-on:click="deleteDish">Verwijder</b-button>
          <FormModal :id="item.url">
            <EditDishForm :dish="item" />
          </FormModal>
        </b-col>
      </b-row>
    </b-card>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Dish, Rating } from '@/APITypes';
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
    return userStore.isLoggedIn;
  }
  get isAdmin() {
    return userStore.isAdmin;
  }
  get averageRating() {
    return (
      this.item.ratings.reduce(
        (prev: number, rating: Rating) => prev + rating.rating,
        0
      ) / this.item.ratings.length
    );
  }
  get myRating(): Rating | null {
    const result = this.item.ratings.find(
      (r: Rating) => r.user === userStore.user!.url
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  public async setRating(rating: number) {
    console.log(rating);
    if (this.myRating == null) {
      await dishStore.addRating({
        dishPath: getRoute(this.item.url),
        rating,
        token: userStore.auth!.token,
      });
    } else {
      const { user, url } = this.myRating;
      await dishStore.updateRating({
        rating: {
          rating,
          user,
          url,
        },
        token: userStore.auth!.token,
      });
    }
    await dishStore.fetchDishes();
  }

  public async deleteDish() {
    await dishStore.deleteDish({
      dishPath: getRoute(this.item.url),
      token: userStore.auth!.token,
    });
  }
}
</script>
<style scoped></style>
