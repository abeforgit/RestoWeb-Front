<template>
  <div>
    <h1>Studentenrestaurants</h1>
    <h2>Info per locatie</h2>
    <ul>
      <li v-for="resto in restos" :key="resto.url">
        <router-link to="/">{{ resto.name }}</router-link>
      </li>
    </ul>
    <b-button v-on:click="toggleModal">Add Resto</b-button>
    <b-modal id="restoModal" v-model="modalActive">
      <EditRestoModal />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import restoState from '@/store/modules/restos.ts';
import EditRestoModal from '@/components/EditRestoModal.vue';

@Component({
  components: { EditRestoModal },
})
export default class RestoList extends Vue {
  private toggle: boolean = false;

  get restos() {
    return restoState.restos;
  }
  get modalActive() {
    return this.toggle;
  }

  private async created() {
    await restoState.fetchRestos();
  }
  private toggleModal() {
    this.toggle = !this.toggle;
  }
}
</script>

<style scoped></style>
