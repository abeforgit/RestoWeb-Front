<template>
  <div id="menu_item">
    <b-link :href="item.url">Menu voor {{ parsedDate }}</b-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Menu } from '@/APITypes';

@Component
export default class MenuItem extends Vue {
  private parsedDate!: string;

  @Prop()
  private item!: Menu;

  private created() {
    this.parseDate();
  }

  private parseDate(): void {
    const date = new Date(this.item.date);
    this.parsedDate =
      date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
  }
}
</script>

<style scoped></style>
