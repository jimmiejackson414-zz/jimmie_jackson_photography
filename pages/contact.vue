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
          <v-content>
            <v-row>
              <v-col sm="6">
                <v-text-field
                  v-model="firstName"
                  color="primary"
                  label="First Name *"
                  outlined
                  required />
              </v-col>
              <v-col sm="6">
                <v-text-field
                  v-model="lastName"
                  color="primary"
                  label="Last Name *"
                  outlined
                  required />
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12">
                <v-text-field
                  v-model="email"
                  color="primary"
                  label="Email *"
                  type="email"
                  outlined
                  required />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12">
                <v-textarea
                  v-model="message"
                  color="primary"
                  name="input-7-4"
                  label="Message *"
                  outlined
                  required />
              </v-col>
              <v-col
                sm="12"
                class="text-center">
                <p class="d-none">
                  <label for="bot-field">Don't fill this out: </label>
                  <input
                    type="text"
                    name="bot-field">
                </p>
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
          </v-content>
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
  import PageTitle from '~/components/PageTitle';

  export default {
    data: () => ({
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      sendingForm: false,
      submitted: false,
      valid: false,
    }),

    methods: {
      async submit() {
        this.sendingForm = true;
        if (this.$refs.form.validate()) {
          this.$refs.form.submit();
          // await this.$axios.$post('/api/contact', {
          //   email: this.post,
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   message: this.message,
          // });
          this.submitted = true;
        }
        this.sendingForm = false;
      }
    },

    components: {
      PageTitle,
    }
  }
</script>

<style lang="scss" scoped>

</style>