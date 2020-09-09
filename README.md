<!-- Copy and paste the converted output. -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.274 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Tue Sep 08 2020 17:57:32 GMT-0700 (PDT)
* Source doc: Technical Details
* Tables are currently converted to HTML tables.
----->



# MovieRama


## Technical Details


#### <span style="text-decoration:underline;">Technologies</span>



*   HTML5 / CSS3 / Javascript (ES6+)
*   Webpack
*   Babel
*   Workbox (Service worker for creating PWAs)
*   Jest


#### <span style="text-decoration:underline;">Methodologies</span>


    <span style="text-decoration:underline;">Component-based</span>


    Each element (header, movie list, movie item, footer) of the web app has its own component using the [HtmlElement](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) interface.


    <span style="text-decoration:underline;">MVC Pattern</span>


    The UI is separated from the logic and the service needed to retrieve the data, makes easier the testing of the different aspects.


    <span style="text-decoration:underline;">Mobile-First Design</span>


    Designing the UI optimized for mobiles by the beginning resulting to have fully responsive layouts a lot easier.


    <span style="text-decoration:underline;">PWA</span>


    Making the web app progressive adds extra functionality, like



*   Can be installed as an application in mobile phones.
*   Works without an internet connection, caching HTTP requests and assets


#### <span style="text-decoration:underline;">Development Environment</span>

Webpack is used as module bundler and with babel compiler, we can bundle our  application in a single .js file ready to use in a browser using the latest (supported by babel) features of Javascript. Also, we can include loaders and plugins to the webpack configuration to add extra functionality such as importing HTML/CSS files to Javascript and generating service workers.


#### <span style="text-decoration:underline;">Deployment</span>

The deployment process is automated using [heroku](https://dashboard.heroku.com/). When a push occurs in the **heroku** branch a builder runs to build the application and serve it through a Node.JS (Express) server. The PWA can be accessed [here](https://vdrosatos-movierama.herokuapp.com/).


#### <span style="text-decoration:underline;">Instructions</span>

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

