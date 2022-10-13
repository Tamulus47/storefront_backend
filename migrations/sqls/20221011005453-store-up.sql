CREATE TABLE Products(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" MONEY NOT NULL
);

CREATE TABLE Users(
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE Orders(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER,
    "order_status" VARCHAR(50) NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES Users(id)
);

CREATE TABLE Orders_Products(
    "id" SERIAL PRIMARY KEY,
    "Product_quantity" INTEGER NOT NULL,
    "order_id" INTEGER,
    "Product_id" INTEGER,
    FOREIGN KEY ("order_id") REFERENCES Orders(id),
    FOREIGN KEY ("Product_id") REFERENCES Products(id)
    );