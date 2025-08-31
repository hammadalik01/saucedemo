require('dotenv').config(); // Load env variables

module.exports = {
  baseURL: 'https://www.saucedemo.com/',
  productName: 'Sauce Labs Backpack',
  validUser: {
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_PASSWORD
  },
  lockedUser: {
    username: 'locked_out_user',
    password: process.env.SAUCE_PASSWORD
  },
  emptyPasswordUser: {
    username: process.env.SAUCE_USERNAME,
    password: ''
  },
  loginErrors: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    emptyPassword: 'Epic sadface: Password is required'
  },
  checkoutInfo: {
    firstName: "John",
    lastName: "Doe",
    postalCode: "12345"
  },
  tax: 2.40
};
