# Surge Global Assignment

A note taking web apllication developed using MERN stack. 

## Description

A simple application in which users can add, update and delete notes. System admin can register new users and view details of existing users. First time users will be sent an email request to change the temporary password set by the admin.

The backend of the application was built with RESTful web services using NodeJS and ExpressJS. MongoDB was used as the database. 
The frontend was built using ReactJS with REDUX toolkit for state management. JWT was used to implement role-based authetication and
bcryptjs was used in password encrytion. 
All interfaces are simple and easy to use. 


## Getting Started

#### Prerequisites
* NodeJS installed
* MongoDB server installed (if using a local database)

### Installing the application

* Clone the project from GitHub: https://github.com/SenuraJayasinghe/SurgeAssignment
* Run the follwing command in the parent directory
```
npm install
```

* Run the follwing command in the frontend directory
```
npm install
```

### Executing program

* A sample .env file is included in the repository. Set up mongoDB, nodemailer, Google Cloud Platform project with OAuth credentials for gmail, JWT secret key and configure the .env file as needed. (Check spam email for first time user email!)

* Run the following command in the frontend directory 
```
npm run client
```
* And then the following in the backend directory
```
npm run server
```
* If using a local mongoDB server, you seed it by executing the follwing
```
node seeds.js
```

* You can now view the system on http://localhost:3000!

* Please use the credentials below to access the application:
<br>`Admin:  Username: admin@gmail.com Password: admin123`</br>
<br>`First time user: Username: anna@gmail.com  Password: anna123`</br>
<br>`User:  Username: david2gmail.com Password david123`</br>
