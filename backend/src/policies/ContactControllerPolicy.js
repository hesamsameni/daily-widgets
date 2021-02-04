const Joi = require('joi')

module.exports = {
  addContact(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      fullName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address',
          })
          break
        case 'fullName':
          res.status(400).send({
            error: 'name did not inserted successfully',
          })
          break
        case 'phoneNumber':
          res.status(400).send({
            error: 'You must provide a valid phone number',
          })
          break
        default:
          res.status(400).send({
            error: 'Server error. please try again later',
          })
      }
    } else {
      next()
    }
  },
}
