<template>
  <div class="resto_info" v-if="info">
    <h1>{{ info.name }}</h1>
    <Location :location="info.location" />
    <p>{{ info.description }}</p>
    <hr />

    <Schedules :schedules="info.schedules" />
    <hr />

    <h2>Menu's</h2>
    <h3>Meest recent menu</h3>
    <div v-if="latestMenu">
      <MenuDetails v-if="latestMenu" :menu="latestMenu" />
    </div>
    <div v-else>
      <p>Geen recent menu gevonden.</p>
    </div>
    <h3>Overige menu's</h3>
    <router-link :to="`/restos/` + this.$route.params.id + `/menus`"
      >Toon lijst</router-link
    >

    <div v-if="auth">
      <b-button v-b-modal="'EditModal'">Wijzig</b-button>
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
  get info() {
    return restoStore.currentResto;
  }

  get latestMenu() {
    return menuStore.latestMenu;
  }
  get auth() {
    return userStore.auth;
  }

  private async beforeCreate() {
    await restoStore.fetchCurrentResto({
      restoId: parseInt(this.$route.params.id, 10),
    });
    await menuStore.fetchLatestMenu({
      restoId: parseInt(this.$route.params.id, 10),
    });
  }
}
</script>

<style scoped>
.resto_info {
  padding: 20px;
}
</style>
