//import { validateBackpack, validatePartialBackpack } from '../schemas/backpacks.js'

// Controlador para manejar las rutas de nuestra bbdd

export class BackpackController {
  constructor ({ backpackModel }) {
    this.backpackModel = backpackModel
  }

  getSeachUserByUsername = async (req, res) => {
    const { username } = req.params;
    const searchResults = await this.backpackModel.getSeachUserByUsername(username);
    res.json(searchResults);
  }

  getSearchEventByTitle = async (req, res) => {
    const { title } = req.params;
    const searchResults = await this.backpackModel.getEventdByTitle(title);
    res.json(searchResults);
  }

  getEvents = async (req, res) => {
    const events = await this.backpackModel.getEvents()
    res.json(events)
  }

  postEvent = async (req, res) => {
  const event = req.body; 
  if (!event) {
    return res.status(400).json({ message: 'Event is required.' });
  }
  try {
    const newEvent = await this.backpackModel.postEvent({ event });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  getSolicitudes = async (req, res) => {
    try {
      const solicitudes = await this.backpackModel.getSolicitudes()
      res.json(solicitudes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  postSolicitud = async (req, res) => {
    const { nombre, titulo, descripcion } = req.body ?? {}
    if (![nombre, titulo, descripcion].every(value => typeof value === 'string' && value.trim())) {
      return res.status(400).json({
        message: 'nombre, titulo y descripcion son obligatorios y deben ser texto.'
      })
    }

    try {
      const solicitud = await this.backpackModel.postSolicitud({
        solicitud: { nombre: nombre.trim(), titulo: titulo.trim(), descripcion: descripcion.trim() }
      })
      res.status(201).json(solicitud)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  updateSolicitudEstado = async (req, res) => {
    const { id } = req.params
    const { estado } = req.body ?? {}
    const estadosPermitidos = ['pendiente', 'aceptada', 'cancelada']

    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({
        message: `estado debe ser uno de estos valores: ${estadosPermitidos.join(', ')}.`
      })
    }

    try {
      const solicitud = await this.backpackModel.updateSolicitudEstado({ id, estado })
      if (!solicitud) return res.status(404).json({ message: 'Solicitud not found' })
      res.json(solicitud)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  getAllUsers = async (req, res) => {
    const users = await this.backpackModel.getAllUsers()
    res.json(users)
  } 

  postUser = async (req, res) => {
    const { nombre } = req.body ?? {}
    if (typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({
        message: 'nombre es obligatorio y debe ser texto.'
      })
    }

    try {
      const user = await this.backpackModel.postUser({
        user: { username: nombre.trim() }
      })
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }



  getById = async (req, res) => {
    const { id } = req.params
    const backpack = await this.backpackModel.getById({ id })
    if (backpack) return res.json(backpack)
    res.status(404).json({ message: 'Backpack not found' })
  }



  getUserByUserUid = async (req, res) => {
    const { user_uid } = req.params
    const user = await this.backpackModel.getUserByUserUid({ user_uid })
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  getEventsByUserUid = async (req, res) => {
    const { user_uid } = req.params
    const event = await this.backpackModel.getEventsByUserUid({ user_uid })
    if (event) return res.json(event)
    res.status(404).json({ message: 'Events not found' })
  }

  getEventsById = async (req, res) => {
    const { id } = req.params
    const event = await this.backpackModel.getEventsById({ id })
    if (event) return res.json(event)
    res.status(404).json({ message: 'Event not found' })
  }

  getUserLinksByUserUid = async (req, res) => {
    const { user_uid } = req.params
    const user_link = await this.backpackModel.getUserLinksByUserUid({ user_uid })
    if (user_link) return res.json(user_link)
    res.status(404).json({ message: 'UserLinks not found' })
  }

  getUserLinksById = async (req, res) => {
    const { id } = req.params
    const user_link = await this.backpackModel.getUserLinksById({ id })
    if (user_link) return res.json(user_link)
    res.status(404).json({ message: 'UserLinks not found' })
  }

  getUserByUserUid = async (req, res) => {
    const { user_uid } = req.params
    const user = await this.backpackModel.getUserByUserUid({ user_uid })
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  getUserEventsByUserUid = async (req, res) => {
    const { user_uid } = req.params
    const user_event = await this.backpackModel.getUserEventsByUserUid({ user_uid })
    if (user_event) return res.json(user_event)
    res.status(404).json({ message: 'UserEvents not found' })
  }
  
  getUserEventsById = async (req, res) => {
    const { id } = req.params
    const user_event = await this.backpackModel.getUserEventsById({ id })
    if (user_event) return res.json(user_event)
    res.status(404).json({ message: 'UserEvents not found' })
  }


/*
  create = async (req, res) => {
    //const result = validateBackpack(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newBackpack = await this.backpackModel.create({ input: result.data })

    res.status(201).json(newBackpack)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.backpackModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Backpack not found' })
    }

    return res.json({ message: 'Backpack deleted' })
  }

  update = async (req, res) => {
    //const result = validatePartialBackpack(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedBackpack = await this.backpackModel.update({ id, input: result.data })

    return res.json(updatedBackpack)
  }
*/
}
