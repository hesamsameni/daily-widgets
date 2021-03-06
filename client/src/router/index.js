import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from '../views/Contacts.vue'
// import Register from '../views/Register.vue'
import AddContact from '../views/AddContact.vue'
import EditContact from '../views/EditContact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: Contacts,
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: Register,
  // },
  {
    path: '/add-contact',
    name: 'AddContact',
    component: AddContact,
  },
  {
    path: '/edit-contact/:id',
    name: 'EditContact',
    component: EditContact,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
