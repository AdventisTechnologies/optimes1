const Express = require('express');
const Router = Express.Router();
const CamereController = require('../Controller/Camere');




Router.post('/CameraRegister',CamereController.CameraPost)
Router.get('/all',CamereController.CamereGet)
Router.put('/CamereUpdate/:id',CamereController.CamereUpdate)
Router.delete('/CamereDelete/:id',CamereController.CamereDelete)

module.exports = Router;