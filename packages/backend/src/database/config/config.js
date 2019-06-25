require('dotenv').config();

const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: null,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: null,
    database: process.env.DATABASE_TEST_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: null,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false
  }
};

module.exports = config;
