# Railway Management System API

## Overview
The Railway Management System is a web-based application designed to facilitate train bookings, manage user registrations, and handle admin operations. It mimics functionalities similar to IRCTC, allowing users to check train availability between stations, book seats, and manage train schedules.

## Features
- **User Registration**: Users can create an account to manage their bookings.
- **User Login**: Secure login for users to access their accounts.
- **Train Management**: Admins can add, update, and manage train schedules and seat availability.
- **Real-Time Availability**: Users can check available trains and seats between specified stations.
- **Booking Management**: Users can book seats and retrieve their booking details.
- **Role-Based Access Control**: Different access levels for users and admins.

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT) for user sessions and API key for admin access

### Backend URL
`https://irctc-api-ds17.onrender.com`

### 1. Register a User
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Input**: 
    ```json
    {
      "username": "string",
      "password": "string",
      "role": "string"  // "user" or "admin"
    }
    ```
- **Response**: 
    ```json
    {
      "id": "number",
      "username": "string",
      "role": "string"
    }
    ```

---

### 2. Login a User
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Input**: 
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
- **Response**: 
    ```json
    {
      "token": "string"  // JWT token
    }
    ```

---

### 3. Add a Train (Admin Only)
- **Endpoint**: `/admin/trains`
- **Method**: `POST`
- **Input**: 
    ```json
    {
      "train_name": "string",
      "source": "string",
      "destination": "string",
      "total_seats": "number"
    }
    ```
- **Response**: 
    ```json
    {
      "id": "number",
      "train_name": "string",
      "source": "string",
      "destination": "string",
      "total_seats": "number"
    }
    ```

---

### 4. Get Available Trains
- **Endpoint**: `/bookings/trains`
- **Method**: `GET`
- **Input**: Query Parameters:
    - `source`: `string`
    - `destination`: `string`
- **Response**: 
    ```json
    [
      {
        "id": "number",
        "train_name": "string",
        "available_seats": "number"
      },
      // more trains...
    ]
    ```

---

### 5. Book a Seat
- **Endpoint**: `/bookings/book`
- **Method**: `POST`
- **Input**: 
    ```json
    {
      "train_id": "number",
      "seat_number": "number"
    }
    ```
- **Response**: 
    ```json
    {
      "status": "string",  // "confirmed"
      "booking_id": "number",
      "train_id": "number",
      "seat_number": "number"
    }
    ```

---

### 6. Get Specific Booking Details
- **Endpoint**: `/bookings/:id`
- **Method**: `GET`
- **Input**: 
    - **Path Parameter**: `id`: `number` (Booking ID)
- **Response**: 
    ```json
    {
      "id": "number",
      "user_id": "number",
      "train_id": "number",
      "seat_number": "number",
      "status": "string"  // "confirmed"
    }
    ```

---
