# MovieRama


### Technical Details


#### <span style="text-decoration:underline;">Technologies</span>



*   HTML5 / CSS3 / Javascript (ES6+)
*   Webpack
*   Babel
*   Workbox (Service worker for creating PWAs)
*   Jest


#### Methodologies

Component-based
Each element (header, movie list, movie item, footer) of the web app has its own component using the [HtmlElement](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) interface.

<ins>MVC Pattern<ins>

The UI is separated from the logic and the service needed to retrieve the data, makes easier the testing of the different aspects.

<ins>Mobile-First Design<ins>

Designing the UI optimized for mobiles by the beginning resulting to have fully responsive layouts a lot easier.

<ins>PWA<ins>

Making the web app progressive adds extra functionality, like

*   Can be installed as an application in mobile phones.
*   Works without an internet connection, caching HTTP requests and assets


#### Development Environment

Webpack is used as module bundler and with babel compiler, we can bundle our  application in a single .js file ready to use in a browser using the latest (supported by babel) features of Javascript. Also, we can include loaders and plugins to the webpack configuration to add extra functionality such as importing HTML/CSS files to Javascript and generating service workers.


#### Deployment

The deployment process is automated using [heroku](https://dashboard.heroku.com/). When a push occurs in the **heroku** branch a builder runs to build the application and serve it through a Node.JS (Express) server. The PWA can be accessed [here](https://vdrosatos-movierama.herokuapp.com/).


### Instructions

Install the npm packages


```
npm install
```


Run the tests


```
npm test
```


Run the application in development mode (served by webpack in-memory server)


```
npm run dev
```


Run the application in development mode (served by http-dist file server)


```
npm start
```


Run the application in production mode 


```
npm run start:prod
```

