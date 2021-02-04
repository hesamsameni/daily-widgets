import Api from '@/services/Api'

export default {
  addContact(data) {
    return Api().post('add-contact', data)
  },
  getContacts() {
    return Api().get('get-contacts')
  },
  getContact(id) {
    return Api().get(`get-contact/${id}`)
  },
  editContact(data, id) {
    return Api().put(`edit-contact/${id}`, data)
  },
  deleteContact(id) {
    return Api().delete(`delete-contact/${id}`)
  },
  searchContact(query) {
    return Api().get('search-contacts', {
      params: {
        search: query,
      },
    })
  },
}
