<template>
  <div>
    <h1>Studentenrestaurants</h1>
    <h2>Info per locatie</h2>
    <ul>
      <li v-for="resto in restos" :key="resto.url">
        <RestoListItem :resto="resto"></RestoListItem>
      </li>
    </ul>
    <b-button v-b-modal="'RestoModal'">Add Resto</b-button>
    <FormModal id="RestoModal">
      <EditRestoForm #default/>
    </FormModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import RestoListItem from '@/components/RestoListItem.vue';
import restoState from '@/store/modules/restos';
import EditRestoForm from '@/components/EditRestoForm.vue';
import FormModal from '@/components/FormModal.vue';

@Component({
  components: { EditRestoForm, RestoListItem, FormModal },
})
export default class RestoList extends Vue {
  get restos() {
    return restoState.restos;
  }

  public async created() {
    await restoState.fetchRestos();
  }
}
</script>

<style scoped></style>
