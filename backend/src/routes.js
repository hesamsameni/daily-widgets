const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ContactController = require('./controllers/ContactController')
const ContactControllerPolicy = require('./policies/ContactControllerPolicy')

module.exports = (app) => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  ),
    app.post(
      '/add-contact',
      ContactControllerPolicy.addContact,
      ContactController.addContact
    ),
    app.get('/search-contacts', ContactController.searchContacts),
    app.get('/get-contacts', ContactController.getContacts),
    app.get('/get-contact/:id', ContactController.getContact),
    app.put('/edit-contact/:id', ContactController.editContact),
    app.delete('/delete-contact/:id', ContactController.deleteContact)
}
