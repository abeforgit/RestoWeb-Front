<template>
  <div v-if="info">
    <h1>{{ info.name }}</h1>
    <Location :location="info.location"/>
    <p>{{ info.description }}</p>
    <Schedules :schedules="info.schedules"/>
    <b-button v-b-modal="'EditModal'">Edit</b-button>
    <FormModal id="EditModal">
      <EditRestoForm :resto="info"/>
    </FormModal>
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
import FormModal from '@/components/FormModal.vue';
import EditRestoForm from '@/components/EditRestoForm.vue';
@Component({
  components: { Schedules, Location, FormModal, EditRestoForm },
})
export default class RestosInfo extends Vue {
  public info: RestoInfo | null = null;

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
