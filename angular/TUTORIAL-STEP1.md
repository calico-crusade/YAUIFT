# Running
To run any default angular application, you can execute the `npm run start` command that is added the package.json file. This will start a development server that will serve your angular application locally. This is normally setup to listen to: http://localhost:4200

# Where to Start
The primary file for any angular application is the `app.module.ts` file. This will tell you what component is being bootstraped. For this project the `app.component.ts` component is being bootstraped so that is the starting point for our application.

There are a lot of files created when starting with an angular application. So here is a description of a few of the default files created in the root project folder:
* `package.json` - This file defines all of the dependencies for your application. These are resolved against Node's Package Manager (npm)
* `tsconfig.*.json` - any file that follows this scheme is defining how TypeScript will compile and work. The primary file of note here is the `tsconfig.json` as this is the starting point for any configs.
* `angular.json` - This file defines how our angular application will build and compile. Most of the time you shouldn't need to touch this file. However, it can be useful for including outside scripts and styles in the "build.options" portion of the file. You can read more about this file [here](https://angular.io/guide/workspace-config)
* `karma.conf.js` - This file is the entry point for the end to end (e2e) tests that can be created for you application.
* `.browserslistrc` - This file defines what browsers your application should support
* `.editorconfig` - This file defines default configurations for your application. I change these, as I'm a fan of 4 space tab indents.
* `tslint.json` - This file lists default development styles for your application that you can "lint". You can read more about linting on the [ESLint](https://eslint.org/) site.

There are also a few directories that need to be noted as well:
* `e2e\` - This folder contains the bootstrap files for your e2e tests.
* `src\` - This folder is where your applications source files will live.

## Source files
All of your applications source files can be found under the `src` directory in your projects root. There are also quite a few default files generated to get our application setup. Here is an overview of the important ones:
* `index.html` - This is the base template for the primary html file for our application. This is automatically modified by angular when our application compiles, so you shouldn't need to edit much in this file.
* `main.ts` - This is the entry point for our application. This is where our angular application starts. You also shouldn't need to modify this file all that much, if at all.
* `polyfills.ts` - I would suggest just reading the comments at the top of this file to understand what it does.
* `styles.scss` - This or a file like it (changes depending on the style language you chose) is the root styles file for your application. Any style here will be available to your entire application.
* `test.ts` - I would suggest just reading the comments at the top of this file to understand what it does.
* `environments\` - I would suggest reading the comments in the files in this folder. These files determine environment variables for you application.
* `app\app-routing.module.ts` - This file describes all of the SPA routes for your application.
* `app\app.component.ts` - This file contains the default component for your application, everything starts here.
* `app\app.component.scss` - This file contains the styles for your app.component
* `app\app.component.html` - This file contains the HTML for your app.component
* `app\app.module.ts` - This is the primary module for your entire application, all of your component declarations will be automatically added to this file.
