# Домашнє завдання 4

(адреса гілки https://github.com/VitaliiShc/goit-node-rest-api/tree/04-auth)

Створи гілку 04-auth з гілки master.
Продовж створення REST API для роботи з колекцією контактів. Додай логіку аутентифікації / авторизації користувача через JWT (https://jwt.io/).

## Крок 1

У коді створи схему і модель користувача для колекції users.

```js
{
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}

```

Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додайте властивість

```js
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```

Примітка: 'user' - назва колекції, у якій зберігаються користувачі.

## Крок 2

# Реєстрація

Створити ендпоінт /users/register
Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації (Registration validation error).
У разі успішної валідації в моделі User створити користувача за даними, які пройшли валідацію. Для засолювання паролів використовуй bcrypt (https://www.npmjs.com/package/bcrypt) або bcryptjs (https://www.npmjs.com/package/bcryptjs).

- Якщо пошта вже використовується кимось іншим, повернути Помилку Conflict (Registration conflict error).
- В іншому випадку повернути Успішна відповідь (Registration success response).

Registration request

```js
POST /users/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

Registration validation error

```js
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  "message": "Помилка від Joi або іншої бібліотеки валідації"
}
```

Registration conflict error

```js
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

Registration success response

```js
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

# Логін

Створити ендпоінт /users/login
В моделі User знайти користувача за email.
Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації (Login validation error).

- В іншому випадку, порівняти пароль для знайденого користувача, якщо паролі збігаються створити токен, зберегти в поточному юзера і повернути Успішна відповідь (Login success response).
- Якщо пароль або імейл невірний, повернути Помилку Unauthorized (Login auth error).

Login request

```js
POST /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

Login validation error

```js
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  "message": "Помилка від Joi або іншої бібліотеки валідації"
}
```

Login success response

```js
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

Login auth error

```js
Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}
```

## Крок 3

# Перевірка токена

Створи мідлвар для перевірки токена і додай його до всіх раутів, які повинні бути захищені.

- Мідлвар бере токен з заголовків Authorization, перевіряє токен на валідність.
- У випадку помилки повернути Помилку Unauthorized.
- Якщо валідація пройшла успішно, отримати з токена id користувача. Знайти користувача в базі даних з цим id.
- Якщо користувач існує і токен збігається з тим, що знаходиться в базі, записати його дані в req.user і викликати next().
- Якщо користувача з таким id НЕ існує або токени не збігаються, повернути Помилку Unauthorized

Middleware unauthorized error

```js
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Крок 4

# Логаут

Створити ендпоінт /users/logout
Додай в маршрут мідлвар перевірки токена.

- У моделі User знайти користувача за \_id.
- Якщо користувача не існує повернути Помилку Unauthorized (Logout unauthorized error).
- В іншому випадку, видалити токен у поточного юзера і повернути Успішна відповідь (Logout success response).

Logout request

```js
POST / users / logout;
Authorization: 'Bearer {{token}}';
```

Logout unauthorized error

```js
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

Logout success response

```js
Status: 204 No Content
```

## Крок 5

Поточний користувач - отримати дані юзера по токені
Створити ендпоінт /users/current
Додай в раут мідлвар перевірки токена.

- Якщо користувача не існує повернути Помилку Unauthorized (Current user unauthorized error)
- В іншому випадку повернути Успішну відповідь (Current user success response)

Current user request

```js
GET / users / current;
Authorization: 'Bearer {{token}}';
```

Current user unauthorized error

```js
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

Current user success response

```js
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
```

## Додаткове завдання - необов'язкове

Зробити пагінацію для колекції контактів (GET /contacts?page=1&limit=20).
Зробити фільтрацію контактів по полю обраного (GET /contacts?favorite=true)
Оновлення підписки (subscription) користувача через ендпоінт PATCH /users. Підписка повинна мати одне з наступних значень ['starter', 'pro', 'business']
