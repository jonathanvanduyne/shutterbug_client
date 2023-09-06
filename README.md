# Rare: The Publishing Platform for the Discerning Writer


## Application Overview
Rare is a content management application for users to create/edit/delete posts as well as comment on others' posts via comments, tags, and reactions. To contextualize the content, categories are applied to each post to ensure the users are perusing insights relatable to their interests. As such, admins and authors can create/edit/delete categories as well as individual comments, tags, and reactions. To ensure that the content is appropriate, only admins are allowed to edit and delete pre-existing tags and categories. As authors are able to delete their own comments and posts, an individual page will proliferate with the logged in user's posts. The overall purpose of our app is to allow users to interact with like-minded individuals and bond over shared communal interests. Our app is less about managing content than it is about fostering life-long relationships.   

## Technologies Used

 ![HTML5](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Git](https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white) ![JSON Server](https://img.shields.io/badge/JSON_Server%20-%232a2e2a.svg?&style=for-the-badge&logo=JSON&logoColor=white) 
[![Django](https://img.shields.io/badge/Django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python%20-%233776AB.svg?&style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/) 
![Visual Studio Code](https://img.shields.io/badge/VSCode%20-%23007ACC.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white)

 
## Getting Started

### Server Side
1. Clone this repository for the server side:
```sh
git clone git@github.com:NSS-Day-Cohort-64/rare-django-server-glacier-freeze-1.git
cd rare-django-server-glacier-freeze
```
2. Initialize virtual environment:
```sh
pipenv shell
```
3. Install third party packages:
```sh
pipenv install django autopep8 pylint djangorestframework django-cors-headers pylint-django
```
4. Create the project and API application (DO WE NEED THIS??????)
```sh
django-admin startproject rare
python3 manage.py startapp rareapi
```

5. Migrate and seed database (DO WE NEED THIS??????)
```sh
chmod u+x ./seed_database.sh
./seed_database.sh
```
6. Get the server running
```sh
python3 manage.py runserver
```


### Client Side
1. Clone this repository for the client side:
```sh
git clone git@github.com:NSS-Day-Cohort-64/rare-django-client-glacier-freeze.git
cd rare-django-client-glacier-freeze
```
2. Install dependencies: 
```sh
npm install
```
3. Run the code 
```sh
npm start
```
3. Login credentials: (Admin = Jonathan, Author = Chesney)
```txt
username: jonathanislame@aol.com
password: lemmon
```
```txt
username: chesney@farmersmeet.com
password: lemmon
```

## ERD

https://dbdiagram.io/d/5f885a013a78976d7b77cb74

## Wireframe

https://miro.com/app/board/o9J_kiGCSK4=/


## Features



## Technologies Used

4. This template is using [Bulma](https://bulma.io/documentation) for styling. Take a little bit of time to familiarize yourself with the framework if you would like to continue using it.
