<template>
  <v-container class="pt-5">
    <page-title text="Contact" />
    <v-row
      align="center"
      justify="center">
      <v-col sm="8">
        <v-form
          v-if="!submitted"
          ref="form"
          v-model="valid"
          name="contactForm"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          method="POST"
          @submit.prevent="submit">
          <input
            type="hidden"
            name="form-name"
            value="contactForm">
          <v-row>
            <v-col
              cols="12"
              md="6">
              <v-text-field
                v-model="form.firstName"
                color="primary"
                label="First Name *"
                name="firstName"
                outlined
                :rules="nameRules"
                required />
            </v-col>
            <v-col
              cols="12"
              md="6">
              <v-text-field
                v-model="form.lastName"
                color="primary"
                label="Last Name *"
                name="lastName"
                outlined
                :rules="nameRules"
                required />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                color="primary"
                label="Email *"
                name="email"
                type="email"
                :rules="emailRules"
                outlined
                required />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12">
              <v-textarea
                v-model="form.message"
                color="primary"
                label="Message *"
                name="message"
                outlined
                :rules="nameRules"
                required />
            </v-col>
            <v-col
              sm="12"
              class="text-center">
              <v-btn
                :disabled="!valid || sendingForm"
                color="accent"
                depressed
                :ripple="false"
                x-large
                type="submit">
                {{ sendingForm ? 'Loading...' : 'Submit' }}
              </v-btn>
            </v-col>
          </v-row>
          <p class="d-none">
            <label for="bot-field">Don't fill this out: </label>
            <input
              type="text"
              name="bot-field">
          </p>
        </v-form>
        <v-row v-if="submitted">
          <v-col
            sm="12"
            class="text-center">
            <p class="display-3 font-weight-bold">
              Thanks!
            </p>
            <p class="body-1">
              I have received your message and will respond as soon as possible.
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import PageTitle from '~/components/PageTitle';

  export default {
    transition: 'page-fade',

    data: () => ({
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      form: {
        email: '',
        firstName: '',
        lastName: '',
        message: '',
      },
      nameRules: [
        v => !!v || 'Name is required.',
      ],
      sendingForm: false,
      submitted: false,
      valid: false,
    }),

    methods: {
      encode (data) {
        return Object.keys(data)
          .map(
            key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
          )
          .join("&");
      },
      submit () {
        this.sendingForm = true;

        const axiosConfig = {
          header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        axios
          .post(
            '/',
            this.encode({
              'form-name': 'contactForm',
              ...this.form
            }),
            axiosConfig
          )
          .then(() => this.submitted = true)
          .catch(err => console.log(err))
          .finally(() => this.sendingForm = false);
      }
    },

    components: {
      PageTitle,
    },

    head() {
      return {
        title: 'Contact'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>