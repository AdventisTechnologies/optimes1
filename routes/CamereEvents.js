const Express = require('express');
const Router = Express.Router();
const CamereEventsController = require('../Controllers/CamereEvent');
Router.post('/CameraEventRegister',CamereEventsController.CamereEventsPost)
Router.get('/CameraEventData',CamereEventsController.CamereEventsget)
Router.put('/CamereEventUpdate/:id',CamereEventsController.CamereEventsUpdate)
Router.delete('/CamereEventDelete/:id',CamereEventsController.CamereEventsDelete)

module.exports = Router;