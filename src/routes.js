const express = require('express')
const routes = express.Router()
const userController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')

// users
routes.get('/users', userController.Index)
routes.post('/users', userController.Create)
routes.put('/users/:id', userController.Update)
routes.delete('/users/:id', userController.Delete)

// projects
routes.get('/projects', ProjectController.Index)
routes.post('/projects', ProjectController.Create)

module.exports = routes