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
  private restoPath: string | null = null;

  @Prop()
  private resto!: Resto;

  private created() {
    const regex = '(https?://)([^:^/]*)(:\\d*)?(.*)?';
    const matched = this.resto.url.match(regex);

    this.restoPath = matched ? matched[4] : null;
  }
}
</script>

<style scoped></style>
