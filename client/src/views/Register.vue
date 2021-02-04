<template>
  <div>
    <panel title="Register">
      <div slot="register-form">
        <form>
          <md-field>
            <label>Email</label>
            <md-input v-model="email" type="email"></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-field>
            <label>Repeat Password</label>
            <md-input v-model="repeat_password" type="password"></md-input>
          </md-field>
          <b-alert show variant="danger" v-if="hasError"
            ><div v-html="error"></div
          ></b-alert>
          <b-alert show variant="success" v-if="isSuccess"
            >Registered successfully.</b-alert
          >
          <md-button class="md-raised md-primary" @click="register"
            >Register</md-button
          >
        </form>
      </div>
    </panel>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel.vue'
export default {
  name: 'Register',
  components: { Panel },
  data() {
    return {
      email: '',
      password: '',
      repeat_password: '',
      error: '',
      hasError: false,
      isSuccess: false,
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
          this.$router.push({ name: 'Contacts' })
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
