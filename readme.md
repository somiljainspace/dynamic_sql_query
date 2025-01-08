git push --set-upstream origin main# Dynamic SQL Query API

This project provides a REST API for dynamically generating and executing SQL queries based on user inputs. The API allows users to query specific tables, select columns, apply filters (WHERE clauses), and sort results. It includes input validation, SQL injection protection, and pagination for large datasets.

## Dependencies

The following libraries are required to run the project:

- `express`: Web framework for Node.js
- `mysql2`: MySQL client for Node.js
- `body-parser`: Middleware for parsing request bodies
- `dotenv`: Module for loading environment variables from a `.env` file

### To install the dependencies, run the following command:

```bash
npm install

### setup and installation 

Step 1: Set up MySQL

Ensure you have MySQL installed and running on your local machine. Create a new database and populate it with the necessary tables (users, orders, products) before proceeding.

CREATE DATABASE my_api_db;
USE my_api_db;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES ('Product A', 100.00), ('Product B', 150.00), ('Product C', 200.00);


Step 2: Configure Environment Variables

Create a .env file in the root directory of your project and configure the following environment variables:

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=you can type your password
MYSQL_DATABASE=my_api_db


Step 3: Start the Server
npm start


POST /api/query

The API accepts a POST request to the /api/query endpoint with a JSON body containing the following parameters:
	•	table_name: The name of the table to query (e.g., users, orders, products).
	•	columns: An array of column names to select (e.g., ['id', 'name']) or ['*'] to select all columns.
	•	where: Optional filter conditions in the format { column: 'column_name', operator: 'operator', value: 'value' }.
	•	order_by: Optional sorting in the format { column: 'column_name', direction: 'ASC' | 'DESC' }.
	•	limit: Optional limit for the number of records.
	•	offset: Optional offset for pagination.


    {
  "table_name": "products",
  "columns": ["product_id", "name", "price"],
  "where": {
    "column": "price",
    "operator": ">",
    "value": 100
  },
  "order_by": {
    "column": "price",
    "direction": "ASC"
  },
  "limit": 5,
  "offset": 0
}


##you can test different edge cases in my cases all are working 
thanks Aishwarya maam!