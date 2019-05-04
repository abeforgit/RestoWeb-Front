<template>
  <b-form :id="formId">
    <b-form-group id="input-group-1" label="Name:" label-for="input-1">
      <b-form-input id="input-1" v-model="form.name" required />
    </b-form-group>

    <b-form-group id="input-group-2" label="Description" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.description"
        required
        placeholder="Enter name"
      ></b-form-input>
    </b-form-group>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { NewResto } from '@/store/modules/restos.ts';
import { Prop } from 'vue-property-decorator';

@Component
export default class EditRestoForm extends Vue {
  @Prop()
  private formId!: string;
  private formData: NewResto = {
    name: '',
    description: '',
    location: {
      zip_code: '',
      city: '',
      address: '',
      campus: '',
    },
  };
  get form() {
    return this.formData;
  }
  set form(data: NewResto) {
    this.formData = data;
  }
  public onSubmit() {
    alert(JSON.stringify(this.formData));
  }
}
</script>

<style scoped></style>
