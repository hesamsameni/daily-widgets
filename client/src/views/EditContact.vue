<template>
  <div>
    <panel title="Edit Contact">
      <div slot="edit-contact-form">
        <form>
          <md-field>
            <label>Name</label>
            <md-input v-model="contact.fullName" type="text"></md-input>
          </md-field>
          <md-field>
            <label>Phone Number</label>
            <md-input v-model="contact.phoneNumber" type="phone"></md-input>
          </md-field>
          <md-field>
            <label>Email</label>
            <md-input v-model="contact.email" type="email"></md-input>
          </md-field>
          <b-alert show variant="danger" v-if="hasError"
            ><div v-html="error"></div
          ></b-alert>
          <b-alert show variant="success" v-if="isSuccess"
            >Edited successfully.</b-alert
          >
          <md-button
            class="md-raised md-primary width-100 margin--0"
            @click="editContact"
            >Edit</md-button
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
  name: 'EditContact',
  components: { Panel },
  data() {
    return {
      fullName: '',
      phoneNumber: '',
      email: '',
      error: '',
      hasError: false,
      isSuccess: false,
      contact: [],
    }
  },
  mounted() {
    this.getContact(this.$route.params.id)
  },
  methods: {
    async getContact(id) {
      try {
        const response = await ContactService.getContact(id)
        this.contact = response.data
      } catch (err) {
        this.isSuccess = false
        this.error = err.response.data.error
        this.hasError = true
      }
    },
    async editContact() {
      try {
        const response = await ContactService.editContact(
          {
            fullName: this.contact.fullName,
            phoneNumber: this.contact.phoneNumber,
            email: this.contact.email,
          },
          this.$route.params.id
        )
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
