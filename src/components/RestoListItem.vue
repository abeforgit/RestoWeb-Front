<template>
  <router-link :to="link">{{ resto.name }}</router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resto } from '@/APITypes';
import { Prop } from 'vue-property-decorator';
import { getRoute } from '@/router';

@Component
export default class RestoListItem extends Vue {
  @Prop()
  private resto!: Resto;

  get link() {
    return getRoute(this.resto.url);
  }
}
</script>

<style scoped></style>
