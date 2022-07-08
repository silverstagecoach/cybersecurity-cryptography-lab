const bcryptjs = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const securedPass = bcrypt.compareSync(password, users[i].password)
          if (securedPass) {
            const scrubbedUser = {...users[i]}
            delete scrubbedUser.password
            res.status(200).send(scrubbedUser)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        
        const salt = bcryptjs.genSaltSync(4);
        const passHash = bcryptjs.hashSync(req.body.password, salt);
        
        const superSafeObj = req.body;
        superSafeObj.password = passHash;
        delete superSafeObj.passHash;

        users.push(req.body)
        res.status(200).send(superSafeObj)
    }
}