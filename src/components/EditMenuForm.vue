<template>
    <b-form @submit.stop.prevent="onSubmit" ref="form">
        <b-form-group id="input-group-1" label="Naam" label-for="input-1">
        <b-form-input id="input-1" v-model="form.name" required placeholder="Naam"/>
        </b-form-group>

        <b-form-group id="input-group-2" label="Prijs" label-for="input-2" type="number">
        <b-form-input id="input-2" v-model="form.price" required placeholder="Prijs"/>
        </b-form-group>

        <b-form-group id="input-group-3" label="Diëet" label-for="input-3">
        <b-form-input id="input-3" v-model="form.diet" required placeholder="Diëet"/>
        </b-form-group>
        <b-form-group id="input-group-4" label="Type" label-for="input-4">
        <b-form-input id="input-4" v-model="form.type" required placeholder="Type"/>
        </b-form-group>
  </b-form>
</template>
