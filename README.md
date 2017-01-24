# Misofome

## Description
For a project at the AUAS, we we’re asked to redesign an app which was made to fit the needs of a particular group of patients of anxiety disorders. The app was build up using a React-Redux-Node-MongoDB stack, which uses material-ui for it’s UI and Mongoose as a DBMS. The api was made to be as loosely coupled from the app as possible, which resulted in a separated Mongoose schema folder which enables future developers on the project to easily modify the erb, without having to tinker in the back-end logic.

The project was based on the original implementations of [Emiel Zuurbier](http://misofo.me) and [Mohammed Kareem Belahmar](http://146.185.140.228).


## Installation

### Requirements:
- Node.JS (preferably a recent version)
- [MongoDB](https://www.mongodb.com) running locally

Clone this repo (or download as zip) and install all dependencies with `npm install`. The postinstall script will handle the installation and compilation of the two enclosed projects (api and webapp).

## Usage
This project can be run in multiple ways. The webapp and api compartments are separate from each other and can be run individually by changing into the directory and running `STANDALONE=true npm start` for production mode or `STANDALONE=true npm run dev` for development mode. I you wan't to start both the webapp and the api, run `npm start` in the project root directory. The project as a whole can be started with auto-restarting of the back-end and hot module replacement for the React app with `npm run dev`.

### Production vs development
Starting the app in production mode will optimize the front-end bundles and decrease the amount of logging that's done. Development mode will auto-reload and build all code and will even update the webapp with hot module replacement. The logging is way more verbose.


## Editing the code
The api can be run standalone. The webapp can technically run by itself, but makes requests to local endpoints which correspond to the api. It'll probably error out when opening the app in the browser while running in standalone mode.

It was made this to be able to edit the webapp without having to worry about the api and vice versa.

The different endpoints and usage of the api is detailed in the docs folder in this repo. In these docs, you'll also find instructions on how to edit the erb.

## Credits:

Original implementation of the webapp (2014-2015):
- Emiel Zuurbier
- Sjoerd Roders
- Jelle Bot

Original implementation of working back-end (2015-2016):
- Mohammed Kareem Belahmar

Current version (API v2.0.0, APP v3.0.0) (2016-2017):
- Rijk van Zanten
- Anne Wouters
- Vera van der Pennen
