const { Contact } = require('../models')

module.exports = {
  async addContact(req, res) {
    try {
      const contact = await Contact.create(req.body)
      res.send(contact.toJSON())
    } catch (error) {
      if (error.errors[0].message == 'email must be unique') {
        res.status(400).send({
          error: 'This email already exists in your contacts.',
        })
      } else
        res.status(400).send({
          error: error.errors[0].message,
        })
    }
  },
  async getContacts(req, res) {
    try {
      let contacts = null
      contacts = await Contact.findAll({
        limit: 10,
      })

      res.send(contacts)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the contacts',
      })
    }
  },
}
