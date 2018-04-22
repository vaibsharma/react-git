# <img src="./images/react.png" style="width:40px !important;display:inline;margin-left:40%;float:left;margin-top:3em;"> [React-Git](https://github.com/vaibsharma/react-git) <img src="./images/git_logo.png" style="width:40px !important;float:right;display:inline;margin-top:3em;">

Version control system that dynamically save states and provide versions for react components sync with the server for mobile and web application using Javascript and CouchDB.

# Motivation

This project is based on article I read while I was learning EmberJS for bubbling action between the web-components https://dockyard.com/blog/2015/01/28/bubbling-actions-through-components. I implemented the bubbling action in a different way in Ember for a freelance project but decided to implement the same on react between the different React- components.

The idea is based upon the communication between the nested components inside the parent component for various front-end events in a smart way.

# Why is 'Git' used in the title?

When I was developing this project I got lot many applications that I could do with the bubbling action between the React components. I wanted to make a summary for status of all the variables inside a web-component so that I can get the component with the same states they were before.

These states can get change with the previous(undo) saved state of the components or if you have already changed to the previous state you can still go to the states of component from where you iterated i.e. redo action.
