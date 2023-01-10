import userService from '../service/userService'

let userDB = [
    {
        "name" : "Mary",
        "email" : "Mary@email.com",
    },
    {
        "name" : "John", 
        "email" : "John@email.com",
    }
]

export default {
    getUserByIndex(req, res){
        const index = req.params.index;
        const result = userDB[index]
        res.status(200).json({result})
    },

    addUser(req, res) {
        const {name, email} = req.body;
        userDB.push({ "name" : name, "email" : email })
        res.status(201).json({userDB})
    },

    updateUser(req, res) {
        const {index, email} = req.body;
        userDB[index].email = email;
        res.status(200).json({userDB})
    },

    deleteUser(req, res) {
        const index = req.params.index;
        userDB.splice(index, 1);
        res.status(200).json({userDB})
    }
}