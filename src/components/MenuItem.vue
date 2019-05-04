<template>
  <p></p>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Menu } from '@/APITypes';

@Component
export default class MenuItem extends Vue {
  @Prop()
  public item!: Menu;
}
</script>

<style scoped></style>
