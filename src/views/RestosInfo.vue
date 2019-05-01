<template>
  <div>
    <h1>{{ info.name }}</h1>
    <h2>Location</h2>
    <p>
      {{ info.location.zip_code }} {{ info.location.city }} <br />
      {{ info.location.address }} <br />
      {{ info.location.campus }}
    </p>
    <h2>Description</h2>
    <h2>Schedules</h2>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import URL from '../App.vue';
import Component from 'vue-class-component';
import Vue from 'vue';
import { Resto } from '@/APITypes';

@Component
export default class RestosInfo extends Vue {
  public info?: Resto;

  private async mounted() {
    try {
      const response = await axios.get('http://localhost:5000/restos/1');
      this.info = response.data;
    } catch (e) {
      console.log('Unable to fetch restos');
    }
  }
}
</script>

<style scoped></style>
