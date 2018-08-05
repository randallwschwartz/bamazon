DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(500) NULL,
  department_name VARCHAR(500) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cleaning Wipes", "Automotive", 9.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Car Air Freshener", "Automotive", 2.35, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Floor Mats", "Automotive", 14.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toaster Oven", "Kitchen Appliances", 11.95, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Maker", "Kitchen Appliances", 24.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Kitchen Appliances", 29.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Tools", 8.95, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cordless Drill", "Tools", 64.99, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("50-pc Wrench Set", "Tools", 49.50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Overhead Work Light", "Tools", 22.95, 14);

SELECT * FROM products;