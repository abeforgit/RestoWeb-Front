<template>
  <div class="restolist">
    <h1>Studentenrestaurants</h1>
    <h2>Info per locatie</h2>
    <ul class="arrowlist">
      <li v-for="resto in restos" :key="resto.url">
        <RestoListItem :resto="resto"></RestoListItem>
      </li>
    </ul>
    <div v-if="isAdmin">
      <b-button v-b-modal="'RestoModal'">Voeg resto toe</b-button>
      <FormModal id="RestoModal">
        <EditRestoForm #default />
      </FormModal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import RestoListItem from '@/components/RestoListItem.vue';
import restoState from '@/store/modules/restos';
import userStore from '@/store/modules/user';
import EditRestoForm from '@/components/EditRestoForm.vue';
import FormModal from '@/components/FormModal.vue';

@Component({
  components: { EditRestoForm, RestoListItem, FormModal },
})
export default class RestoList extends Vue {
  private toggle: boolean = false;

  get restos() {
    return restoState.restos;
  }
  get isAdmin() {
    return userStore.isAdmin;
  }

  public async beforeCreate() {
    await restoState.fetchRestos();
  }
}
</script>

<style scoped></style>
