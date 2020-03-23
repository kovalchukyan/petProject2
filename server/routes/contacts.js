const { Router } = require('express');
const { User } = require('../model/user');

const contactsRouter = new Router();

contactsRouter.get('/contacts', (request, response) => {
    const { username } = request.body;

     User.findOne({ username })
        .exec()
        .then((user) => {
            if(!user) {
              return response.status(404).send({ success: false, error: 'User not found' })
            }

            return response.status(200).send({ success: true, contacts: user.contacts })
        })

});

contactsRouter.post('/create', (request, response) => {
    const { username, data } = request.body;

    User.updateOne(
        { username },
        { $push: { 'contacts': data } },
        ((error) => {
            if(error) {
                return response.status(400).send({ success: false, error: 'Contact not added!' })
            }

        })
    );

    User.findOne({ username })
        .exec()
        .then((user) => {
            if(!user) {
                return response.status(404).send({ success: false, error: 'User not found' })
            }

            return response.status(200).send({ success: true, contacts: user.contacts })
        })

});

contactsRouter.delete('/delete', (request, response) => {
    const { username, id  } = request.body;

    User.updateOne(
        { username },
        { $pull: { 'contacts': { _id: id} } },
        ((error, user) => {
            if(error) {
                return response.status(400).send({ success: false, error: 'Contact not deleted!' })
            }

            return response.status(200).send({ success: true, contact: id })
        })
    );

});

module.exports = contactsRouter;