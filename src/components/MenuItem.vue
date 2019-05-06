<template>
  <div id="menu_item">
    <router-link :to="this.$route.path">
      Menu voor {{ parsedDate }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Menu } from '@/APITypes';
import { getURLPath } from '@/util';

@Component
export default class MenuItem extends Vue {
  private parsedDate!: string;

  @Prop()
  private item!: Menu;

  private created() {
    this.menuPath = getURLPath(this.item.url);
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
