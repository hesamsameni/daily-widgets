<template>
  <div>
    <section id="register">
      <h1 class="title">Register</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-container">
              <form>
                <input
                  type="email"
                  placeholder="email"
                  v-model="email"
                  class="form-control input"
                  autocomplete
                />
                <input
                  type="password"
                  placeholder="password"
                  v-model="password"
                  class="form-control input"
                  autocomplete
                />
                <input
                  type="password"
                  placeholder="repeat password"
                  v-model="repeat_password"
                  class="form-control input"
                  autocomplete
                />
              </form>
              <b-alert show variant="danger" v-if="hasError"
                ><div v-html="error"></div
              ></b-alert>
              <b-alert show variant="success" v-if="isSuccess"
                >Registered successfully.</b-alert
              >
              <button class="btn btn-primary" @click="register">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      repeat_password: '',
      error: '',
      hasError: false,
      isSuccess: false,
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }
  },
  methods: {
    async register() {
      if (this.repeat_password != this.password) {
        this.error = 'Password fields are not the same.'
        this.hasError = true
      } else {
        try {
          const response = await AuthenticationService.register({
            email: this.email,
            password: this.password,
          })
          this.hasError = false
          this.isSuccess = true
          console.log(response)
        } catch (err) {
          this.isSuccess = false
          this.error = err.response.data.error
          this.hasError = true
        }
      }
    },
  },
}
</script>

<style scoped></style>
