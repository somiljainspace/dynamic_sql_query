const express = require('express');
const router = express.Router();
const db = require('../db'); 

const allowedTables = ['users', 'orders', 'products']; 
const allowedColumns = {
  users: ['id', 'name', 'email'],
  orders: ['id', 'user_id', 'total'],
  products: ['product_id', 'name', 'price'],
};
const allowedOperators = ['=', '!=', '>', '<', '>=', '<='];

router.post('/query', async (req, res) => {
  try {
    const { table_name, columns, where, order_by, limit, offset } = req.body;

    // Validate table
    if (!allowedTables.includes(table_name)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    // Validate columns
    if (
      !columns || 
      !(columns.length === 1 && columns[0] === '*') && // Allow wildcard selection
      !columns.every(col => allowedColumns[table_name].includes(col))
    ) {
      return res.status(400).json({ error: 'Invalid column selection' });
    }

    let sql = `SELECT ${columns[0] === '*' ? '*' : columns.join(', ')} FROM ${table_name}`;
    const params = [];

    // Validate WHERE clause
    if (where) {
      if (!allowedColumns[table_name].includes(where.column)) {
        return res.status(400).json({ error: 'Invalid WHERE column' });
      }
      if (!allowedOperators.includes(where.operator)) {
        return res.status(400).json({ error: 'Invalid WHERE operator' });
      }
      sql += ` WHERE ${where.column} ${where.operator} ?`;
      params.push(where.value);
    }

    // Validate ORDER BY clause
    if (order_by) {
      if (!allowedColumns[table_name].includes(order_by.column)) {
        return res.status(400).json({ error: 'Invalid ORDER BY column' });
      }
      const direction = order_by.direction.toUpperCase();
      if (!['ASC', 'DESC'].includes(direction)) {
        return res.status(400).json({ error: 'Invalid sort direction' });
      }
      sql += ` ORDER BY ${order_by.column} ${direction}`;
    }

    // Add pagination support (limit & offset)
    if (limit) {
      if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({ error: 'Invalid limit' });
      }
      sql += ` LIMIT ${parseInt(limit, 10)}`;
    }
    if (offset) {
      if (isNaN(offset) || offset < 0) {
        return res.status(400).json({ error: 'Invalid offset' });
      }
      sql += ` OFFSET ${parseInt(offset, 10)}`;
    }

    const results = await db.query(sql, params);

    res.json({
      status: 'success',
      message: 'Query executed successfully',
      sql, 
      results,
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
