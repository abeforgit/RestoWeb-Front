<template>
  <div v-if="info">
    <h1>{{ info.name }}</h1>
    <Location :location="info.location" />
    <p>{{ info.description }}</p>
    <Schedules :schedules="info.schedules" />

    <b-button v-b-modal="'EditModal'">Edit</b-button>
    <div v-if="latestMenu">
      <MenuDetails :menu="latestMenu" />
      <FormModal id="EditModal">
        <EditRestoForm :resto="info" />
      </FormModal>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import restoStore from '@/store/modules/restos';
import menuStore from '@/store/modules/menus';
import { MenuDetail } from '@/APITypes';
import Location from '@/components/Location.vue';
import Schedules from '@/components/Schedules.vue';
import FormModal from '@/components/FormModal.vue';
import EditRestoForm from '@/components/EditRestoForm.vue';
import MenuDetails from '@/components/MenuDetails.vue';

@Component({
  components: { Schedules, Location, FormModal, EditRestoForm, MenuDetails },
})
export default class RestosInfo extends Vue {
  public testMenu: MenuDetail = {
    url: 'test',
    menu: {
      url: 'test',
    },
    dishes: [
      {
        url: 'dish1',
        name: 'kaas',
        price: 2,
        type: 'nee',
        diet: 'mooi',
      },
      {
        url: 'dish2',
        name: 'kaas',
        price: 2,
        type: 'nee',
        diet: 'mooi',
      },
      {
        url: 'dish3',
        name: 'kaas',
        price: 2,
        type: 'nee',
        diet: 'mooi',
      },
      {
        url: 'dish4',
        name: 'kaas',
        price: 2,
        type: 'nee',
        diet: 'mooi',
      },
    ],
  };

  get info() {
    return restoStore.currentResto;
  }

  get latestMenu() {
    return menuStore.latestMenu;
  }

  private async created() {
    await restoStore.fetchCurrentResto(this.$route.params.id);
    await menuStore.fetchLatestMenu(this.$route.params.id);
  }
}
</script>

<style scoped></style>
