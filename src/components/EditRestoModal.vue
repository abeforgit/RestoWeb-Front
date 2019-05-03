<template>
    <b-form>

    </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class EditRestoModal extends Vue {
  @Prop({ default: false })
  public isActive!: boolean;
  get active() {
    return this.$props.isActive;
  }
}
</script>

<style scoped></style>
