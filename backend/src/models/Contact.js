module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return Contact
}
