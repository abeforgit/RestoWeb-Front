<template>
  <div id="schedules">
    <h2>Schedules</h2>
    <ul>
      <li v-for="schedule in schedules">
        {{ schedule.time_open }} - {{ schedule.time_closed }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Schedule } from '@/APITypes';

@Component
export default class RestosInfo extends Vue {
  @Prop({ required: true })
  private schedules!: Schedule[];
}
</script>

<style scoped></style>
