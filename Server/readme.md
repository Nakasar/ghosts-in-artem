NodeJS Server for Ghost In Artem project
==

Generalities
-
> This server will host the API to register and verify user/stations identity aswell as the mongo database.

Install
-
Created as a npm project. Should work on Windows aswell as on Linux env.

**Dependencies for server:**  
- nodejs (install using nodejs-linux)
- npm (install using npm)
- mongodb (follow [this tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/))

**Dependencies for node project:**  
- express (http requests and listening simplification)
- mongoose (simplifies connection with mongo database and model creation)
- nodemon (simplifies server launch)


Usage
-

### Server
**Start MongoDB instance**  
Start MongoDB instance using `sudo service mongod start` or `sudo service mongod restart` on Linux.


**Start application**  
Init project after cloning repository. Then proceed to start using `npm run start` *(script defined in package.json)*.

**Stop application and shutdown server**  
- Stop application exiting the terminal.
- Stop mongoDB instance using `sudo service mongod stop`.

### API
Access to API endpoints on local machine using `http://localhost:3000/`.  
Access users endpoint at `/users`, and specific user using `/users/<user_id>`. (Usage of postman chrome extension is recommended).  
Access list of users' phone bluetooth mac address using `/users/phones`.  
Access stations endpoint at `/stations`, and specific station using `/stations/<station_id>`.

#### Models

| **Users** |  |  |
| ---- | :---: | ---:|
| userid _\_id_ | uuid | id of user in database |
| first\_name | String | user name |
| last\_name | String | user name |
| nick\_name | String | user nickame |
| phone\_id | String | mac address or bluetooth id of user's device |
| role | String | user role in 'master', 'ghost', 'depinfo', 'other' |
| profession | String | user profession in 'vampire', 'zombie'... |

| **Stations** |  |  |
| ---- | :---: | ---:|
| stationid _\_id_ | uuid | id of station in database |
| name | String | Station name |
| ip\_address | String | ip address of station |
| mac\_address | String | mac address of station |
| actions | [String] | array of available actions commands to be executed |
