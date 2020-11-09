# Angular
[Angular](angular.io) is owned by google. It uses TypeScript, HTML and any styling language you want (Sass, CSS, less, etc)

# Requirements
Here is a list of things you will need to develop with angular:
* [NodeJS](https://nodejs.org/en/) and NPM (v8+)
* Web Browser

# Setup and Installation
The best way to get setup with angular is to install the angular CLI globally to get the "ng" command. This can be done by running the following command:
```
npm install -g @angular/cli
```

Once installed you will be able to run any of the "ng" commands. You can find the documentation [here](https://cli.angular.io/).

To get setup with a new angular project you can run the following command:
```
ng new <project-name>
```
This command will create the new project in the current directory and it will install all of the NPM dependencies. You can also specify a few options to customize your experience with Angular. 

## My setup
Here is the command that I ran for this tutorial project:

```
ng new yauift --skipTests=true --skipGit=true --routing=true --style=scss
```
This will create a directory called "yauift", and then the angular project inside of it. It will automatically install all npm dependencies. As you can see, I specified some extra flags, here is a description of what those specific ones do:
* `--skipTests=true` this skips adding the end to end tests for each component created. You should not normally do this, I did it to avoid confusion in my examples.
* `--skipGit=true` this skips initializing a git repo. I did this because this project lives in a sub-directory of a git repo already.
* `--routing=true` this enables and adds Angular default routing module to the project
* `--style=scss` this enables scss styling for the Angular project. SCSS is my prefered styling language.

