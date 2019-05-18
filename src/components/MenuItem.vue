<template>
  <div id="menu_item">
    <router-link :to="link">Menu voor {{ parsedDate }}</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Menu } from '@/APITypes';
import { getRoute } from '@/router';

@Component
export default class MenuItem extends Vue {
  private parsedDate!: string;

  @Prop()
  private item!: Menu;

  get link() {
    return getRoute(this.item.url);
  }
}
</script>

<style scoped></style>
