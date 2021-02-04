<template>
  <div>
    <panel title="Add Contact">
      <div slot="add-contact-form">
        <form>
          <md-field>
            <label>Name</label>
            <md-input v-model="fullName" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Phone Number</label>
            <md-input v-model="phoneNumber" type="phone"></md-input>
          </md-field>
          <md-field>
            <label>Email</label>
            <md-input v-model="email" type="email"></md-input>
          </md-field>
          <md-datepicker v-model="dateOfBirth" class="mb--30">
            <label>Birthday</label>
          </md-datepicker>
          <b-alert show variant="danger" v-if="hasError"
            ><div v-html="error"></div
          ></b-alert>
          <b-alert show variant="success" v-if="isSuccess"
            >Registered successfully.</b-alert
          >
          <md-button
            class="md-raised md-primary width-100 margin--0"
            @click="addContact"
            >Add</md-button
          >
        </form>
      </div>
    </panel>
  </div>
</template>

<script>
import ContactService from '@/services/ContactService'
import Panel from '@/components/Panel.vue'
export default {
  name: 'AddContact',
  components: { Panel },
  data() {
    return {
      fullName: '',
      phoneNumber: '',
      email: '',
      dateOfBirth: '',
      error: '',
      hasError: false,
      isSuccess: false,
    }
  },
  methods: {
    async addContact() {
      try {
        const response = await ContactService.addContact({
          fullName: this.fullName,
          phoneNumber: this.phoneNumber,
          email: this.email,
          dateOfBirth: this.dateOfBirth,
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
    },
  },
}
</script>

<style scoped></style>
