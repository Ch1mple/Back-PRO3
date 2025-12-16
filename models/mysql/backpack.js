import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'

// Modelo para manejar la lógica de datos con MySQL 
// Implementado pero sin uso para ahorrar recursos y tiempo
const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'backpack'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class BackpackModel {

  static async getSeachUserByUsername (search) {
    if (!search) return []
    const like = `%${search.toLowerCase()}%`
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE LOWER(username) LIKE ?;',
      [like]
    )
    return rows
  }

  static async getEventdByTitle (search) {
    if (!search) return []
    const like = `%${search.toLowerCase()}%`
    const [rows] = await connection.query(
      'SELECT * FROM events WHERE LOWER(title) LIKE ?;',
      [like]
    )
    return rows
  }

  static async getEvents () {
    const [rows] = await connection.query('SELECT * FROM events;')
    return rows
  }

  static async getEventsById ({ id }) {
    const [rows] = await connection.query(
      'SELECT * FROM events WHERE id = ?;',
      [id]
    )
    if (rows.length === 0) return null
    return rows[0]
  }

  static async postEvent ({ event }) {
    if (!event) throw new Error('Event is required')
    const id = event.id ?? randomUUID()
    const title = event.title ?? null
    const user_uid = event.user_uid ?? null
    const data = JSON.stringify(event)

    try {
      await connection.query(
        'INSERT INTO events (id, title, user_uid, data) VALUES (?, ?, ?, ?);',
        [id, title, user_uid, data]
      )
    } catch (e) {
      throw new Error('Error creating event')
    }

    const [rows] = await connection.query('SELECT * FROM events WHERE id = ?;', [id])
    return rows[0]
  }

  static async getAllUsers () {
    const [rows] = await connection.query('SELECT * FROM users;')
    return rows
  }

  static async getUserByUserUid ({ user_uid }) {
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE user_uid = ?;',
      [user_uid]
    )
    if (rows.length === 0) return null
    return rows[0]
  }
  
  static async getEventsByUserUid ({ user_uid }) {
    const [rows] = await connection.query(
      'SELECT * FROM events WHERE user_uid = ?;',
      [user_uid]
    )
    return rows
  }

  static async getUserLinksByUserUid ({ user_uid }) {
    const [rows] = await connection.query(
      'SELECT * FROM user_links WHERE user_uid = ?;',
      [user_uid]
    )
    return rows
  }

  static async getUserLinksById ({ id }) {
    const [rows] = await connection.query(
      'SELECT * FROM user_links WHERE id = ?;',
      [id]
    )
    if (rows.length === 0) return null
    return rows[0]
  }

  static async getUserEventsByUserUid ({ user_uid }) {
    const [rows] = await connection.query(
      'SELECT * FROM user_events WHERE user_uid = ?;',
      [user_uid]
    )
    return rows
  }

  static async getUserEventsById ({ id }) {
    const [rows] = await connection.query(
      'SELECT * FROM user_events WHERE event_id = ?;',
      [id]
    )
    return rows
  }

}
