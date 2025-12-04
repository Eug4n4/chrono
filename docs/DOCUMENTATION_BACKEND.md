# CHRONOS ⚙️ BACKEND 

## ENDPOINTS

```
GET /api/auth/login
GET /api/auth/verify/:token

POST /api/auth/logout
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/password-reset
POST /api/auth/password-reset/:token
POST /api/auth/resend-verification

PATCH /api/auth/avatar

GET  /api/holidays?country=Ukraine&year=2027

GET /api/calendar
GET /api/calendar/:calendar_id/events
GET /api/calendar/:eventId
GET /api/calendar/:calendar_id/guests

POST /api/calendar
POST /api/calendar/:calendar_id/events
POST /api/calendar/add-shared-event
POST /api/calendar/invite
POST /api/calendar/invite/respond
POST /api/calendar/:calendar_id/leave

PATCH /api/calendar/:id

DELETE /api/calendar/:calendar_id/guests/:user_id
DELETE /api/calendar/:calendar_id

GET /api/event/:eventId/guests

POST /api/event/invite
POST /api/event/:eventId/leave

PATCH /api/event/:eventId

DELETE /api/event/:eventId/guests/:userId
DELETE /api/event/:eventId

GET /api/tag

POST /api/tag
```

## Program Algorithm 📊
- Authentication
    - Create or enter account (The user chooses to register or log in. The system checks for an existing account, validates the data, and verifies the password. If everything is correct, token is created, and the user gains access to their account.)
    - Log out (The backend receives a logout request and deletes or deactivates the user's token. It returns a confirmation of a successful logout.)
- Calendar
  - Create calendar (Before creation, the backend validates the input data (title, description). After successful validation, a new calendar with these fields is created in the database. Then the backend sends a confirmation or the new calendar data to the frontend.)
  - Share calendar ()