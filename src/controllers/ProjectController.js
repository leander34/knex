const knex = require('../database')

module.exports = {
    async Index(req, res, next) {
        try {
            const { user_id, page = 1 } = req.query
            const query = knex('projects').limit(5).offset((page - 1) * 5)
            
            const countObj = knex('projects').count()

            if(user_id) {
                query
                .select("projects.*", "users.username")
                .join('users', 'users.id', '=', 'projects.user_id')
                .where({ user_id })
                .where('deleted_at', null)

                countObj.where({ user_id })
            }

            const [count] = await countObj
            res.header('X-Total-Count', count['count'])

            const results = await query
            return res.json(results)
        } catch (error) {
            next(error)
        }
    },
    async Create(req, res, next) {
        try {
            const { title, user_id } = req.body
            await knex('projects').insert({
                title,
                user_id
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    }
}