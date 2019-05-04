<template>
  <div>
    <h1>Studentenrestaurants</h1>
    <h2>Info per locatie</h2>
    <ul>
      <li v-for="resto in restos" :key="resto.url">
        <RestoListItem :resto="resto"></RestoListItem>
      </li>
    </ul>
    <b-button v-on:click="toggleModal">Add Resto</b-button>
    <b-modal
      id="restoModal"
      v-model="modalActive"
      cancel-disabled="true"
      ok-disabled="true"
    >
      <EditRestoForm formId="edit-form" />
      <b-button form="edit-form" type="submit">OK</b-button>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import RestoListItem from '@/components/RestoListItem.vue';
import restoState from '@/store/modules/restos';
import EditRestoForm from '@/components/EditRestoForm.vue';

@Component({
  components: { EditRestoForm, RestoListItem },
})
export default class RestoList extends Vue {
  private toggle: boolean = false;
  get restos() {
    return restoState.restos;
  }
  get modalActive() {
    return this.toggle;
  }
  set modalActive(flag: boolean) {
    this.toggle = flag;
  }

  public toggleModal() {
    this.toggle = !this.toggle;
  }
  public async created() {
    await restoState.fetchRestos();
  }
}
</script>

<style scoped></style>
