<template>
  <div class="home">
    <div id="promo" v-if="!hasFavourite">
      <b-jumbotron>
        <h1>UGent Studentenrestaurants</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </b-jumbotron>
    </div>
    <div v-else>
      <RestosInfo />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import userStore from '@/store/modules/user';
import restoStore from '@/store/modules/restos';
import RestosInfo from '@/views/RestosInfo.vue';

@Component({
  components: { RestosInfo },
})
export default class Home extends Vue {
  public async mounted() {
    if (this.hasFavourite) {
      restoStore.fetchCurrentResto({
        restoPath: userStore.user!.favouriteResto!,
      });
    }
  }
  get hasFavourite() {
    const t = userStore.user;
    return userStore.isLoggedIn && userStore.user!.favouriteResto;
  }
}
</script>

<style>
#promo {
  text-align: center;
  padding: 50px;
  background: url(../assets/images/sterres5.jpg) no-repeat;
  background-size: cover;
  word-wrap: break-word;
}

#promo .jumbotron {
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.75);
  max-width: 750px;
  margin: 0 auto;
  padding: 50px;
}

@media (max-width: 991px) {
  #promo {
    padding: 20px;
  }
  #promo .jumbotron {
    padding: 20px;
  }
}
</style>
