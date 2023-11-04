# Utopia
CSC322 Project

# FRONTEND: Quick Run (As Of Now)
Assuming you already have node installed, to start the frontend server just run in your terminal inside the src folder <br>
```npm start``` <br>
Currently, there is no requiremnts.txt file as no dependencies have been installed yet. When there comes a time where at least 5 dependencies have been installed, I will include such a file.

## Basic Breakdown
### App.js
This is the main page of the app. This is where we display all our components (ie. Header and ViewPostCards components). None of the components are made inside this file, they are only placed here to be displayed. Note that as of now, there is no option to write a post, that will be added soon. 
### header.js
In the main page, you will see to the far top left of the page the projects logo, user's pfp, and a search bar. This is our header. It is fixed into position so that when the user scrolls, these elements stay on the screen. The user pfp as of now is a temp pfp.
### view-post-card.js
These are the individual cards that you see on the main page. They have multiple props (pfp, author, body, likes, and color). Obviously more will be added later. The color prop is just a design thing I am still testing out on what looks good and how we should display the posts. I like the idea of posts having different background colors to make the site more pop out, but again this is still being tested.
