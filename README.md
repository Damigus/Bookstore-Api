## Table of Contents
- **[Getting Started](#getting-started)**<br>
- **[Installing](#installing)**<br>
- **[Overview](#overview)**<br>
- **[Back-end](#back-end)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[Register Endpoint](#register-endpoint)**<br>
- **[Login Endpoint](#login-endpoint)**<br>
- **[Czytelnicy Endpoints](#czytelnicy-endpoints)**<br>
- **[Ksiazki Endpoints](#ksiazki-endpoints)**<br>
- **[Wypozyczenia Endpoints](#wypozyczenia-endpoints)**<br>

# Library Management System API
Back-end REST API for managing a library system.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Installing
A step-by-step guide to setting up the development environment:

1. Clone the repository:
   ```bash
   git clone https://github.com/Damigus/ProjektApi.git
   ```
2. Open the terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
3. Install dependencies:<br>
   `npm install` `npm i node` `npm i nodemon` `npm i mongoose` `npm i morgan`<br>
   `npm i dotenv` `npm i jsonwebtoken` `npm i bcrypt` `npm i express` `npm i bodyParser`
4. Edit a `config.env` file and update the following variables:
   ```
   MONGO_USER=yourname
   MONGO_AUTH=your auth source code
   MONGO_PASSWORD=your password
   MONGO_DB_NAME=your data base name
   MONO_CLUSTER=your cluster name
   JWT_KEY=your hash secret key
   ```
5. Create a connection to your database.
6. Start the API:
   ```bash
   nodemon server.js
   ```

# Overview
The application allows you to manage library readers (czytelnicy), books (ksiazki), and rentals (wypozyczenia). Users can create, edit, and delete readers, books, and manage rentals. The system provides a simple way to track borrowed books and their due dates.

**Features:**
- Managing readers (czytelnicy)
- Managing books (ksiazki)
- Creating and managing rentals (wypozyczenia)
- Tracking borrowed books and return dates

# Back-end

**API**

The back-end provides a set of RESTful API endpoints to interact with readers, books, and rentals. These endpoints allow users to create, read, update, and delete data. The API also supports querying for books borrowed by specific readers and managing return dates.

**Database**

The application uses MongoDB with Mongoose for data storage. MongoDB stores data in a flexible, JSON-like format, while Mongoose defines schemas and models for entities like readers, books, and rentals. All data is persisted in MongoDB for future retrieval.

**Authentication**

Authentication is implemented using JWT (JSON Web Tokens). Users must log in to obtain a token, which is included in the header of API requests to access protected routes.

# API Endpoints
Use Base URL: `http://localhost:3000/`

## Register Endpoint
### POST `/users/signup`
**Request Body:**
```json
{
    "email": "example@hostname.com",
    "password": "password"
}
```
**Response:**
```json
{
    "wiadomosc": "Dodano uzytkownika"
}
```

## Login Endpoint
### POST `/users/login`
**Request Body:**
```json
{
    "email": "example@hostname.com",
    "password": "example123"
}
```
**Response:**
```json
{
    "token": "<JWT_TOKEN>"
}
```

## Czytelnicy Endpoints
### GET All Czytelnicy
**GET** `/czytelnicy`
**Response:**
```json
{
    "wiadomosc": "Lista wszystkich czytelników",
    "czytelnicy": [
        {
            "_id": "60c72b2f9b1d4c44b4d1a2cd",
            "imie": "Jan",
            "nazwisko": "Kowalski",
            "email": "jan.kowalski@example.com"
        }
    ]
}
```

### GET Czytelnik by ID
**GET** `/czytelnicy/:id`
**Response:**
```json
{
    "wiadomosc": "Szczegóły czytelnika",
    "czytelnik": {
        "_id": "60c72b2f9b1d4c44b4d1a2cd",
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "email": "jan.kowalski@example.com"
    }
}
```

### POST Czytelnik
**POST** `/czytelnicy`
**Request Body:**
```json
{
    "imie": "Anna",
    "nazwisko": "Nowak",
    "email": "anna.nowak@example.com"
}
```
**Response:**
```json
{
    "wiadomosc": "Nowy czytelnik został dodany!",
    "czytelnik": {
        "_id": "<ID>",
        "imie": "Anna",
        "nazwisko": "Nowak",
        "email": "anna.nowak@example.com"
    }
}
```

### PUT Czytelnik by ID
**PUT** `/czytelnicy/:id`
**Request Body:**
```json
{
    "imie": "UpdatedName",
    "nazwisko": "UpdatedLastName"
}
```
**Response:**
```json
{
    "wiadomosc": "Zaktualizowano czytelnika",
    "updatedCzytelnik": {
        "_id": "<ID>",
        "imie": "UpdatedName",
        "nazwisko": "UpdatedLastName",
        "email": "jan.kowalski@example.com"
    }
}
```

### DELETE Czytelnik by ID
**DELETE** `/czytelnicy/:id`
**Response:**
```json
{
    "wiadomosc": "Usunięto czytelnika"
}
```

## Ksiazki Endpoints
### GET All Ksiazki
**GET** `/ksiazki`
**Response:**
```json
{
    "wiadomosc": "Lista wszystkich książek",
    "ksiazki": [
        {
            "_id": "60c72b5f9b1d4c44b4d1a2d0",
            "tytul": "W pustyni i w puszczy",
            "autor": "Henryk Sienkiewicz",
            "gatunek": "Przygodowa"
        }
    ]
}
```

### POST Ksiazka
**POST** `/ksiazki`
**Request Body:**
```json
{
    "tytul": "New Book",
    "autor": "Author Name",
    "gatunek": "Genre"
}
```
**Response:**
```json
{
    "wiadomosc": "Nowa książka została dodana!",
    "ksiazka": {
        "_id": "<ID>",
        "tytul": "New Book",
        "autor": "Author Name",
        "gatunek": "Genre"
    }
}
```

## Wypozyczenia Endpoints
### GET All Wypozyczenia
**GET** `/wypozyczenia`
**Response:**
```json
{
    "wiadomosc": "Lista wszystkich wypożyczeń",
    "wypozyczenia": [
        {
            "_id": "60c72b8f9b1d4c44b4d1a2d3",
            "czytelnik": "60c72b2f9b1d4c44b4d1a2cd",
            "ksiazka": "60c72b5f9b1d4c44b4d1a2d0",
            "dataWypozyczenia": "2025-01-01",
            "dataZwrotu": "2025-02-01"
        }
    ]
}
```

### POST Wypozyczenie
**POST** `/wypozyczenia`
**Request Body:**
```json
{
    "czytelnikId": "60c72b2f9b1d4c44b4d1a2cd",
    "ksiazkaId": "60c72b5f9b1d4c44b4d1a2d0",
    "dataWypozyczenia": "2025-01-01",
    "dataZwrotu": "2025-02-01"
}
```
**Response:**
```json
{
    "wiadomosc": "Nowe wypożyczenie zostało dodane!",
    "wypozyczenie": {
        "_id": "<ID>",
        "czytelnik": "60c72b2f9b1d4c44b4d1a2cd",
        "ksiazka": "60c72b5f9b1d4c44b4d1a2d0",
        "dataWypozyczenia": "2025-01-01",
        "dataZwrotu": "2025-02-01"
    }
}
```

### DELETE Wypozyczenie by ID
**DELETE** `/wypozyczenia/:id`
**Response:**
```json
{
    "wiadomosc": "Usunięto wypożyczenie"
}
```

### PUT Wypozyczenie by ID
**PUT** `/wypozyczenia/:id`
**Request Body:**
```json
{
    "dataZwrotu": "2025-03-01"
}
```
**Response:**
```json
{
    "wiadomosc": "Zaktualizowano dane wypożyczenia",
    "updatedWypozyczenie": {
        "_id": "<ID>",
        "czytelnik": "60c72b2f9b1d4c44b4d1a2cd",
        "ksiazka": "60c72b5f9b1d4c44b4d1a2d0",
        "dataWypozyczenia": "2025-01-01",
        "dataZwrotu": "2025-03-01"
    }
}
```

