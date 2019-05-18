<template>
  <div class="restos">
    <RestoList></RestoList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import restoStore, { NewResto } from '@/store/modules/restos.ts';
import EditRestoForm from '@/components/EditRestoForm.vue';
import RestoList from '@/components/RestoList.vue';

@Component({
  components: { AddRestoForm: EditRestoForm, RestoList },
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

    await restoStore.createResto({
      newResto: example,
    });
  }
}
</script>

<style scoped>
  .restos {
    padding: 20px;
  }
</style>
