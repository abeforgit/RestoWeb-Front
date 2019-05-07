<template>
  <div v-if="info">
    <h1>{{ info.name }}</h1>
    <Location :location="info.location"/>
    <p>{{ info.description }}</p>
    <Schedules :schedules="info.schedules"/>

    <MenuDetails :menu="latestMenu"/>
    <div v-if="auth">
      <b-button v-b-modal="'EditModal'">Edit</b-button>
      <div v-if="latestMenu">
        <FormModal id="EditModal">
          <EditRestoForm :resto="info"/>
        </FormModal>
      </div>
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
import userStore from '@/store/modules/user';

@Component({
  components: { Schedules, Location, FormModal, EditRestoForm, MenuDetails },
})
export default class RestosInfo extends Vue {
  public testMenu!: MenuDetail;
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
    await restoStore.fetchCurrentResto(parseInt(this.$route.params.id, 10));
    await menuStore.fetchLatestMenu(parseInt(this.$route.params.id, 10));
  }
}
</script>

<style scoped></style>
