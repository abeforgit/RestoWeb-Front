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
import config from '@/config';
import Component from 'vue-class-component';
import Vue from 'vue';
import { Resto } from '@/APITypes';

@Component
export default class RestosInfo extends Vue {
  public info?: Resto;

  public async mounted() {
    console.log(process.env.VUE_APP_API_URL);
    try {
      const response = await axios({
        method: 'GET',
        baseURL: config.URL,
        url: 'restos',
      });
      this.info = response.data;
    } catch (e) {
      console.log('Unable to fetch restos');
    }
  }
}
</script>

<style scoped></style>
