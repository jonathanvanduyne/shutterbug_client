## ShutterBug - a common app for photography lovers everywhere

## Application Overview
Shutterbug is a photograph content management application for users to create/read/update/delete posts as well as comment on others' posts via comments, tags, and reactions. To contextualize the content, categories are applied to each post to ensure the users are perusing insights relatable to their interests. As such, admins and authors can create/edit/delete categories as well as individual comments, tags, and reactions. To ensure that the content is appropriate, only admins are allowed to edit and delete pre-existing tags and categories. As authors are able to delete their own comments and posts, an individual page will proliferate with the logged-in user's posts. The overall purpose of my app is to allow users to interact with like-minded individuals and bond over shared communal interests.

To add a spice of fun to the application, I also created darkEST mode. When dark mode is activated on my app, the bat signal will appear which will enable the user to activate darkest mode. If the user "dares to trigger darkest mode," the user is taken to a screen-sized Gotham City modal where Batman's nemesis are animatedly flying around the screen and menacing the city. The only way to defeat the villains is to click on their images. While the user is trying to click and eradicate the villains, the time and click count are displayed so that users can track their progress and play for personal bests. If you do not enjoy darkest mode, sadly you might struggle with cute puppies and/or whimsy.

## Technologies Used

![HTML5](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Git](https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white) ![JSON Server](https://img.shields.io/badge/JSON_Server%20-%232a2e2a.svg?&style=for-the-badge&logo=JSON&logoColor=white) 
[![Django](https://img.shields.io/badge/Django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python%20-%233776AB.svg?&style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/) 
![Visual Studio Code](https://img.shields.io/badge/VSCode%20-%23007ACC.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white)

## To Get Started

### Server Side
1. Clone this repository for the server side:
```sh
git clone git@github.com:jonathanvanduyne/shutterbug_server.git
cd shutterbug_server
```

2. Initialize virtual environment:
```sh
pipenv shell
```

3. Install third party packages:
```sh
pipenv install django autopep8 pylint djangorestframework django-cors-headers pylint-django
```

4. Migrate and seed database
```sh
chmod u+x ./seed_database.sh
```
```sh
./seed_database.sh
```

5. Get the server running
```sh
python3 manage.py runserver
```

### Client Side
1. Clone this repository for the client side:
```sh
git@github.com:jonathanvanduyne/shutterbug_client.git
cd shutterbug_client
```
2. Install dependencies: 
```sh
npm install
npm update
```
3. Run the code 
```sh
npm start
```
3. Login credentials: (Admin = Belle, User = Daniel)
```txt
username: 	belle_gen_z_queen (default)
password: shutterbug (default)
```
```txt
username: daniel_reads_big_books
password: shutterbug (default)
```

## ERD
https://dbdiagram.io/d/64e90c6902bd1c4a5e6d3f3e

## Wireframe
https://www.figma.com/file/uD5Ql9MYiwsj6XPuNKgp9z/ShutterBug-Capstone?type=design&node-id=0%3A1&mode=design&t=tGzGgnQLe3fFSQTR-1

## Features
<p>CRUD - everywhere</p>
<p>Social Media Posts - posting photos, title, text, author-info, category, publish-date, comments, reactions, flagging posts, tags</p>
<p>Direct Messaging - all threads display and individual threads to message other users</p>
<p>Admin Manager - Site Admins can take down flagged posts and alter whether deviant users can use the app and display content</p>
<p>Profile - User can view their profile info as well as individual posts</p>
<p>Dark mode - light and dark mode views on each screen</p>
<p>Darkest mode - interactive click game to defeat Batman's nemesis</p>
