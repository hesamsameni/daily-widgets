<template>
  <div>
    <panel title="Contacts" :hasSearch="true">
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

              <router-link :to="'/edit-contact/' + contact.id" class="wrapper">
                <b-icon icon="pencil" style="color: #90a4ae;"></b-icon>
              </router-link>

              <div class="wrapper" @click="setUserID(contact.id)">
                <b-icon icon="trash" style="color: #e53935;"></b-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="no-contacts" v-else>
          No contacts found.
        </div>
        <div class="text-right">
          <md-button :to="'/add-contact'" class="md-fab md-mini md-primary">
            <md-icon
              ><b-icon icon="plus" style="color: #ffffff;"></b-icon
            ></md-icon>
          </md-button>
        </div>
      </div>
      <div slot="search-contacts" >
        <md-field md-inline>
          <label>Search</label>
          <md-input
            v-model="searchQuery"
            type="text"
            @keyup="searchContacts($event)"
          ></md-input>
        </md-field>
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
      searchQuery: '',
    }
  },
  mounted() {
    this.getContacts()
  },
  methods: {
    getContacts() {
      ContactService.getContacts()
        .then((response) => {
          this.hasError = false
          this.isSuccess = true
          this.contacts = response.data
        })
        .catch((e) => {
          this.isSuccess = false
          this.error = e.response.data.error
          this.hasError = true
        })
    },
    deleteContact(id) {
      ContactService.deleteContact(id)
        .then((response) => {
          this.hasError = false
          this.isSuccess = true
          console.log(response)
          this.getContacts()
        })
        .catch((e) => {
          this.isSuccess = false
          this.error = e.response.data.error
          this.hasError = true
        })
    },
    setUserID(id) {
      this.showDeleteModal()
      this.selectedContact = id
    },
    showDeleteModal() {
      this.$bvModal
        .msgBoxConfirm('Are you sure you want to delete this contact?', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'primary',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value == true) {
            this.deleteContact(this.selectedContact)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    searchContacts(e) {
      if (e.target.value.length > 3) {
        ContactService.searchContact(this.searchQuery)
          .then((response) => {
            this.hasError = false
            this.isSuccess = true
            this.contacts = response.data
          })
          .catch((e) => {
            this.isSuccess = false
            this.error = e.response.data.error
            this.hasError = true
          })
      } else {
        this.getContacts()
      }
    },
  },
}
</script>

<style scoped></style>
