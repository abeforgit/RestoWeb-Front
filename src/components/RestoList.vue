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
import axios from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resto } from '@/APITypes';

@Component
export default class RestoList extends Vue {
  public restos: Resto[] = [];

  private async created() {
    try {
      const response = await axios.get('http://localhost:5000/restos');
      this.restos = response.data.restos;
    } catch (e) {
      console.log('Unable to fetch restos');
    }
  }
}
</script>

<style scoped></style>
