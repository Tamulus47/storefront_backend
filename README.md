# about
- postgres database running on port '5432'
- application server running on port '8080'
- look at .env-EX & database.json-EX for more information about environment variables & database configuration.
## how to use
1. clone the project
2. run command 'npm i' to install project packages.
3. add your database information in .env file.
4. add your database information in database.json file to configuration db-migrate.
5. run command 'db-migrate --env dev up' to setup dev database and 'db-migrate --env test up' to setup test database.
6. connect to psql with user and password.
7. run command 'npm run start' to start the server.