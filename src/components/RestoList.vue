<template>
  <div>
    <h1>Studentenrestaurants</h1>
    <h2>Info per locatie</h2>
    <ul>
      <li v-for="resto in restos">
        <RestoListItem :resto="resto"></RestoListItem>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import Component from 'vue-class-component';
import config from '@/config';
import { Resto } from '@/APITypes';
import RestoListItem from '@/components/RestoListItem.vue';

@Component({
  components: { RestoListItem },
})
export default class RestoList extends Vue {
  public restos: Resto[] = [];

  private async mounted() {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: config.URL,
        url: 'restos',
      });
      this.restos = response.data.restos;
    } catch (e) {
      console.log('Unable to fetch restos');
    }
  }
}
</script>

<style scoped></style>
