<template>
  <div v-if="info">
    <h1>{{ info.name }}</h1>
    <Location :location="info.location" />
    <p>{{ info.description }}</p>
    <Schedules :schedules="info.schedules" />
    <MenuDetails v-if="latestMenu" :menu="latestMenu" />
    <div v-if="auth">
      <b-button v-b-modal="'EditModal'">Edit</b-button>
      <FormModal v-if="latestMenu" id="EditModal">
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
import { MenuInfo } from '@/APITypes';
import Location from '@/components/Location.vue';
import Schedules from '@/components/Schedules.vue';
import FormModal from '@/components/FormModal.vue';
import EditRestoForm from '@/components/EditRestoForm.vue';
import MenuDetails from '@/components/MenuDetails.vue';
import userStore from '@/store/modules/user';

@Component({
  components: { Schedules, Location, FormModal, EditRestoForm, MenuDetails },
})
export default class RestosInfo extends Vue {
  get info() {
    return restoStore.currentResto;
  }

  get latestMenu() {
    return menuStore.latestMenu;
  }
  get auth() {
    return userStore.auth;
  }

  private async created() {
    await restoStore.fetchCurrentResto(this.$route.params.id);
    await menuStore.fetchLatestMenu(this.$route.params.id);
  }
}
</script>

<style scoped></style>
