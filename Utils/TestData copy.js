module.exports = {
  baseURL: 'https://www.saucedemo.com/',
  productName : 'Sauce Labs Backpack',
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  emptyPasswordUser: {
    username: 'standard_user',
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
