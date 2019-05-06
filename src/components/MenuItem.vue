<template>
  <p>Menu voor {{ parsedDate }}</p>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Menu } from '@/APITypes';

@Component
export default class MenuItem extends Vue {
  public parsedDate!: string;

  @Prop()
  public item!: Menu;

  public created() {
    this.parseDate();
  }

  public parseDate(): void {
    const date = new Date(this.item.date);
    this.parsedDate =
      date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
  }
}
</script>

<style scoped></style>
