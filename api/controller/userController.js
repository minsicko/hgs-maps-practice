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
    getUserByIndex(req, res) {
        try {
            const index = req.params.index;
            
            if (!userDB[index]) throw new Error('keyErr')

            const result = userDB[index]
            res.status(200).json({result})
        } catch (err) {
            if (err.message == 'keyErr') {
                const error = new Error('USER_NOT_FOUND')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            } else {
                const error = new Error('CANNOT_GET_USER')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            }
        }
    },

    addUser(req, res) {
        try{
            const {name, email} = req.body;

            if (!name || !email) throw new Error('keyErr')

            userDB.push({ "name" : name, "email" : email })
            res.status(201).json({userDB})
        } catch (err) {
            if (err.message == 'keyErr') {
                const error = new Error('KEY_ERROR')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            } else {
                const error = new Error('CANNOT_ADD_USER')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            }
        }
    },

    updateUser(req, res) {
        try {
            const {index, email} = req.body;

            if (!index || !email) throw new Error('keyErr')

            userDB[index].email = email;
            res.status(200).json({userDB})
        } catch (err) {
            if (err.message == 'keyErr') {
                const error = new Error('KEY_ERROR')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            } else {
                const error = new Error('CANNOT_UPDATE_USER')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            }
        }
    },

    deleteUser(req, res) {
        try {
            const index = req.params.index;

            if (!userDB[index]) throw new Error('keyErr')

            userDB.splice(index, 1);
            res.status(200).json({userDB})
        } catch (err) {
            if (err.message == 'keyErr') {
                const error = new Error('CANNOT_FIND_USER')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            } else {
                const error = new Error('CANNOT_DELETE_USER')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            }
        }
    },

//? SEQUELIZE
    async get_all_users(req, res) {
        const result = await userService.get_all_users()
        res.status(200).json({result})
    }
}