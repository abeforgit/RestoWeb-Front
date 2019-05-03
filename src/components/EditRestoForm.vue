<template>
  <div>
    <b-form>
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.email" type="email" required />
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Description: "
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.description"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { NewResto } from '@/store/modules/restos.ts';

@Component
export default class EditRestoForm extends Vue {
  private form: NewResto = {
    name: '',
    description: '',
    location: {
      zip_code: '',
      city: '',
      address: '',
      campus: '',
    },
  };
}
</script>

<style scoped></style>
