# Express Server + MongoDB Setup

## Installing Packages 💾📦

To install packages, use the following command in the app directory:

```
npm i <package_name>
```

You can check the `package.json` to ensure the package is there.

If a `node_modules` folder is not present, there are no packages installed within that working directory.

## Packages 📦

### **Express**: 🌐

#### Allows you to spin up an HTTP server.

```javascript
const express = require("express");
const app = express();
```

### **Bcrypt**: 🔒

#### Hashes passwords so they aren't stored in plain text.

```javascript
const bcrypt = require("bcrypt");
const hashedPassword = bcrypt.hashSync("myPassword", 10);
```

### **CORS**: 📜

#### Allows requests from the front end (browser).

```javascript
const cors = require("cors");
app.use(cors());
```

### **Dotenv**: 🤐

#### Hides sensitive information in environment variables.

```javascript
require("dotenv").config();
const dbPassword = process.env.DB_PASSWORD;
```

#### Dotenv Example

Create a file named `.env` in your project directory and add the following content:

```
DB_PASSWORD=mySecretPassword
```

In this example, `DB_PASSWORD` is set to `mySecretPassword`. Replace it with your actual database password. Make sure not to include any quotation marks or spaces around the equals sign when defining your environment variables in the `.env` file.

### **Jsonwebtoken**: 🎫

#### Allows a unique token to be generated for each user.

```javascript
const jwt = require("jsonwebtoken");
const token = jwt.sign({ username: "user123" }, "secretkey", {
  expiresIn: "1h",
});
```

### **Mongoose**: 📅

#### Allows connection and interaction with our MongoDB database.

```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

## MongoDB + Mongoose Documentation 📚

- [Documents (Mongo/SQL comparison)](https://www.mongodb.com/docs/manual/reference/sql-comparison/)
- [Documents (Mongoose)](https://mongoosejs.com/docs/documents.html)
- [CRUD Operations](https://www.mongodb.com/docs/manual/crud/)
- [Models (Mongoose)](https://mongoosejs.com/docs/models.html)
- [Query Documents/Entries (Mongoose)](https://mongoosejs.com/docs/queries.html)

## Tools ⚙️

- **MongoDB Compass**: A graphical user interface (GUI) tool designed to simplify the development, administration, and analysis of MongoDB databases.
  [MongoDB Compass Documentation](https://docs.mongodb.com/compass/)

- **Postman**: A powerful API development tool used by developers to design, test, and document APIs quickly and efficiently.
  [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)

## Terms 📖

### **Headers**:

#### Additional pieces of information sent along with a request or response in the HTTP protocol. They contain metadata about the message, providing details such as the content type, content length, caching directives, authentication tokens, and more.

### **HTTP Methods**:

#### GET/POST/PUT/DELETE/PATCH.

### **Server**:

#### A computer program or device that provides functionality or resources to other programs, known as clients, over a network.

### **Front End**:

#### The client, what the user sees in their browser or app. Front facing.

### **NPM**:

#### Node Package Manager, an installer tool bundled with Node.js to install packages and distribute your own Node.js packages.

### **JSON**:

#### A lightweight format for data. A structure that makes data easy for machines to parse and generate. Easy for humans to read.

### **CORS**:

#### A security feature implemented in web browsers that controls access to resources from different origins (domains).

### **ORM (Object Relational Mapping)**:

#### A programming technique that allows developers to interact with relational databases using an object-oriented approach. Popular ORM libraries for JavaScript include Sequelize for SQL databases and Mongoose for MongoDB.
