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
  - Share calendar (The backend receives a request from the frontend to add a user to a calendar and checks whether the user is already joined and has access rights. If the check passes, the backend stores the joining information in the database and sends an email notification to the user. After a successful operation, the server returns a confirmation to the frontend about the successful invitation.)
- Event
  - Create event (The backend receives a request to create an event and checks whether the calendar belongs to the user and if they have permission to add events. If the check passes, the event is stored in the database and notifications are sent to other users with access to the calendar. The server returns a confirmation to the frontend about the successful creation of the event.)
  - Share event (The backend receives a request to create an event and checks whether the calendar belongs to the user and if they have permission to add events. If the check passes, the event is stored in the database and notifications are sent to other users with access to the calendar. The server then returns a confirmation to the frontend about the successful creation of the event.)
- Settings (The backend receives a request to update user settings and checks the validity of the data and avatar. If the data is valid, the backend stores the new avatar and region in the database. After successful storage, the server returns a confirmation to the frontend about the profile update.)
- Notification (When the server starts, it creates a message queue for users using a CRON. The backend then processes the queue and sends emails to the respective users. After successful sending, the server updates the message status in the database.)