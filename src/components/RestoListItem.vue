<template>
  <div>
    <router-link :to="restoPath">
      {{ resto.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getURLPath } from '@/util';
import Component from 'vue-class-component';
import { Resto } from '@/APITypes';
import { Prop } from 'vue-property-decorator';

@Component
export default class RestoListItem extends Vue {
  private restoPath: string | null = null;

  @Prop()
  private resto!: Resto;

  private created() {
    this.restoPath = getURLPath(this.resto.url);
  }
}
</script>

<style scoped></style>
