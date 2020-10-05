# PlantLyfe Backend

#### Version 1.1.0

#### License and Copyright:
- [License Agreement](LICENSE)
- &copy; Devin Graham
---

## Before Getting Started:
#### Notes:
- This project is still currently under development
- Project Priority: Low
- Due to recent changes to the structure of the API, the documentation is currently not up to date. However, these should all be non-breaking changes.

#### Issues:
- Images cannot be added properly on hosted backend (Heroku). Need to swap multer for multer-s3.
---

## Getting Started Locally:
1. Fork and clone this repository
1. Run **npm i** from root directory
1. Run **npm run server** to start the server on your machine (will be running on port 5000, if port not defined in .env)
 * Be sure to have this server running when trying to test your frontend app.
 * <b>OLD DEPLOY LINK >> <i>NOTE: To connect to deployed backend instead of localhost, Heroku deployment can be found here: <ins>https://wmplants-db.herokuapp.com/</ins></i></b>

## Endpoints:
* Example endpoint would be: **localhost:5000/api/users** <ins>OR</ins> if using deployed backend: **wmplants-db.herokuapp.com/api/users**

#### Register/Login/Logout Endpoints

| Action | Endpoint | Description
|---|---|---|
| POST | `/api/auth/register` | Creates a new user |
| POST | `/api/auth/login` | Allows user to login and returns token |
| GET | `/api/auth/logout` | Destroys current session and logs a user out |

#### Shape of User Required to Register (JSON):
```
{
  "username": "BrandonSanderson",
  "password": "AuthorMan2020"
}
```
#### The Data Returned by Server After Registering:
```
{
    "id": 1,
    "username": "BrandonSanderson"
}
```

#### Shape of User Required to Login (JSON):
```
{
  "username": "BrandonSanderson",
  "password": "AuthorMan2020"
}
```
#### The Data Returned by Server After Logging In:
```
{
    "id": 1,
    "welcome": "BrandonSanderson",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJwZXRlcnBhbiIsImlhdCI6MTU5MDUyMzgwNSwiZXhwIjoxNTkwNTQxODA1fQ.J7xBHz_ZbPQDkVIai3kA3XvdYM0akrI2LqqBq9FzeFk"
}
```

#### User Endpoints

| Action | Endpoint | Description
|---|---|---|
| GET | `/api/users` | If user is logged in, returns an array of all other users |
| GET | `/api/users/:id` | If user is logged in, returns the user with the specified ID |
| GET | `/api/users/:id/plants` | Retrieves list of user's plants and plant info |
| PUT | `/api/users/:id` | Edits user with specified ID |
| DELETE | `/api/users/:id` | Deletes user with specified ID |

##### NOTE: To access any of these user endpoint, you will need token authentication, which can be passed after a user login is performed.
  * Example:
  ```
  const loginHandler = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/auth/login', userCred)
      .then(res => {
        window.localStorage.setItem('token', res.data.token);
      })
      .catch(err => console.log(err));
  };
  ```

#### Plant Endpoints

| Action | Endpoint | Description
|---|---|---|
| GET | `/api/plants` | If user is logged in, returns an array of all plants (theirs and those of other users) |
| GET | `/api/plants/:id` | If user is logged in, returns the plant with the specified ID |
| POST | `/api/plants` | Adds a plant to currently logged in user |
| PUT | `/api/plants/:id` | Edits plant with specified ID |
| DELETE | `/api/plants/:id` | Deletes plant with specified ID |

#### Overall Shape of Plant (JSON):
```
{
  "nickname": "Rose",
  "species": "Rosidopidus", <-- NOT A REQUIRED FIELD
  "h2o_frequency": "Once Daily",
  "user_id": 1  <-- AUTOMATICALLY GIVEN TO PLANT BASED ON THE CURRENTLY LOGGED IN USER, SO NO NEED TO ADD THIS AS AN INPUT OF ANY KIND
}
```

## Database Schema:
![Screenshot](dbSchema.JPG)

## Shapes of Responses Returned by Every Endpoint:

#### Shapes of Responses from Users Endpoints:

#### <ins>`/api/users: GET`</ins>
```
[
    {
        "id": 20,
        "username": "testUser.901.0631815665126"
    },
    {
        "id": 21,
        "username": "testUser.146.05266932369122"
    },
    {
        "id": 22,
        "username": "testUser.208.88310756153027"
    }
]
```
#### <ins>`/api/users/:id: GET`</ins>
```
{
    "id": 20,
    "username": "testUser.901.0631815665126"
}
```
#### <ins>`/api/users/:id/plants: GET`</ins>
```
[
    {
        "id": 1,
        "nickname": "Rose",
        "species": "Rosidopidus",
        "h2o_frequency": "Once Daily",
        "user_id": 1
    },
    {
        "id": 2,
        "nickname": "Daff",
        "species": "Daffidillius",
        "h2o_frequency": "Once Daily",
        "user_id": 1
    }
]
```
#### <ins>`/api/users/:id: PUT`</ins>
```
After performing a put request upon a user editing their information (username, password) an object with their id, username and is returned:

{
    "id": 1,
    "username": "hellerworld"
}
```
#### <ins>`/api/users/:id: DELETE`</ins>
```
{
    "message": "User has been successfully removed"
}
```

#### Shapes of Responses from Plants Endpoints:

#### <ins>`/api/plants: GET`</ins>
```
[
    {
        "id": 1,
        "nickname": "Rose",
        "species": "Rosidopidus",
        "h2o_frequency": "Once Daily",
        "user_id": 1
    },
    {
        "id": 2,
        "nickname": "Daff",
        "species": "Daffidillius",
        "h2o_frequency": "Once Daily",
        "user_id": 1
    },
    {
        "id": 3,
        "nickname": "Bush",
        "species": "Busheus",
        "h2o_frequency": "Once Yearly",
        "user_id": 2
    }
]
```
#### <ins>`/api/plants/:id: GET`</ins>
```
{
    "id": 2,
    "nickname": "Daff",
    "species": "Daffidillius",
    "h2o_frequency": "Once Daily",
    "user_id": 1
}
```
#### <ins>`/api/plants: POST`</ins>
```
Server responds with the full plant object:

{
    "id": 5,
    "nickname": "MisterPlantigus",
    "species": "MysteriousPlantious",
    "h2o_frequency": "Thrice Weekly",
    "user_id": 37
}
```
#### <ins>`/api/plants/:id: PUT`</ins>
```
After performing a put request upon a user editing a plant's info (nickname, species or h2o_frequency) an object with the edited plant's id, nickname, species, h2o_frequency and user_id is returned:

{
    "id": 5,
    "nickname": "MisterPlantigusEdited",
    "species": "MysteriousPlantious",
    "h2o_frequency": "Thrice Weekly",
    "user_id": 37
}
```
#### <ins>`/api/plants/:id: DELETE`</ins>
```
{
    "message": "Plant has been successfully removed"
}
```
