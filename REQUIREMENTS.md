# endpoints:
## users endpoint
- '/Users' [GET] 
- '/Users/:id' [GET] 
- '/Users' [Post]
## products endpoint
- '/Products' [GET] 
- '/Products/:id' [GET] 
- '/Products' [Post]
## orders endpoint
- '/orders' [GET] 
- '/orders/:id' [GET] 
- '/orders' [Post]
- '/order/:id/product' [Post]
# database tables:
- Table: Products (id:integer, name:varchar, price:integer)
- Table: Users (id:integer, firstName:varchar, lastName:varchar, password:integer)
- Table: Orders (id:integer, user_id:integer[foreign key to Users table], order_status:varchar)
- Table: Orders_Products (id:integer, Product_quantity:integer, order_id:integer[foreign key to Orders table], Product_id:integer[foreign key to Products table])