const { Router } = require('express');
const { User } = require('../model/user');

const userRouter = new Router();

userRouter.post('/register', (request, response) => {
    const { username, password } = request.body;
    if(!username || !password) {
      return  response.status(400).send({ success: false, error: 'Username and password are required!'})
    }

    return User.findOne({ username })
        .exec()
        .then((user) => {
            if (user) {
               return response.status(400).send({ success: false, error: 'Username is already exists!' })
            }

            const newUser = new User({ username: username, password: password, contacts: [
                    { name: 'Yan Kovalchuk', phone: 5555555, email: 'yan@mail.com', city: 'Tallinn'}
                ] });

            newUser.save((error, user) => {
                if(error) {
                    return response.status(400).send({ success: false, error: 'Something goes wrong!' });
                }

                response.status(200).json({
                    success: true,
                    user: user,
                    username: username
                })
            })
        })

});

userRouter.post('/login', (request, response) => {
    const { username, password } = request.body;
    if(!username || !password) {
       return response.status(400).send({ success: false, error: 'Username and password are required!' })
    }

    return User.findOne({ username })
        .exec()
        .then((user) => {
            if(!user) {
               return response.status(404).send({ success: false, error: 'User not found!' })
            }

            user.comparePassword(password, (error, match) => {
                if(!match) {
                    return response.status(400).send({ success: false, error: 'Wrong password!' });
                }

                return response.status(200).send({ success: true, user: user })
            })

        })
});

module.exports = userRouter;