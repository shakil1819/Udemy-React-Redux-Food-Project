## JSON Server
Full fake REST API for front-end developers who need a quick back-end for prototyping and mocking.<br>
``npm install json-server --save-dev``
> + create a **db.json file** with menu data
> + start JSON Server => ``npx json-server db.json``
>    * Resources
>        - http://localhost:3000/menu
>        - http://localhost:3000/requests
>    * Home
>        - http://localhost:3000
> + if you make POST, PUT, PATCH or DELETE requests, 
> changes will be automatically and safely saved to db.json using **lowdb**

## Axios
Promise based HTTP client for the browser and node.js.<br>
``npm install axios``
> + you can import the library using import or require approach
>     - ``import axios, {isCancel, AxiosError} from 'axios';``
>     - ``import axios from 'axios';``
>     - ``const axios = require('axios');``
> + Using jsDelivr CDN (ES5 UMD browser module):
>     - ``<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>``

## cdnjs
free and open-source CDN service - makes it faster and easier to load library files on your websites


## Web Storage
**localStorage** is a property of the global object of the browser (window). It can be accessed as window.localStorage or just localStorage.<br>
> 1. in Google Chrome open DevTools (F12)
> 2. go to the **Application** tab 
> 3. in left panel you will see localStorage and sessionStorage for this domain

For each domain, your browser creates its own localStorage object, and it can only be edited or viewed on that domain.
> ``localStorage.setItem('myKey', 'myValue');``
___

## webpack

Providing the mode configuration option tells webpack to use its built-in optimizations accordingly: ``string = 'production': 'none' | 'development' | 'production'``

**Devtool** -- this option controls if and how source maps are generated.

**webpack modules** can express their dependencies in a variety of ways
+ An ES2015 import statement
+ A CommonJS require() statement
+ An AMD define and require statement
+ An @import statement inside of a css/sass/less file.
+ An image url in a stylesheet url(...) or HTML <img src=...> file.

``npx webpack``
___
## ES6 modules

**export default** can be a function, a class, an object, or something else. 
This value should be treated as the "master" value as it will be the easiest to import.
    + ``export default modal;``
    + ``export {closeModal};``
    + ``export {openModal};``
    
**import** statement is used to import references to values exported from an external module. Imported modules are in strict mode whether you declare them as such or not. For instructions to work in built-in scripts, you need to add ``type="module"`` to the script tag.
    + ``import modal from './modules/modal';``
    + ``import {openModal} from './modules/modal';``

``const modalTimerId = setTimeout( () => openModal('.modal', modalTimerId), 50000 );``

You can pass an object with a list of arguments to the function.<br>
``function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) { some code };``<br>
And then use destructuring when we call this function.<br>
```
     slider({
        container: '.offer__slider',
        slide: '.offer__slide',<br>
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
     });
 ```
___

[Babel](https://babeljs.io/) is a JavaScript compiler. 

So, what's next? [core-js](https://github.com/zloirock/core-js)

This is a polyfill of the [ES6 Promise](https://www.npmjs.com/package/es6-promise).

Provides a polyfill for [Nodelist.prototype.forEach()](https://www.npmjs.com/package/nodelist-foreach-polyfill) to all Browsers supporting ES5.

> ```javascript
> "devDependencies": {
>     "@babel/core": "^7.21.3",
>     "@babel/preset-env": "^7.20.2",
>     "babel-loader": "^9.1.2",
>     "core-js": "^3.29.1",
>     "json-server": "^0.16.1",
>     "webpack": "^5.76.2",
>     "webpack-cli": "^5.0.1"
>   }
> ```  
___

You can still find quite a few projects created using **jQuery** library.



