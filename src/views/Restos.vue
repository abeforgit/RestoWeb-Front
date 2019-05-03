<template>
  <div>
    <RestoList></RestoList>
    <AddRestoForm></AddRestoForm>
    <b-button v-on:click="createResto">Add</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import restoStore, { NewResto } from '@/store/modules/restos.ts';
import AddRestoForm from '@/components/AddRestoForm.vue';
import RestoList from '@/components/RestoList.vue';

@Component({
  components: { AddRestoForm, RestoList },
})
export default class Restos extends Vue {
  private async createResto() {
    const example: NewResto = {
      description: 'test',
      name: 'test',
      location: {
        campus: 'test',
        city: 'yoink',
        address: 'yeeeeet',
        zip_code: 'angery',
      },
    };

    await restoStore.createResto(example);
  }
}
</script>

<style scoped></style>
