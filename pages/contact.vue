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
          v-model="valid">
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
                <v-btn
                  :disabled="!valid"
                  color="accent"
                  depressed
                  :ripple="false"
                  x-large
                  @click="submit">
                  Submit
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
      submitted: false,
      valid: false,
    }),

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.$axios.$post('', {
            email: this.post,
            firstName: this.firstName,
            lastName: this.lastName,
            message: this.message,
          });

          this.submitted = true;
        }
      }
    },

    components: {
      PageTitle,
    }
  }
</script>

<style lang="scss" scoped>

</style>