import { Router } from 'express'
import { BackpackController } from '../controllers/backpack.js'

export const createBackpackRouter = ({ backpackModel, userModel }) => {
  const backpackRouter = Router()

  const backpackController = new BackpackController({ backpackModel, userModel })

  backpackRouter.get('/users', backpackController.getAllUsers)
  backpackRouter.get('/users/:user_uid', backpackController.getUserByUserUid) // Nueva ruta para obtener usuario por user_uid
  backpackRouter.get('/events', backpackController.getEvents);
  backpackRouter.post('/event', backpackController.postEvent);
  backpackRouter.get('/users/search/:username', backpackController.getSeachUserByUsername);
  backpackRouter.get('/events/:user_uid', backpackController.getEventsByUserUid)
  backpackRouter.get('/events/id/:id', backpackController.getEventsById)
  backpackRouter.get('/events/search/:title', backpackController.getSearchEventByTitle)

  backpackRouter.get('/user_links/:user_uid', backpackController.getUserLinksByUserUid)
  backpackRouter.get('/user_links/id/:id', backpackController.getUserLinksById)
  backpackRouter.get('/user_events/:user_uid', backpackController.getUserEventsByUserUid)
  backpackRouter.get('/user_events/event_id/:id', backpackController.getUserEventsById)
  /*backpackRouter.post('/', backpackController.create)
  backpackRouter.get('/:id', backpackController.getById)
  backpackRouter.delete('/:id', backpackController.delete)
  backpackRouter.patch('/:id', backpackController.update)*/

  return backpackRouter
}
