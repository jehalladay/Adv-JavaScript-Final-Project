# Adv-JavaScript-Final-Project
A basic MERN application that creates a planner that tracks the user's daily progress

Users are required to sign in or register (use a fake email and password as the app doesn't use HTTPS), then will be directed to a planner. 

The planner creates new Tasks and adds them to the central Master Queue to remind the user to do them, each completed task add points to that current day, and the app tracks the users daily and weekly progress.

User's can choose what subcategory the task lies under and create new subjects to assign tasks to, links can be attached to tasks by providing a url in the link field


## How to run the Planner App

### Clone and set up

In a chosen directory, git clone this repository

```bash
    git clone https://github.com/jehalladay/Adv-JavaScript-Final-Project.git
```

Once the repository has been cloned, cd into /Adv-JavaScript-Final-Project/src and then run npm install

```bash
    cd /Adv-JavaScript-Final-Project
    cd /src
    npm install
```

### Run using npm

To run the Planner App, in the /src directory run npm start

```bash
    npm start
```

Then navigate to 127.0.0.1:3002/ in a browser

### Run using gulp

To run the Planner App using the gulpfile.js the user must have chrome installed on their computer. Using gulp requires both a local and a global installation of gulp. To do this run npm install -g gulp

```bash
    npm install -g gulp
```

Then, in the /src directory run gulp

```bash
    gulp
```

gulp is a task-runner that we chose to develop the server and client with, gulp uses a nodemon plugin and the browser-sync library to auto reload the browser any time the server or the client changes. Running gulp will open a chrome tab with the app open, from here any changes to the .js, .css, or .ejs files in the /src directory will trigger a reload of the server or an update/reload of the client.


## Development 

### Libraries, Frameworks, and Tools used to create this app

#### React       
##### ReactDOM
#### Mongo
##### Mongoose
#### Express
##### ejs templating engine
##### bcryptjs
##### debug
##### connect-flash
##### express-session
##### express-validator
##### passport
##### passport-local
##### morgan
##### helmet
#### Node
#### Nodemon
#### Jest
#### Babel
##### babel-preset-react
##### babel-jest
#### Gulp
##### gulp-nodemon
#### Browser-sync
 
 
 ### jsx transpilation

We employed JSX to simplify the creation of our client-side react components
To use the same technique, cd into the src/public/ and npm install to get the babel dependencies working, then run this npx command in the terminal 


```bash
    npx babel --watch ./jsx --out-dir ./js/views --presets react
```  

Then the user can edit the files in public/jsx and the babel compiler will compile the files into .js any time any files in the folder are change, the compiled .js files are deposited in the /public/js/views directory

## Copyright and License

&copy; James E. Halladay & Sandip Neupane. Licensing has been done under the terms of a MIT License. See LICENSE file for details.
