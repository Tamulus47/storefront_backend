CREATE TABLE Products(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price MONEY NOT NULL
);

CREATE TABLE Users(
id SERIAL PRIMARY KEY,
firstName VARCHAR(255) NOT NULL,
lastName VARCHAR(255) NOT NULL,
password INTEGER NOT NULL
);

CREATE TABLE Orders(
id SERIAL PRIMARY KEY,
Product_id INTEGER,
Product_quantity INTEGER NOT NULL,
user_id INTEGER,
order_status CHAR(8) NOT NULL,
FOREIGN KEY (Product_id) REFERENCES Products(id),
FOREIGN KEY (user_id) REFERENCES Users(id)
);