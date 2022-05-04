const knex = require('../database')

module.exports = {
    async Index(req, res) {
        const results = await knex('users').where('deleted_at', null)
        return res.json(results)
    },

    async Create(req, res, next) {
        try {
            const { username } = req.body
            await knex('users').insert({
                username: username
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async Update(req, res, next) {
        try {
            const { username } = req.body
            const { id } = req.params
            await knex('users').update({
                username: username
            }).where({ id })
            return res.send()

        } catch (error) {
            next(error)
        }
    },

    async Delete(req, res, next) {
        try {
            const { id } = req.params
            await knex('users').where({ id }).update('deleted_at', new Date())
            // del()
            return res.send()
            
        } catch (error) {
            next(error)
        }
    }
}

// knex.select('username').from('users').then(results => res.json(results))
