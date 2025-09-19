## Redis User CRUD API (Node.js + Express + ioredis)

Simple REST API demonstrating basic CRUD operations with Redis using ioredis. Users are stored as:
- Hash: `user:<email>` → fields: `name`
- Set: `users:emails` → all user emails

### Tech Stack
- Node.js, Express
- ioredis (Redis client)


### Prerequisites
- Node.js 18+
- A running Redis instance (local or hosted)


### Install & Run
```
npm install
npm run dev   # starts with nodemon

npm start     # plain node
```
Server defaults to `http://localhost:4000`.

### Health Check
```
GET /
```
Response: `Hey server is working`

### Base URL
- `http://localhost:4000/api`

### Endpoints

1) Get all users (emails only)
```
GET /api/getAllUsers
```
Response
```
{
  "success": true,
  "message": "Users fetched successfully",
  "data": ["alice@example.com", "bob@example.com"]
}
```

2) Create user
```
POST /api/createUser
Content-Type: application/json
{
  "email": "alice@example.com",
  "name": "Alice"
}
```
Response
```
{
  "success": true,
  "message": "Users created successfully"
}
```

3) Get user by email
```
POST /api/getUserByEmail
Content-Type: application/json
{
  "email": "alice@example.com"
}
```
Response
```
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "email": "alice@example.com",
    "name": "Alice"
  }
}
```

4) Delete user by email
```
DELETE /api/deleteUserByEmail
Content-Type: application/json
{
  "email": "alice@example.com"
}
```
Response (if existed)
```
{
  "success": true,
  "message": "User deleted successfully"
}
```

### cURL Examples
```
# Create user
curl -X POST http://localhost:4000/api/createUser \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","name":"Alice"}'

# List users
curl http://localhost:4000/api/getAllUsers

# Get user by email
curl -X POST http://localhost:4000/api/getUserByEmail \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com"}'

# Delete user
curl -X DELETE http://localhost:4000/api/deleteUserByEmail \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com"}'
```

### Data Model in Redis
- `users:emails` (SET) → holds every user email.
- `user:<email>` (HASH) → stores fields for the user (currently `name`).

### Project Structure
```
config/redis.js          # Redis client setup and connection logs
controllers/crudControllers.js  # Express handlers
services/crudServices.js # Redis data access helpers
routes/crudRoutes.js     # API route definitions
index.js                 # App bootstrap
postman/crudApis.json    # Postman collection (optional)
```

### Notes
- On Redis connection errors, the process logs the error and exits.
- Adjust `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD` to match your environment.


