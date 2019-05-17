<template>
  <div id="resto_location">
    <h2>Locatie</h2>
    <p v:if="location">
      {{ location.zip_code }} {{ location.city }} <br />
      {{ location.address }} <br />
      {{ location.campus }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component
export default class RestosInfo extends Vue {
  @Prop({ required: true })
  private location!: Location;
}
</script>

<style scoped></style>
