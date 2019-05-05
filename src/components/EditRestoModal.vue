<template>
  <b-modal centered @ok="handleOk" @show="resetModal" ref="modal" :id="id">
    <b-form ref="form" @submit.stop.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.name" required />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import EditRestoForm from '@/components/EditRestoForm.vue';
import { Prop } from 'vue-property-decorator';
import { Modal } from 'bootstrap-vue';
import restoState, { NewResto } from '@/store/modules/restos';

@Component({
  components: { EditRestoForm },
})
export default class EditRestoModal extends Vue {
  public formData!: NewResto;
  public $refs!: {
    form: HTMLFormElement;
    modal: Modal;
  };

  @Prop()
  private id!: string;

  public create() {
    this.formData = this.initForm();
  }

  get form() {
    return this.formData;
  }
  set form(data: NewResto) {
    this.formData = data;
  }

  public resetModal() {
    this.formData = this.initForm();
  }
  public async onSubmit() {
    await restoState.createResto(this.formData);
  }
  public async handleOk(evt: Event) {
    evt.preventDefault();
    if (!this.$refs.form.checkValidity()) {
      return;
    }
    await this.onSubmit();
    this.$refs.modal.hide();
  }
  private initForm(): NewResto {
    return {
      name: '',
      description: '',
      location: {
        city: '',
        zip_code: '',
        campus: '',
        address: '',
      },
    };
  }
}
</script>

<style scoped></style>
