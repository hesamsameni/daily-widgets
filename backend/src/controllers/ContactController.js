const { Contact } = require('../models')
const Sequelize = require('sequelize')

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
        error: 'Could not fetch contacts from database',
      })
    }
  },
  async getContact(req, res) {
    try {
      let cc = null
      cc = await Contact.findOne({ where: { id: req.params.id } })
      res.send(cc)
    } catch (err) {
      res.status(500).send({
        error: 'Could not fetch the contact from database',
      })
    }
  },

  async editContact(req, res) {
    try {
      await Contact.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      res.status(200).send({
        message: 'Contact updated.',
      })
    } catch (err) {
      res.status(500).send({
        error: 'Could not update the contact',
      })
    }
  },

  async deleteContact(req, res) {
    try {
      await Contact.destroy({
        where: {
          id: req.params.id,
        },
      })
      res.status(200).send({
        message: 'Contact deleted.',
      })
    } catch (err) {
      res.status(500).send({
        error: 'Could not update the contact',
      })
    }
  },

  async searchContacts(req, res) {
    try {
      let searchResult = null
      const search = req.query.search
      const Op = Sequelize.Op
      searchResult = await Contact.findAll({
        where: {
          fullName: { [Op.like]: '%' + search + '%' }
        },
      })

      res.send(searchResult)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Could not do a search query.',
      })
    }
  },
}
