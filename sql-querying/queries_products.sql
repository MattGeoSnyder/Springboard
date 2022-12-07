-- Comments in SQL Start with dash-dash --
INSERT INTO products (name, price, can_be_returned) VALUES ('chair', 44.00, false);

INSERT INTO products (name, price, can_be_returned) VALUES ('stool', 22.50, true);

INSERT INTO products (name, price, can_be_returned) VALUES ('table', 124.50, false);

SELECT * FROM products;

SELECT name FROM products;

SELECT name, price FROM products; 

INSERT INTO products (name, price, can_ber_returned) VALUES ('couch', 500.00, false);

SELECT * FROM products WHERE can_be_returned = true;

SELECT * FROM products WHERE price < 44.00;

SELECT * FROM products WHERE price BETWEEN 22.50 AND 99.99;

UPDATE products SET price = price - 20;

DELETE FROM products WHERE price < 25.00;

UPDATE prodcuts SET price = price + 20;

UPDATE products SET can_be_returned = true;