<template>
  <div v-if="info">
    <h1>{{ info.name }} {{ this.$route.path }}</h1>
    <Location :location="info.location" />
    <p>{{ info.description }}</p>
    <Schedules :schedules="info.schedules" />
    <h2>Menu</h2>
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
  private info?: RestoInfo | null = null;
  private latestMenu? = null;

  private async created() {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: config.URL,
        url: this.$route.path,
      });
      this.info = response.data;
    } catch (e) {
      console.log('Unable to fetch restos');
    }
  }
}
</script>

<style scoped></style>
