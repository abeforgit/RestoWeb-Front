<template>
  <b-modal centered @ok="handleOk" ref="modal" :id="id">
    <slot/>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Modal } from 'bootstrap-vue';
export interface FormComponent {
  submit: () => void;
  checkValidity: () => boolean;
}
@Component
export default class FormModal extends Vue {
  public $refs!: {
    modal: Modal;
  };
  @Prop()
  private id!: string;

  public handleOk(evt: Event) {
    // TODO: fix possibly the most disgusting code I have ever written
    evt.preventDefault();
    if (!this.$slots.default) {
      return;
    }
    const formElement = (this.$slots.default[0]
      .componentInstance as any) as FormComponent;
    if (!formElement.checkValidity()) {
      return;
    }
    formElement.submit();
    this.$refs.modal.hide();
  }
}
</script>

<style scoped></style>
