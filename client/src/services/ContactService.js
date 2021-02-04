import Api from '@/services/Api'

export default {
  addContact(data) {
    return Api().post('add-contact', data)
  },
  getContacts() {
    return Api().get('get-contacts')
  },
}
