<template>
  <b-form @submit.stop.prevent="onSubmit" ref="form">
    <b-form-group id="input-group-1" label="Naam" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.name"
        required
        placeholder="Naam"
      />
    </b-form-group>

    <b-form-group id="input-group-2" label="Beschrijving" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.description"
        required
        placeholder="Beschrijving"
      />
    </b-form-group>
    <b-form-group id="input-group-3" label="Adres" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.location.address"
        required
        placeholder="Adres"
      />
    </b-form-group>
    <b-form-group id="input-group-4" label="Stad" label-for="input-4">
      <b-form-input
        id="input-4"
        v-model="form.location.city"
        required
        placeholder="Stad"
      />
    </b-form-group>
    <b-form-group id="input-group-5" label="Campus" label-for="input-5">
      <b-form-input
        id="input-5"
        v-model="form.location.campus"
        required
        placeholder="Campus"
      />
    </b-form-group>
    <b-form-group id="input-group-6" label="Postcode" label-for="input-6">
      <b-form-input
        id="input-6"
        v-model="form.location.zip_code"
        required
        placeholder="Postcode"
      />
    </b-form-group>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FormComponent } from '@/UtilTypes.ts';
import { Resto, RestoInfo } from '../APITypes';
import restoStore, { NewResto } from '@/store/modules/restos.ts';
import userStore from '@/store/modules/user.ts';
@Component
export default class EditRestoForm extends Vue implements FormComponent {
  @Prop()
  public resto?: RestoInfo;

  public $refs!: {
    form: HTMLFormElement;
  };

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

  public created() {
    if (!userStore.auth) {
      console.log('NOT LOGGED IN');
    }
    if (this.resto) {
      const { name, description, location } = this.resto;
      this.formData = {
        name,
        description,
        location,
      };
    }
  }

  get form() {
    return this.formData;
  }

  set form(data: NewResto) {
    this.formData = data;
  }

  public async submit() {
    if (!this.resto) {
      await restoStore.createResto({
        newResto: this.formData,
        token: userStore.auth!.token,
      });
    } else {
      await restoStore.updateCurrentResto({
        resto: {
          url: this.resto.url,
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
