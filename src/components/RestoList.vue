<template>
  <div>
    <h1>Studentenrestaurants</h1>
    <h2>Info per locatie</h2>
    <ul>
      <li v-for="resto in restos">
        <router-link to="/">{{ resto.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import restoState from '@/store/modules/restos';

@Component
export default class RestoList extends Vue {
  get restos() {
    return restoState.restos;
  }

  private async created() {
    await restoState.fetchRestos();
  }
}
</script>

<style scoped></style>
