# Order Management System

A Full Stack Order Management System built using **Node.js, Express.js, MongoDB, React.js**, and **Node Cron**.

This project allows users to create and manage orders, update order and payment status, track status history, and automatically process orders using a scheduled background job.

---

# Features

## Backend

- Create Order API
- Get All Orders API
- Get Single Order API
- Update Order Status API
- Update Payment Status API
- Filter Orders by Status
- Search Orders by Customer Name or Order ID
- Pagination Support
- Status History Tracking
- Scheduler Execution Logs
- Secret Key Protected Scheduler API

## Scheduler

- Runs every 5 minutes
- Automatically checks pending orders
- Updates order status based on time
- Saves status history
- Saves scheduler execution logs

## Frontend

- React Dashboard
- Orders Table
- Status Filter
- Loading State
- Error Handling
- Responsive UI

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Node Cron

## Frontend

- React.js
- Axios
- Vite

---

# Folder Structure

```
order-management-assignment/

│── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scheduler/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example

│── frontend/
│   ├── src/
│   ├── public/
│   └── package.json

│── postman/
│── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/order-management-assignment.git
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_secret_key
```

---

# API Endpoints

## Create Order

```
POST /api/orders
```

---

## Get All Orders

```
GET /api/orders
```

Supports

- Pagination
- Status Filter
- Search

Example

```
GET /api/orders?page=1&limit=10
```

```
GET /api/orders?status=PLACED
```

```
GET /api/orders?search=Zuhaib
```

---

## Get Single Order

```
GET /api/orders/:id
```

---

## Update Order Status

```
PATCH /api/orders/:id/status
```

Request Body

```json
{
  "orderStatus": "PROCESSING"
}
```

---

## Update Payment Status

```
PATCH /api/orders/:id/payment
```

Request Body

```json
{
  "paymentStatus": "PAID"
}
```

---

## Order Status History

```
GET /api/orders/:id/history
```

---

## Scheduler Logs

```
GET /api/scheduler/logs
```

Header

```
x-secret-key: your_secret_key
```

---

# Scheduler Logic

The scheduler runs automatically every **5 minutes**.

It performs the following tasks:

- Fetches all orders
- Checks order age
- Updates order status automatically
- Stores status history
- Saves scheduler execution logs

Order Flow

```
PLACED
   ↓
PROCESSING
   ↓
READY_TO_SHIP
```

---

# Database Design

The application uses **MongoDB** because it provides:

- Flexible schema
- Fast development
- High scalability
- Easy integration with Node.js

Collections used

## Orders

Stores

- Order ID
- Customer Name
- Phone Number
- Product Name
- Amount
- Payment Status
- Order Status
- Created Time
- Updated Time

---

## StatusHistory

Stores every order status transition.

Fields

- Order ID
- Previous Status
- New Status
- Changed Time

---

## SchedulerLogs

Stores every scheduler execution.

Fields

- Total Orders Checked
- Total Orders Updated
- Execution Message
- Execution Time

---

# Duplicate Order Prevention

Each order receives a unique Order ID before saving to the database.

---

# Race Condition Handling

The application uses MongoDB atomic update operations to reduce concurrent update conflicts.

---

# Scalability

The application follows a modular architecture.

Separate modules are used for

- Routes
- Controllers
- Models
- Scheduler
- Middleware
- Services

This structure allows easy scaling and maintenance.

---

# Scheduler Used

This project uses **Node Cron** for local scheduling.

The same scheduler can easily be replaced with

- AWS EventBridge
- Google Cloud Scheduler
- Render Cron Jobs
- Railway Cron
- GitHub Actions Cron

without changing business logic.

---

# Postman Collection

The repository contains a Postman collection for testing all APIs.

---

# Running the Project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

# Author

**Mohd Zuhaib Khan**

GitHub

https://github.com/Zuhaibkhank