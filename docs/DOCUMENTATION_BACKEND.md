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

##  📊