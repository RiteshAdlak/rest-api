# rest-api
Rest API + Swagger documentation + Test Cases(Mocha + supertest)

REST API :

1. Endpoints :
 a. Registration :
	POST /users/signup
	POST /users/login

 b. Admin : 
	GET    /users
	GET	   /books
	POST   /books
	DELETE /books/bookId

c. Users : 
	GET    /books
	POST   /books/bookId/comments
	PUT    /books/bookId/comments/commentId
	DELETE /books/bookId/comments/commentId

2. API Docs : 
	$ cd API Docs
	 - openAPI
		- openapi.json
		- openapi.yaml
	 - swagger
		- swagger.json
		- swagger.yaml
NOTE : Use any browser(ideally chrome) and visit : https://editor.swagger.io/ and paste swagger.json content to the editor in chrome.

 3 How to setup project ? (IDE : Visual Code)
	a. git clone <repository>
	b. cd <repository>
	c. npm install
	d. Start MongoDB : 
	 - Server : mongod --dbpath="<path for DB>"
	 - Client : mongo
	e. npm start
	f. Refer Docs and use POSTMAN for the requests. 
 4. How to run Test Cases ?
 	a. npm run registration
 		- Runs test case to register Admin(configured in test/registration/registration.test.js) and Login using the same creds.
b. Once Admin is registered in DB, please enable admin flag in DB.
	Client console : 
	 - use books
	 - List all the users : db.users.find().pretty();
	 - db.users.update({"username":"admin"},{$set:{"admin":"true"}})
c. npm run admin
	 - Runs all the test cases which are allowed for Admin.
 
For Scripts please refer package.json.

