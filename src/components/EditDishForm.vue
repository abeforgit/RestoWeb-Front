<template>
  <b-form @submit.stop.prevent="onSubmit" ref="form">
    <b-form-group id="input-group-1" label="Name:" label-for="input-1">
      <b-form-input id="input-1" v-model="form.name" required />
    </b-form-group>
    <b-form-group
      id="input-group-2"
      label="Price:"
      label-for="input-2"
      type="number"
    >
      <b-form-input id="input-2" v-model="form.price" required />
    </b-form-group>
    <b-form-group id="input-group-3" label="Diet:" label-for="input-3">
      <b-form-input id="input-3" v-model="form.diet" required />
    </b-form-group>
    <b-form-group id="input-group-4" label="Type:" label-for="input-4">
      <b-form-input id="input-4" v-model="form.type" required />
    </b-form-group>
  </b-form>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FormComponent } from '@/UtilTypes.ts';
import dishStore, { NewDish } from '@/store/modules/dishes.ts';
import userStore from '@/store/modules/user';
import { Dish, DishDetail } from '@/APITypes';

@Component
export default class EditDishForm extends Vue implements FormComponent {
  @Prop()
  public dish?: Dish;

  public $refs!: {
    form: HTMLFormElement;
  };
  private formData: NewDish = {
    name: '',
    price: 0,
    diet: '',
    type: '',
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
    if (!this.dish) {
      await dishStore.createDish({
        newDish: this.formData,
        token: userStore.auth!.token,
      });
    } else {
      await dishStore.updateDish({
        dish: {
          url: this.dish.url,
          ...this.formData,
        },
        token: userStore.auth!.token,
      });
    }
  }
  public checkValidity() {
    return this.$refs.form.checkValidity();
  }
}
</script>
<style scoped></style>
