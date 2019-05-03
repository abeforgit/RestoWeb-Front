<template>
  <div>
    <h1>{{ info.name }}</h1>
    <Location :location="info.location" />
    <p>{{ info.description }}</p>
    <Schedules :schedules="info.schedules" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import config from '@/config';
import Component from 'vue-class-component';
import Vue from 'vue';
import { RestoInfo } from '@/APITypes';
import Location from '@/components/Location.vue';
import Schedules from '@/components/Schedules.vue';
@Component({
  components: { Schedules, Location },
})
export default class RestosInfo extends Vue {
  public info?: RestoInfo = null;

  public async mounted() {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: config.URL,
        url: 'restos/' + this.$route.params.id,
      });
      this.info = response.data;
    } catch (e) {
      console.log('Unable to fetch restos');
    }
  }
}
</script>

<style scoped></style>
