ICE Task 1 — INSY7314 Backend Setup Documentation
1. Introduction
This document outlines the backend implementation for ICE Task 1 of the INSY7314 module. It describes the setup of a Node.js server, integration with MongoDB Atlas, creation of a Mongoose model, and validation of functionality through testing. The implementation follows best practices for modular design, reproducibility, and academic integrity.

2. Folder Structure
The project is organized into the following components:

* server.mjs: Main server file
* package.json: Project metadata and dependency management
* models/Note.mjs: Mongoose schema definition for notes
* .gitignore: Specifies files to exclude from version control
* README.md: Documentation file for ICE Task 1

Each file serves a distinct purpose in the backend architecture, supporting modularity and clarity.

3. Environment Setup
The backend environment was configured using Node.js.. The following steps were completed:

 The project was initialized using Node Package Manager (npm)
 Required dependencies were installed, including:
* Express for server routing
* Mongoose for MongoDB object modeling
* dotenv for managing environment variables
* CORS for enabling cross-origin requests
* A .env file was created to securely store the MongoDB Atlas connection string
* The .env file was added to .gitignore to prevent sensitive data from being pushed to GitHub

This setup ensures a secure and scalable backend foundation.

4. Mongoose Model
The Mongoose model is defined in the Note.mjs file located in the models directory. It specifies a schema for storing notes in MongoDB, with two fields: title and content. This schema is designed to be simple and extensible, allowing for future enhancements such as timestamps or user associations.

5. Express Server Configuration
The Express server is configured in the server.mjs file. It performs the following functions:

* Connects to MongoDB Atlas using Mongoose
* Parses incoming JSON requests
* Enables CORS to allow communication between frontend and backend
* Defines a POST route that accepts note data and saves it to the database

This route allows external clients to submit notes, which are then persisted in the MongoDB database.

6. Testing and Validation
The backend was tested using both curl and Postman to ensure the following:

* The server starts successfully
* The POST route accepts valid input
* Notes are saved correctly in MongoDB Atlas

Functionality was confirmed through runtime validation and inspection of saved documents in the database.

7. Submission Notes
The public GitHub repository is available at: https://github.com/Lusanda-git/INSY7314-Labs

* The .env file is excluded from version control for security reasons
* All required backend files are included and documented
* Screenshot evidence is provided separately in the accompanying Word document
