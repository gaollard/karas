let path = require('path');
let fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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9Qyg03lbYWUADaArjH3ClgF0QnPrKw2gAXR9qU/ZMYBO6W51tQE0gK4u9EkbBtBJ7a2tOIAG0LVlPm2/ADqtv5VVB9AAurLIJ24XQCc2uK7yABpA15X41N0C6NQOV1UfQAPoqgKfvFkAndzimhYA0AC6pryn7xVAp/e4ohUANICuKO49tAqgezC5niUANICuJ+19dAqg+3C5mjUANICuJuy9NAqge7G5lkUANICuJev99Amg+/G5klUANICuJOo9tQmgezK6jmUANICuI+l9dQmg+3K6inUANICuIui9NQmge7O6hoUANICuIef99Qig+/O6gpUANICuIOY9tgigezS7/KUANIAuP+V9dgig+3S7+LUANIAuPuS9Ngige7W79MUANIAuPeP99geg+/W78NUANIAuPOI9twegeza87OUANIAuO+F9dweg+3a86PUANIAuOuC9Nwege7e85AUBNIAuOd/99wag+/e84BUBNIAuON4ZWgPQGUwvd0kADaDLTXeOzgB0DteLXRNAA+hiw52lMQCdxfZSFwXQALrUbOfpC0Dn8b3QVQE0gC402pnaAtCZjC9zWQANoMtMdq6uAHQu54tcF0AD6CKDna0pAJ3N+hIXBtAAusRc5+sJQOfzvsCVATSALjDWGVsC0BnNL29pAA2gy0t1zo4AdE73i1sbQAPo4kKdtSEAndX+0hYH0AC6tEzn7QdA5/W/sNUBNIAuLNKZ2wHQmQdQ1vIAGkCXlejc3QDo3BMoan0ADaCLCnT2ZgB09hGUJABAA+iS8py/FwCdfwYFKQDQALqgOBtoBUAbGEI5EgA0gC4nzRY6AdAWplCMBgANoIsJs4lGALSJMZQiAkAD6FKybKMPAG1jDoWoANAAupAoG2kDQBsZRBkyADSALiPJVroA0FYmUYQOAA2giwiymSYAtJlRlCAEQAPoEnJspwcAbWcWBSgB0AC6gBgbagFAGxqGfykAGkD7T7GlDgC0pWm41wKgAbT7EJtqAECbGod3MQAaQHvPsC39ANrWPJyrAdAA2nmEjckH0MYG4lsOgAbQvhNsTT2AtjYR13oANIB2HWBz4gG0uZF4FgSgAbTn/NrTDqDtzcSxIgANoB3H16B0AG1wKH4lAWgA7Te9FpUDaItTcasJQANot+E1KRxAmxyLV1EAGkB7za5N3QDa5lycqgLQANppdI3K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')
      .end();
  }
};