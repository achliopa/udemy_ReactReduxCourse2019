# Udemy Course - Modern React with Redux [2019 Update]

* [Course](https://www.udemy.com/course/react-redux/)
* [Repository](https://github.com/StephenGrider/redux-code)

## Section 1: Lets Dive In!

* create-react-app creates a boilerplate project with webpack, babel and dev server all in
* babel transforms cutting edge JS code into widely supported ES5 code
* React is based on ES2015
* a create-react-app boiler plate project contains the folders:
    * src: source code
    * public: static files
    * node_modules: project dependencies (packages)
    * package.json: config files
    * package-lock.json: records exact lib versions
    * README.md: how to use the project
* lecturer auto formats code with [Prettier](https://prettier.io/)

## Section 2: Building Content with JSX

* [Babel](babeljs.io) has a tool to convert JSX to plain JS code and HTML in 'Try it out' tab
* we see that JSX invokes React function calls under the hood `React.createElement()`
* JSX looks like HTML but is a special dialect of JS
* when we return inline JSX from a function it must be at the same line as return keyword NOT the next one
* multiline JSX ? indent and wrap in parenthesis
* HTML cannot be put into JSX snppet as is (if there are attributes)
* JSX vs HTML
    * Adding custom styling to an element uses different syntax
    * Adding a class to an element uses different systax
    * JSX can reference JS vars
* HTML inline styling: `<div style="background-color: red;"></div>`
* JSX inline styling: `<div style={{backgroundColor: "red"}}></div>`
* CSS in JSX? remove - and capitalise next char
* JSX props? use "", plain JS? "" or ''
* HTML? class JSX? className
* class is reserverd keyword in React
* we can inject JS in JSX using {} but of valid types e.g no objects (no implicit dereferencing)
* check dev console for errors

## Section 3: Communicating with Props

* React Components support:
    * Component Nesting (A component can be shown inside of another)
    * Component Reusability (components should be easily reused inside the app)
    * Component Configuration (components should be able to be configed when created)
* We will generate anew project 'components' using create-react-app to showcase React Components
* we gut out all /src content, add boilerplate index.js
```
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return <div>Hi there!</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
```
* we use [Semantic-UI](http://semantic-ui.com) CSS templates for styling and use its [minified css from cdn](https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css)
* we add the URI in /public/index.html <head> tag as ` <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />`
* we use sematic-ui class names for styling
* [Faker JS lib](https://github.com/marak/Faker.js/) helps in mockups for protyping
* we install it `npm install --save faker` import it `import faker from 'faker';` and use it `<img alt="avatar" src={faker.image.avatar()}/>`
* in JSX its important to keep code DRY
* Creating Reusable,Configurable Components
    * Indentify duplicated JSX
    * Whats its purpose of the duplicated code? give it a name
    * Add a file for the new component and name it the same as component
    * Create a new component in the file. paste duplicate JSX
    * Make it configurable adding props for what different between duplicate blobs
    * Use it
* to use a reusable component we need to export it and import it in parent file
* we should design a React component hierarchy
* Props is a system to pas data from parent to child component to customize it and config it
* pass a prop example `<CommentDetail author="Sam" />`
* use it in CommentDetail component as `this.props.author` for class components and as `props.author` in functional components assuming the props is passed as input arg 
* we will put CommentDetail in a reusable ApprovalCard component
* to pass a component as a prop into another (Child) 
```
<ParentComp>
    </ChildComp>
</ParentComp>
```
* to use it in ParentComps JSX we use `{props.children}`

## Section 4: Structuring Apps with Class-Based Components

* class Components offer state, lifecycle methods,event handling and Redux integration
* a sample app to show class components: we will get users location, determin current month, change text and styling based on combination of data
* we will use create-react-app for our sample app called 'seasons'
* we gut out src folder and add in semantic-ui minified css
* we add index.js. our app will be based on 2 components: App to determine ocation and month and SeasonDisplay to dislay conditional data
* we make the components functional at first
* to determine location we will use Geolocation API of browser ` window.navigator.geolocation.getCurrentPosition()` passing in 2 callbacks.
* first callback returns position (object with lat long) and second error object
* Sensors tool of dev console can be used to force a position on browser for testing
* geolocation fails if we decline authorization. we can reset auth by clicking on lock next to URI
* without class component and lifcycle methods we get api result (location) after JSX is rendered as it is async
* class component has a render() method and extends React.Component class
* React component state is an object containing component relevant data, updating state causes rerender
* state must be initialized at component creation
* state can be used with functional components with react hooks
* state is updated only calling 'setState' method

## Section 5: State in React Components

* state is traditionaly intialized in constructor() method. not necessary anymore
* in contructo we pass props and use `super(props)` to pass them to superclass aka React.Component
```
    constructor(props) {
        super(props);
        this.state = { lat: null };
    }
```
* we should not put async code in render() as it gets called frequently
* to update state `this.setState({lat: position.coords.latitude});` passing a new state obj
* we add errorMessage to state for error handling
* we use conditional rendering to improve display

## Section 6: Understanding Lifecycle Methods

* Component lifecycle
    * constructor() : good place to do one time setup not data loading
    * render() : here we must only return JSX
    * content is visible on screen...
    * componentDidMount() : good place to do data loading
    * wait for state updates...
    * componentDidUpdate() : good place to do more data loading when props or state changes
    * wait till component is no longer shown...
    * componentWillUnmount() : good place to clean up non react stuff
* Other lifecycle methods
    * shouldComponentUpdate()
    * getDerivedStateFromProps()
    * getSnapshotBeforeUpdate()
* if in constructor we just init state we can use this notation ` state = { lat: null, errorMessage: "" };` instead
* this line is converted to constructor with babel
* 
* we can pas state as a prop in child component `<SeasonDisplay lat={this.state.lat} />;`
* putting ternary expressions in JSX interpolated JS is valid but not best practice
* adding icons using semantic UI and string interpolation `<i className={`${icon} icon`} />`
* refactor using a config object to keep the code DRY. also we use object extrapolation
```
const seasonConfig = {
    summer: {
        text: "Let's hit the beach!",
        iconName: "sun"
    },
    winter: {
        text: "Brrr, it is chilly!",
        iconName: "snowflake"
    }
};
const { text, iconName } = seasonConfig[season];
```
* we add HTML tags in JSX for CSS styling `<i className={`icon-left massive ${iconName} icon`} />`
* we import CSS like JS `import './SeasonDisplay.css';`
* its a good practice to use CSS class name of top HTML element in a Component same as the name of the component
* i can add default props to a component as an object after the component definition
```
Spinner.defaultProps = {
  message: "Loading..."
};
```
* setInterval() is a built in JS function to set periodic events (gets a callback)

## Section 7: Handling User Input with Forms and Events

* we use the create-react-app tools to make a new project 'pics'
* we gut out \src folder
* we add a /components folder for React components
* example JS event handlers: onClick, onChange, onSubmit
* instead of passing references to our custom event handler methods we can use inline arrow functions `<input type="text" onChange={(event) => console.log(event.target.value)}/>`
* this is an uncontroled form element. we want to work with controlled elements using state
* the pattern is
```
<input 
                            type="text" 
                            value={this.state.term}
                            onChange={(e) => this.setState({term: e.target.value})}
                        />
```
* what we gain is consistency. we now at any time what the input and what the user sees without reaching out to DOM
* in React world we dont like to rely on HTML. in that way we have control i react side (preprocess, validations)
* pressing ENTER on input sublits form 'onSubmit' event
* to access state in our event handlers we need to use arrow functions as they have accss to the global object (this)
* otherwise i have to use bind in constructor `this.onFormSubmit = this.onFormSubmin.bind(this)`
* or we can use inline arrow method assignement `onSubmit={event => this.onFormSubmit(event)}` where thehandler is oldschool class method
* to pass props upstream we pass downstream callback functions as props

## Section 8: Making API Requests with React

* we will hit [unsplash API](https://unsplash.com/developers) to fetch images for the app, it returns JSON object
* React needs an AJAX client to hit backend AJAX API (axios or fetch).fetch is built in the browser, axios is 3rd party
* we use axios as its easier to use.
```
axios.get('https://api.unsplash.com/search/photos/', {
            params: {
                query: term
            },
            headers: {
                Authorization: 'Client-ID <Access key>'
            }
        });
```
* our GET request is sent twice as it is a CORS request
* axios is an async call. we use promises ans async/await to get results back
```
 async onSearchSubmit(term) {
        const response = await axios.get('https://api.unsplash.com/search/photos/',....
``` 
* a pattern is to store the async axios call result in Component state
* * always initialize arrays as []
* axios can be preconfigured with its client params
```
export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID <Access key>'
    }
});
```

## Section 9: Building Lists of Records

* map() creates a new array iterating on each element (callback does the operation)
* a pattern in Reat is to use map() on an array returning JSX from the callback
* when we render lists in React we need a unique key prop. it speeds rendering as only renders whats new 

## Section 10: Using Ref's for DOM Access

* Grid CSS is based on `<div style="display:grid">Show elements in grid style</div>`
```
.image-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
}

.image-list img {
    width: 250px;
}
```
* autofill decides how many columns to amake depending on min max boundaries
* `grid-auto-rows: 200px;` removes gaps from grid. not perfect as it overlaps. it tells how tall elements can be
* using span `grid-row-end: span 2;` allocates multiple rows to an element. cannot be uniformal
* we use JS to solve the problem using a custom React component. course of actions:
    * let the ImageCard render itself and its image
    * reach into the DOM and figure out the height of the image
    * set the image height on state to the component to rerender
    * when rendering assign a 'grid-row-end' to make sure image takes up the appropriate space
* getting image height in vanilla JS `document.querySelector('img').clientHeight`
* In React we use the ref system 'React Refs'
* React Refs:
    * gives access to a single DOM element
    * we create refs in the constructor 
    * we assign them to instance variables `this.imageRef = React.createRef();`
    * then pass to a particular JSX element as props `<img ref={this.imageRef} />`
* if we try to log img height using refs in a componentDidMount() methods we get zero. the image has not been place on screen to get a height.its too early
* we add a plain JS event listenter to fix it
```
    componentDidMount(){
        this.imageRef.current.addEventListener('load', this.setSpans);
    }
```
* our callback to calc span
```
    setSpans =() => {
        const height = this.imageRef.current.clientHeight;
        const spans = Math.ceil(height/150);
        
        this.setState({spans});
    }
```
* our use in JSX as inline css ``` <div style={{gridRowEnd: `span ${this.state.span}`}}>```
* we do css tuning setting column width to 10px and gap to 0 between colums

## Section 12: On We Go...To Redux!

* create a new copy of an array of objects adding an object element [...oldArray, newObject]
* reducer must return new state object
* we use array.filter() to remove an element from an array
* store has all reducers combined and it can  .dispatch() actions to all reducers
* we can probe the store state with `store.getState()`

## Section 13: Integrating React with Redux

* we create a new boilerplate react app called songs install redux libs and gut out src folder
* connect works on functional components as well

## Section 14: Async Actions with Redux Thunk

* we will hita backend API [JSONPlaceholderAPI](jsonplaceholder.typicode.com) much like faker. faker is built in library though
* we create-react-app called 'blog' and gut out src
* install redux-thunk,axios,redux,react-redux
* a dummy global reducer to get rid of compile errors
```
import { combineReducers } from 'redux';


export default combineReducers({
    dummy: () => 'hi there'
});
```
* setup axios
```
import axios from 'axios';

export default axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com'
});
```
* we cannot just use async/await for async action creators. we need a middleware
* connect calls dispatch on the action creator. async/await causes the creator to return the async axios call the 1st time
* we need control over when  dispatch is called so that we are sure it returns an action object
* dispatch() sends the action object to reducers and it does so FAST
* using redux middleware allows us to get the despatched action and decide when to forward it to reducers
* Redux middleware:
    * function that gets called with every action we dispatch
    * has the ability to STOP,MODIFY or manipulate actions
    * many open source middlewares
    * mostly used to deal with async actions
    * Redux-Thunk most popular
* Redux thunks allows action creators to return functions instead of action object.
* it intercepts getting the function (callback) with dispatch as argument
* if its an object it passes through.if its a function it waits it to complete and calls dispatch()
* dispatch has now an action object. it goes through thunk but because its an object it passes through to reducers
* middlewares are added to store at creation time `const store = createStore(reducers,applyMiddleware(thunk));`
* async action creator with thunk example
```
export const fetchPosts = () => {
    return async function(dispatch,getState) {
        const response = await jsonPlaceholder.get('/posts');
        
        dispatch({ type: 'FETCH_POSTS', payload: response });
    };
};
```
* ES2015 condenced equivalent
```
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response });
};
```

## Section 15: Redux Store Design

* reducers split per assets or entities in app state
* reducer:
    * cannot return undefined
    * produces new state based on current state and action
    * pure function. must rely only on its input arguments to decide
    * must not mutate input state but create new object (IT SHOULD BE AVOIDED)
* strings and numbers in JS are immutable. objects and arrays not
* === in arrays and objects fails if their mem address is not same
* if reducer returns the same state the rest of app wont be notified that state has changed
* Proper way to manipulate arrays in Reducers (without mutating)
    * Remove: `state.filter(element => element !== "hi")`
    * Add: `[...state,"hi"]`
    * Replace: `state.map(el => el === "hi" ? "bye" : el)`
* Proper way to maniputate objects in reducer without mutating
    * Update: `{...state, name: 'Sam'}`
    * Add: `{...state, age: 30 }`
    * Remove: `{...state, age: undefined}` or better use lodash `_.omit(state,'age')`
* boilerplate reducer
```
export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;
    }
};
```
* reducers are initialized as a separate action before ours
* how to show usernames og blogs based on id
    * fetch posts
    * show posts in PostList
    * each element in PostList shows UserHeader component
    * UserHeader component is given the id of user to show
    * Each userHeader attempts to fetch user based on id from API
    * when FetchUser completes (async) user is shown in UserHeader
* in mapStateToProps we can do preprocessing filtering out arrays to get an element limiting what we pass in a component
* a common practice is to implement this function in a separate file separating React from Redux
* it also can get the props of the component it will be called upon using connect
```
const mapStateToProps = (state,ownProps) => {
  return { user: state.usersfind(user => user.id === ownProps.userId)};
};
```
* we should make our code efficient avoiding repeating same fetches to backend
* we use lodash _.memoize to wrap our fetch method. what memoize does is it allows the wrapped method to be called only once for the same set of input params
* the wrapper method though returns the same result as the first time it was called for subsequent calls
* however the following code does not do the trick as it returns a function. so the async code runs again
```
export const fetchUser = _.memoize(function(id) { 
    return async function(dispatch) {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({ type: 'FETCH_USER',payload: response.data });
    };
});
```
* even if we wrap the inner async method does not solve it as the outer method is instantiated each time...
* to solve the issue and do one time calls to  backed per user with memoize we need to move the async method outside the fetch method
```
export const fetchUser = (id) => dispatch => {
    _fetchUser(id,dispatch);
};

const _fetchUser = _.memoize(async (id,dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER',payload: response.data });
});
```
* Universal solution to overfetching `findPostsAndUsers()`
    * Call `fetchPosts()`
    * Get list of Posts
    * Find all unique userids from list of posts
    * Iterate over unique id's
    * call `fetchUser()` with each id
* a good design pattern is to build small lean action creators and then combine them into complez ones
* nesting async action creators is done using dispatch ans async await to get intermediate results
* we get intermediate results using getState thunk param to acess redux state
* we then call the second action creator. to filter the ids we use lodash
```
export const fetchPostsAndUsers = () => async (dispatch,getState) => {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
};
```
* we dont need to add await as async calls will update state as they complete
* if we need use the results as it completes we can use Promise.all . in that case we need to use map() and not forEach()
```
await Promise.all(userIds.map(id=>dispatch(fetchUser(id))))
    .then(()=>getState().users)
```
* we can use chain from lodash to chain methods. we can refactor last 2 lines with
```
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
```

## Section 16: Navigation with React Router

* we will build a simple clone of twitch to allow users to record video and stream it
* the architecture simplified:
    * Streamer's computer runs OBS (Open Broadcast Software)
    * Video Stream + Stream Key goes to an RTMP (Real Time Messaging protocol) Server
    * Video Feed is sent to Viewer's browser ftom the RTMP Server
    * a separate Web server that knows which streams are currently broadcasting will offer a separate API to the Browsers Frontend App. this server will get feed from RTMP server
* if user is not logged in:
    * can view a list of all streams/channels
    * can view video for a single stream
* if a user is logged in:
    * he can create a new stream/channel
    * he can edit a stream/channel they created
    * can delete a stream/channel they created
* this is a multi app project called 'streams'
* App Challenges:
    * need to be able to navigate around separate pages in the app
    * nedd to allow users to login/logout
    * need to handle forms in redux
    * need to master CRUD opers in react/redux
    * errors will occur. proper error handling
* we generate a react boilerplate 'client' gut out \src
* use `npm install --save react-router-dom`
* React Router does not care on domain and port. its architecture:
    * BrowserRouter comp wraps Route components.
    * BrowserRouter listens to 'history' instance to keep track of changes in the search bar of our browser
    * based on the path defined in each Route it renders the specified component
    * history can be programmaticaly manipulated
* router renders based on contains rule `extractedpath.contains(path)` so we can render multiple comps in an inclusive rule. except if we use 'exact' as a Route prop
* We should not use anchor <a> tags in ReactRouter because it causes unnecessary traffic as we get all JS reloaded. so Redux state, React state all is gone. Instead we use `<Link to"path"></Link>`
* React Router ofers 3 different Routers (they differ on the part of the URL they look at to route):
    * BrowserRoute: uses everything after the TLD or port as path
    * HashRouter: uses everything after a # as path. the # is added by the app
    * MemoryRouter: does not use URL to track navigation. navigations works but URL is not used or updated
* The reason for 3 routers is deployment of app depending on server used. updating the URL can create conflicts in traditional servers as they will refetch index.html so reload the app. or even respond with 404
* a modern server (like react dev server) 1) checks dev resources 2) checks public dir 3) serves index.html => react js code in bundle.js which is linked in index.html takes care
* HashRouter works if we set webserver to ignore everything after the #
* Routing policy in steam client
    * '/' => StreamList
    * '/streams/new' => StreamCreate
    * '/streams/edit' => StreamEdit
    * '/streams/delete' => StreamDelete
    * '/streams/show' => StreamShow
* to have a component  always visible we put it in Router but over Route

## Section 17: Handling Authentication with React

* In OAuth authentication we trust a 3rd party to authorize the user for us
* OAuth is used to identify users in our app and to auth our app to make actions on behalf of user
* for google auth we can see the [list of scopes](developers.google.com/identify/protocols/googlescopes) we can authorize in our app. usually we care only to know the email
* OAuth for Servers
    * results in a 'token' that a server can use to make requests on behalf of the user
    * usually used when we have an app that needs to access user data when they are not logged in
    * difficult to setup because we need to store a lot of info about the user
* OAuth for JS Browser Apps
    * Results in a token that a browser app can use to make requests on behalf of the user
    * usually used when we have an app that needs to access user data while they are logged in
    * very easy to setup thanks to Google JS lib to automate flow
* We use google's JS lib to initiate OAuth process => Google Server => Google JS lib invokes a callback in our app passin the auth token and info about user
* Setting Up Oauth
    * Create a new project at 'console.developers.google.com'
    * Setup an OAuth confirmation screen (Project => OAuth consent screen) => Enter name => Save
    * Generate an Oauth Client ID (Crdentials => OAuth Client ID => Web Application) add Authorized JS origin (localhost:3000) => create
    * Install Google API lib, (add in index.html head <script src="https://apis.google.com/js/api.js"></script>)initilaize it with the OAuth Client ID
    * Make sure the lib is called any time the user clicks on the 'Login with Google' button
* the manual loaded google api lib offers gapi lib to the app with all sorts of methods
* we initialize it in a React Component we add with special purpose
* check [gapi documentation](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md)
* we need to get access to the auth  object using the api lib to sse if the user is signed in
```
 window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '920491680643-kthoi56udiogurfe1vqt5jg3shqfgqsv.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
            });
        });
```