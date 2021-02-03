module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'dailywidget',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './database/dailywidget.sqlite',
    },
  },
}
