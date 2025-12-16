import mysql from 'mysql2/promise'

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
  static async getAll () {
    console.log('getAll')

    const [cards] = await connection.query(
      'SELECT * FROM cards;'
    )

    return cards
  }

  static async getById ({ id }) {
    const [cards] = await connection.query(
      `SELECT * FROM cards WHERE id = ?;`,
      [id]
    )

    if (cards.length === 0) return null

    return cards[0]
  }

  static async create ({ input }) {
    const {
      name,
      type,
      rarity,
      expansion,
      year,
      status,
      image_url
    } = input

    try {
      await connection.query(
        `INSERT INTO cards (name, type, rarity, expansion, year, status, image_url)
          VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [name, type, rarity, expansion, year, status, image_url]
      )
    } catch (e) {
      throw new Error('Error creating card')
    }

    const [cards] = await connection.query(
      `SELECT * FROM cards WHERE name = ? AND type = ? AND rarity = ? AND expansion = ? AND year = ? AND status = ? AND image_url = ?;`,
      [name, type, rarity, expansion, year, status, image_url]
    )

    return cards[0]
  }

  static async delete ({ id }) {
    const [result] = await connection.query(
      'DELETE FROM cards WHERE id = ?;',
      [id]
    )
    return result.affectedRows > 0
  }

  static async update ({ id, input }) {
    const fields = Object.keys(input).map(key => `${key} = ?`).join(', ')
    const values = Object.values(input)
    values.push(id)

    const [result] = await connection.query(
      `UPDATE cards SET ${fields} WHERE id = ?;`,
      values
    )
    if (result.affectedRows === 0) return false

    const [cards] = await connection.query(
      `SELECT * FROM cards WHERE id = ?;`,
      [id]
    )
    return cards[0]
  }

  static async getAllTrades () {
    const [trades] = await connection.query('SELECT * FROM trades;')
    return trades
  }

  static async getSentTradesByUserId ({ userId }) {
    const [trades] = await connection.query(
      'SELECT * FROM trades WHERE sender_id = ?;',
      [userId]
    )
    return trades
  }

  static async getReceivedTradesByUserId ({ userId }) {
    const [trades] = await connection.query(
      'SELECT * FROM trades WHERE receiver_id = ?;',
      [userId]
    )
    return trades
  }

  static async getAllUsers () {
    const [users] = await connection.query('SELECT * FROM users;')
    return users
  }

  static async getUserByUserUid ({ user_uid }) {
    const [users] = await connection.query(
      'SELECT * FROM users WHERE user_uid = ?;',
      [user_uid]
    )

    if (users.length === 0) return null

    return users[0]
  }
}
