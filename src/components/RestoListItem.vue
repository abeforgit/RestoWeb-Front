<template>
  <div>
    <a :href="resto.url">
      {{ resto.name }}
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resto } from '@/APITypes';
import { Prop } from 'vue-property-decorator';

@Component
export default class RestoListItem extends Vue {
  @Prop()
  private resto!: Resto;
}
</script>

<style scoped></style>
