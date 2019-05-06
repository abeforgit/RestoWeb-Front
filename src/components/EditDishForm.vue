<template>
  <b-form @submit.stop.prevent="onSubmit" ref="form">
    <b-form-group id="input-group-1" label="Name:" label-for="input-1">
      <b-form-input id="input-1" v-model="form.name" required />
    </b-form-group>
  </b-form>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FormComponent } from '@/UtilTypes.ts';
import { NewResto } from '../store/modules/restos';
import dishStore, { NewDish } from '@/store/modules/dishes.ts';

@Component
export default class EditDishForm extends Vue implements FormComponent {
  @Prop()
  public dish?: NewDish;

  public $refs!: {
    form: HTMLFormElement;
  };
  private formData: NewDish = {
    name: '',
  };

  public created() {
    if (this.dish) {
      Object.assign(this.formData, this.dish);
    }
  }
  get form() {
    return this.formData;
  }
  set form(data: NewDish) {
    this.formData = data;
  }
  public async submit() {
    await dishStore.createDish(this.formData);
  }
  public checkValidity() {
    return this.$refs.form.checkValidity();
  }
}
</script>
<style scoped></style>
