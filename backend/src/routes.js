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
    app.get('/get-contacts', ContactController.getContacts)
}
