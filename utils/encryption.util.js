const bcrypt = require('bcrypt')

module.exports = {
    encryptString: (string) => {
        // first arg is string to be encrypted, second arg is number of salting rounds to perform.
        // salting adds random string to end of the password so it is not possible to brute force crack the password by
        // checking the hashed password for entries in a dash dictionary (just a big list of obvious passwords and their hashed value)
        return bcrypt.hash(string, 10)
    }
}