<template>
  <div id="restolist_item">
    <router-link :to="restoPath">
      {{ resto.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resto } from '@/APITypes';
import { Prop } from 'vue-property-decorator';

@Component
export default class RestoListItem extends Vue {
  public restoPath: string;

  @Prop()
  public resto: Resto;

  public created() {
    const regex = '(https?://)([^:^/]*)(:\\d*)?(.*)?';
    const matched = this.resto.url.match(regex);

    this.restoPath = matched[4];
  }
}
</script>

<style scoped></style>
