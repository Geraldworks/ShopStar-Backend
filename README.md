# ShopStar-Backend

Welcome to **ShopStar-Backend**, the server-side component of the ShopStar application. This backend service handles all CRUD operations and data management for the ShopStar application, providing a robust API to interact with product listings.

## Features

- **RESTful API**: Provides endpoints for creating, reading, updating, and deleting product listings.
- **SQLite Database**: Utilizes SQLite for lightweight and efficient data storage.
- **Authentication and Authorization**: Securely manage user access.
- **Static File Serving**: Deploys static files from the frontend application to deliver a seamless user experience

## Getting Started

To get started with ShopStar-Backend, clone the repository and follow the installation instructions. Ensure you have SQLite installed and configured for database management. The backend also serves static files from the frontend, so make sure to build and include the frontend assets in the project as `dist`.

## Installation Instructions

Run this chunk to install the required libraries

```bash
npm install
```

The repository comes with a prepopulated SQLite Database. However if you do need to re-initialise the database, run this command

```bash
npm run init-db:dev
```

Finally, run this command to get yourself started in the development environment

```bash
npm run dev
```

## Environment File

A `sample.env` file has been added which lists all required environment variables in this project
