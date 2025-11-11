# chrono

## Назви

- Frontend: <https://dev.to/kristiyanvelkov/react-js-naming-convention-lcg>
- Backend: класи - PascalCase (наприклад: EmailManager), змінні/функції - camelCase (userId, isUserAuthenticated)
- файли із розширенням .js називаємо так, як на backend (user.profile.js countries.list.slice.js). Якщо ж файл містить лише 1 клас і нічого більше - PascalCase


## КАЛЕНДАР

- календар має ім'я та опис
- користувач має 1 дефолтний календар (особистий) після створення акаунту
- користувач має календар із державними святами (залежно від регіону) [11 holidays API](https://api.11holidays.com)
- користувач може видаляти, створювати, оновлювати власноруч створені календарі
- власник календаря може поділитися ним із іншими користувачами

## ПОДІЯ

- має назву, дату початку та кінця, категорію (arrangement, reminder, task), колір
- має лише 1 категорію із перелічених
- можна створити, якщо клікнути по пустому полю в календарі або через кнопку
- події категорії Arrangement повинні мати дефолтну тривалість?

## КАТЕГОРІЯ

- має назву (arrangement, reminder, task)

## КОРИСТУВАЧ

- має логін, пароль, пошту, підтвердив чи не підтвердив пошту, аватарку, код країни, список календарів (id), список своїх тегів (id)

## ENDPOINTS

```
GET  /api/auth/verify/:token
GET  /api/holidays?country=Ukraine&year=2027

POST /api/auth/register
POST /api/auth/login
POST /api/auth/password-reset
POST /api/auth/password-reset/:token
POST /api/calendar/
POST /api/event/
POST /api/tag/
```
