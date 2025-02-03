# Photo-Liking Application Project

### Link to website

<a href="https://phase-4-photo-store-project-jmm2.onrender.com" target="_blank">Visit the Photo App</a>


## INTRODUCTION
- In this project we used flask and python to create the back-end.
- Javascript and React for the front-end.
- Styling was done using css and semantic ui.

### What is the project about.
The project is about an application which is used to post and like photos .

### What A User Can Do..
1. A user without an account should be able to view all the photos on the home page.
2. A logged in user can view all photos on the home page.
3. A logged in user can view information about a specific photo on the homepage.
4. A logged in user can like a photo on the home page which is stored in the liked category.
5. A logged in user can unlike a photo which is removed from the liked category.
6. A user is able to view information about a photo in the liked category.
7. A user is able to post a photo which is posted both on the homepage and posted category.
8. A user is able to delete a posted photo which is deleted both on the homepage and posted category.
9. A user is able to sign up and create an account.
10. A user is able to log in using the account they used to sign up.
11. A user is able to log-out when he/she wished to .


## Running the front end

1. Enter the client directory:
```sh 
cd client
```

2. Run the following code to install necessary dependancies: 
```sh
npm install react-router-dom
npm install axios
npm install semantic-ui-css
npm install semantic-ui-react
```
3. Launch the front-end:
```sh
npm start
```


## BACKEND.

### Model.py

- This is the model that holds all the tables. 
- In our project we are using three tables: User table, Photo table and Like table.
- One-to-many relationship: 
        A user can like many photos.
        A user can post many photos.
- Many-to-many relationship: 
        A photo can be liked by many users and a user can like many photos.

### app.py
- This is used to store all the routes to our endpoints.
- We have 13 endpoints.
- We use jason web tokes for authentication.
- What the endpoints can do: 
1. Endpoint for signing up
2. Endpoint to log-in
3. Endpoint to get all photos
4. Endpoint to get a specific photo by its ID.
5. Endpoint to post a new photo.
6. Endpoint to delete a posted photo by its ID.
7. Endpoint to like a photo.
8. Endpoint to unlike a photo.
9. Endpoint to get all liked photos by a specific user.
10. Endpoint to get extra information about a photo using its ID.
11. Endpoint to get all posts by a specific using the user ID.
12. Enpoint to get all users.
13. Endpoint to log-out.

### seed.py
- In this file we focus on seeding the database. 
- The images used  in the project are stored in this file.

### Running the Back-end.

Note: Make sure the python version stated in the pipfile is compatible with your application.

1. Enter the virtual environment:
```sh
pipenv shell
```
2. Enter the server directory:
```sh
cd server
```

3. Run the following code to install necessary dependancies: 
```sh
pipenv install faker flask_jwt_extended flask_cors flask_sqlalchemy flask flask_migrate
```
4. Launch the back-end:
```sh
flask run
```

### Author

Authored by:

-Leo Muraya

## LICENSE
Copyright <2024> 

- Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. The name of the copyright holder may be used to endorse or promote products derived from this software without specific prior written permission.
```sh
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```
