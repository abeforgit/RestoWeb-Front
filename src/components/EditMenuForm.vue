<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit" ref="form">
      <b-form-group id="input-group-1" label="Datum" label-for="input-1">
        <b-form-input
          id="input-1"
          required
          v-model="form.date"
          placeholder="Datum"
          type="date"
        />
      </b-form-group>
      <b-form-select
        v-model="form.dishes"
        :options="options"
        multiple
        :select-size="15"
      />
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';
import { MenuDetail } from '@/APITypes';
import dishStore from '@/store/modules/dishes';
import { Dish } from '@/APITypes';
import { FormComponent } from '@/UtilTypes';
import menuStore, { NewMenu } from '@/store/modules/menus';
import userStore from '@/store/modules/user';
import { parseDate, parseToBootstrapDate } from '../util';

@Component
export default class EditMenuForm extends Vue implements FormComponent {
  get dishes() {
    return dishStore.dishes;
  }

  get dishList() {
    return dishStore.dishList;
  }

  get form() {
    return this.formData;
  }

  set form(data: NewMenu) {
    this.formData = data;
  }

  @Prop()
  public menu?: MenuDetail;

  public $refs!: {
    form: HTMLFormElement;
  };
  private formData: NewMenu = {
    date: '',
    dishes: [],
  };

  private options: Array<{ value: { url: string }; text: string }> = [];

  public async created() {
    await dishStore.fetchDishes();
    if (this.menu) {
      this.formData.date = parseToBootstrapDate(this.menu.date);
      await dishStore.fetchDishList({
        dishList: this.menu.dishes,
      });
    }
  }

  @Watch('dishes') public onDishesChanged(newValue: Dish[], oldValue: Dish[]) {
    this.options = [];
    for (const dish of newValue) {
      this.options.push({
        value: { url: dish.url },
        text: dish.name,
      });
    }
  }

  @Watch('dishList') public onDishListChanged(
    newValue: Dish[],
    oldValue: Dish[]
  ) {
    this.formData.dishes = [];
    for (const dish of newValue) {
      this.formData.dishes.push({ url: dish.url });
    }
  }

  public checkValidity() {
    return this.$refs.form.checkValidity();
  }

  public async submit() {
    const date: Date = new Date(this.formData.date);
    if (!this.menu) {
      await menuStore.createRestoMenu({
        restoMenusPath: this.$route.path,
        newMenu: {
          date: date.toUTCString(),
          dishes: this.formData.dishes,
        },
        token: userStore.auth!.token,
      });
    } else {
      await menuStore.updateCurrentMenu({
        url: this.menu.url,
        menu: {
          date: date.toUTCString(),
          dishes: this.formData.dishes,
        },
        token: userStore.auth!.token,
      });
    }
  }
}
</script>
