<template>
  <div>
    <panel title="Contacts" route="/add-contact" buttonText="Add new">
      <div slot="contacts-list" class="contacts-list">
        <div class="contacts-wrapper" v-if="contacts.length > 0">
          <div
            class="each-contact"
            v-for="contact in contacts"
            :key="contact.id"
          >
            <div class="data-container">
              <span class="name">{{ contact.fullName }}</span>
              <span class="phone">{{ contact.phoneNumber }}</span>
            </div>
            <div class="actions-container">
              <a :href="'tel:' + contact.phoneNumber" class="wrapper">
                <b-icon icon="telephone" style="color: #1e88e5;"> </b-icon>
              </a>
              <a
                :href="'mailto:' + contact.email"
                target="_blank"
                class="wrapper"
              >
                <b-icon icon="envelope" style="color: #1e88e5;"></b-icon>
              </a>

              <div class="wrapper">
                <b-icon icon="pencil" style="color: #90a4ae;"></b-icon>
              </div>

              <div class="wrapper">
                <b-icon icon="trash" style="color: #e53935;"></b-icon>
              </div>
            </div>
          </div>
        </div>
        <div v-else>No Contact Found</div>
      </div>
    </panel>
  </div>
</template>

<script>
import ContactService from '@/services/ContactService'
import Panel from '@/components/Panel.vue'
export default {
  name: 'Contacts',
  components: { Panel },
  data() {
    return {
      contacts: [],
      hasError: false,
      isSuccess: false,
    }
  },
  mounted() {
    this.getContacts()
  },
  methods: {
    async getContacts() {
      try {
        const response = await ContactService.getContacts()
        this.hasError = false
        this.isSuccess = true
        this.contacts = response.data
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
