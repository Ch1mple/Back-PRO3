import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const users = readJSON('./users.json')
const events = readJSON('./events.json')
const user_links = readJSON('./user_links.json')
const users_events = readJSON('./user_events.json')
const solicitudes = readJSON('./solicitudes.json')

export class BackpackModel {

  static async getSeachUserByUsername(search) {
  console.log('Searching user:', search);
    if (!search) return [];
    
    const lowerSearch = search.toLowerCase();
    return users.filter(users =>
      users.username.toLowerCase().includes(lowerSearch)
    );
  }

  static async getEventdByTitle(search) {
  console.log('Searching event:', search);
    if (!search) return [];
    
    const lowerSearch = search.toLowerCase();
    return events.filter(events =>
      events.title.toLowerCase().includes(lowerSearch)
    );
  }

  static async getEvents () {
    return events
  }

  static async getSolicitudes () {
    return solicitudes
  }

  static async postSolicitud ({ solicitud }) {
    if (!solicitud) throw new Error('Solicitud is required')

    const numericIds = solicitudes
      .map(({ id }) => Number(id))
      .filter(Number.isInteger)
    const newSolicitud = {
      id: numericIds.length ? Math.max(...numericIds) + 1 : 1,
      ...solicitud,
      fecha_solicitud: new Date().toISOString(),
      estado: 'pendiente'
    }

    solicitudes.push(newSolicitud)
    const solicitudesPath = path.join(__dirname, '../../solicitudes.json')
    fs.writeFileSync(solicitudesPath, JSON.stringify(solicitudes, null, 2), 'utf-8')

    return newSolicitud
  }

  static async updateSolicitudEstado ({ id, estado }) {
    const solicitud = solicitudes.find(solicitud => String(solicitud.id) === id)
    if (!solicitud) return null

    solicitud.estado = estado
    const solicitudesPath = path.join(__dirname, '../../solicitudes.json')
    fs.writeFileSync(solicitudesPath, JSON.stringify(solicitudes, null, 2), 'utf-8')

    return solicitud
  }

  static async getEventsById ({ id }) {
    const event = events.find(event => event.id === id)
    return event || null
  }

  static async postEvent ({ event }) {
    if (!event) {
      throw new Error('Event is required');
    }
    const eventWithId = {
      id: randomUUID(),
      ...event
    }

    events.push(eventWithId);

    const eventsPath = path.join(__dirname, '../../events.json');
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), 'utf-8');

    return eventWithId;
  }

  static async getAllUsers () {
    return users
  }

  static async postUser ({ user }) {
    if (!user) throw new Error('User is required')

    const numericIds = users
      .map(({ user_id }) => Number(user_id))
      .filter(Number.isInteger)
    const newUser = {
      user_id: numericIds.length ? Math.max(...numericIds) + 1 : 1,
      user_uid: randomUUID(),
      ...user,
      type: 'normal',
      created_at: new Date().toISOString()
    }

    users.push(newUser)
    const usersPath = path.join(__dirname, '../../users.json')
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8')

    return newUser
  }

  static async getUserByUserUid ({ user_uid }) {
    const user = users.find(user => user.user_uid === user_uid)
    return user || null
  }

  static async getEventsByUserUid ({ user_uid }) {
    const event = events.filter(event => event.user_uid === user_uid)
    return event || null
  }

    static async getUserByUserUid ({ user_uid }) {
    const user = users.find(user => user.user_uid === user_uid)
    return user || null
  }

  static async getUserLinksByUserUid ({ user_uid }) {
    const user_link = user_links.filter(user_link => user_link.user_uid === user_uid)
    return user_link || null
  }

  static async getUserLinksById ({ id }) {
    const user_link = user_links.find(user_link => user_link.id === id)
    return user_link || null
  }

  static async getUserEventsByUserUid ({ user_uid }) {
    const user_event = users_events.filter(user_event => user_event.user_uid === user_uid)
    return user_event || null
  }
  
  static async getUserEventsById ({ id }) {
    const user_event = users_events.filter(user_event => user_event.event_id === id)
    return user_event || null
  }



}
