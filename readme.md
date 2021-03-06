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
* gapi class isSignedIn offers a prototype method called 'listen'  where we can add a callback to act when sign in status changes
* to sign in `gapi.auth2.getAuthInstance().signIn()`. the callback gets a boolean passed in that indicates the signIn status
* Integrating GAPI OAuth2 with Redux, 1st Approach:
    * GoogleAuthComponent implements 3 event handlers: onSignInClick(), onSignOutClick(), onAuthChange()
    * all 3 work on a private (local) instance of the auth class from GAPI `this.auth = window.gapi.auth2.getAuthInstance();`
    * onAuthChange() fires 2 Action Creators, signIn() and signOut() which affect the Auth State in Redux Store
    * this state is for App consumption and React render. it is in synch with ` this.auth.isSignedIn.get()`
    * it is not the best pattern but GoogleAuth is going to be reusable
* Integrating GAPI OAuth2 with Redux, 2nd Approach:
    *  Action Creators are linked to GAPI Auth2 firing async calls
    *  GoogleAuth component implements 2 event handlers: onSignInClick() and onSignOutClick()
    *  these 2 handlers trigger Action Creators trySignIn() and trySignOut() that are async and operate on GAPI
    *  1 more Action Creator changeAuth() listens to GAPI Auth2 status change and affects the Redux Auth state.
    *  this approach is clearer but does not bundle all in an reusable component

## Section 18: Redux Dev Tools

* we use [redux devtools extension](https://github.com/zalmoxisus/redux-devtools-extension) for debugging
* we need to add it as middleware in our app
```
import { createStore, applyMiddleware, compose } from 'redux';
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware())
);
```
* we can use it as a popup on any app it has it activated and  see the redux timelapse as we use the app
* when we add  `?debug_session=<some_string>` to `localhost:3000` redux tools see we try to launch a debug session
* it keeps the data during page refresh. also if i create multiple debuf gessions reux dev tools persists history for each

## Section 19: Handling Forms with [Redux Form](https://redux-form.com)

* use `npm install redux-form@8.1.0` to avoid problems. may be fixed in future
* Handling Inputs with Redux Form
    * Redux Store has a Redux Form Reducer 
    * React Component has props and handlers interactng with Redux
    * DOM input elements have a value and event listener linked to React JSX
* first 2 parts (Redux + React) are part of Redux Form and we get them 4 free
* project site has many examples
* how to add built in reducer
```
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
export default combineReducers({
     form: formReducer
});
```
* very simple redux form added to a React Component
```
import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
    renderInput({input}) {
        return <input 
            {...input}
    }

    render() {
        console.log(this.props);
        return (
            <form>
                <Field name="title" component={this.renderInput} />
                <Field name="description" component={this.renderInput} />
            </form>
        );
    }
}

export default reduxForm({
    form: 'streamCreate'
})(StreamCreate);
```
* redux form adds the connection to redux state and the component jsx that carries the logic.
* the redux form component must be passed in a render method that will add the view on which it passes the necessary props (event listeners and input values)
* instead of connect reduxForm wrapper pases in the bind object
* any props we add on the ReduxForm component are passed in the render method callback as additional formProps attributes
* reduxform has a prop for form submission   'handleSubmit'. the method we pass in as callback will get the formvalues as input
```
    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
            .................
```
* reduxform offers validation
    * form is initially rendered OR user interacts with it
    * validate function gets called with all values from the form
    * `validate(formValues)`
    * did the user enter valid inputs? 
    * yes: return an empty object, it makes redux form think our form is valid. 
    * no:return an object, for each invalid field put a key value pair on the object with the NAME of the field and an error message => redux form rerenders our component
* the validate method is outside the component class and is passed formValues
* a sample validate function
```
const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};
```
* we pass it as attribute in the reduxForm wrapper object
* the error object from validate is passed into the render method as meta. but we need to keep the name convention for input elements

## Section 20: REST-Based React Apps

* [json-server](https://www.npmjs.com/package/json-server) is a package to build mockup RESTful APIs
* REST convention (once more)
    * list all records : GET : /streams : response => array of records
    * get one particular record : GET : /streams/:id : response => single record
    * create record : POST : /streams : response => single record
    * update a record : PUT : /streams/:id : response => single record
    * delete a record : DELETE : /streams/:id : : response => nothing
* we will build the api server in a separate folder  /api an install json-server
* db.json hold the backend data to be served by the api
* start script `"start": "json-server -p 3001 -w db.json"`
* we will use axios from client in an async action creator to post on the backend api passing in formValues
* clean way to stack component wrappers
```
const formWrapped =  reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
```
* for easy retrieval based on id instead of using an array of streams objects in state we will have an object with id (index) based object elements which are the strams
* update will be so easy as `{...state,[id]: newObject}` using ES15 key intepolation
* we need to transform the array of streams returns by the backend to an object for state
* we will use lodash mapkey to do it. `mapKeys(streams, 'id)` 
* add new streams to state object `{ ...state, ..._.mapKeys(action.payload, 'id')};`
* to convert an object of key value pairs to an array `Object.values(state.streams)`
* we need to add a uid at creation to give priviledges to the creator on them.we use getState from thunk in the action creator
* we need programmatic async navigation when the api responds, we need to get a handle to the history object. any object the gets rendered in the BrowserRouter has an instance of history passed as a prop. there are 2 approaches
    * to pass history to the action creator as an argument
    * to maintain BrowserHistory in a separate file outside the Router and use a plain Router instead of BrowserRouter. then we will import and use it as we please 
* the code for the history.js file
```
import { createBrowserHistory } from 'history';
export default createBrowserHistory();
```
* we pass it as prop to Router `<Router history={history}>`
* in the submit handler after action creator call we use history to redirect `history.push('/');`
* 2 ways to communicate the id for the Edit Component
    * Selection Reducer: when a user clicks on a stream to end it. use a selectionReducer to record which stream us being edited
    * URL-based selection: put the id of the stream being edited to the URL 'streams/edit/:id'. this is supported by React Router. to pass the part of url as a prop to component
* to pass wildcards in router `<Route path="/streams/edit/:id" component={StreamEdit} />`
* wildcard is passed as a prop in `props.params.<wildcard name>` we can have multiple wildcards in the path
* getting stream from state fails when component renders first time by visiting /streams/edit/:id. because our app first loads state object is empty. if we visit / then route to edit its ok state is populated
```
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};
```
* when we use id based selection in routing each component needs to be designed to work in isolation and fetch its own data
* for code reuse we will create a StreamForm component that we will use in StreamCreate and StreamSEdit. both will pass a callback for onSubmit and Edit initialvalues as prop
* when we pass props to StreamForm component we pass them to the ReduxForm wrapper which then passes them to the React component. `initialValues` is a reserved prop to pass an object with initial values to the form
* STOP WATCHMAN FROM THROIWING ERRORS
```
echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches     && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events  && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances && \
  watchman shutdown-server
```
* formValues contains more data than we need to update. we use lodash pick `initialValues={_.pick(this.props.stream, 'title', 'description')} `
* put req to the backend causes userID to get lost from db.
    * PUT replaces all props in a record
    * PATCH replaces some props in a record

## Section 21: Using React Portals

* modal windows in react are difficutl
* all react components are childs of a div with id root.
* react portals allow us to bypass this rule
* we showcase the difficulty of custom modals with a custom modal.html file in /public
* files in /public are available in domain root
* in css z-index property allows to stack eleemtns on top of each other. default is 0
* wraping an elelement with highh z-index with an element of position: relative and z-index of 0 creates stacking css context. this compares z-index between higher element and others so it null the high index
* reacts results of deeply nested components aka html elements. its very difficult to play with classes to control a modal
* the solution is to bypass the nesting and place modal direcly under the html body. this is what portals do in react
* we add Modal.js for the component. the way to use portals is through ReactDOM using createPortal passing in JSX to return in render instead of plain JSX
* in createPortal we reference another tag to attach our JSX blob instead of #root. usually we add a div with an  id in index.html for this reason
```
const Modal = props => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                Some text
            </div>
        </div>,
        document.querySelector('#modal')
    );
}
```
* when a user clicks on the background of modal we want to dismiss it. we can use history obj to navigate to another route as modsal apears on /streams/delete. we use onCLick event
* event propagationadds the onCLick handler to child elements. to fix it we add event handler on the child element to anull it `onClick={(e) => e.stopPropagation()}`
* `React.Fragment` allows us to wrap JSX to satisfy the rule of returning or assigning single JSX elements without being rendered on screen thus satisfying styling rules
* to make it reusable we pass test and event handler callbacks as props

## Section 22: Implementing Streaming Video

* focus on StreamShow comp
* React Router DOM Switch component when wrapping Routes shows only yhe first that matches
* we will now build the RTMP server to get the streams and serve them
* in project root dir  we add a folder /rtmpserver and run `npm init`
* the RTMP server we will use is [Node-Media-Server](https://github.com/illuspas/Node-Media-Server) and implement the example (npm version (recommended))
* `npm install --save node-media-server` and add index.js where we cp
```
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();
```
* in package.json we add `"start": "node index.js"` and run `npm start` to start the server
* server accepts video from streamers in p.1935 and uses websocket to stream to client browser on p8000
* from our pc we will stream using [OBS](https://obsproject.com/) and install for linux and start it up
* we add a new scene named 'Streaming Scene' and add a source 'Screen Capture XSHM' and select the screen to use. the red border defines what we capture from screen. we also add 'Audio Capture'
* we do start / stop recording to test creating a local video. in settings we set the recording path
* we add avideo media player in StreamShow comp. in Node-Media-Server docs we see how to access the streams from browser in 'Accessing the live stream' section. HLS and DASH are more poular formats but difficult to set up. we use the easier 'http-flv' flash video using [flv.js ](https://www.npmjs.com/package/flv)
* in /client we install    `npm install --save flv.js`
* in 'StreamShow' we `import flv from 'flv.js';`
* we add a video element in jsx `<video ref={this.videoRef} style={{ width: '100%' }} controls={true} />` and set the ref in the constructor
```
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
    }
```
* flv.js gets the stream and converts it to a playable format much like axios
* in ComponentDidMount we create the player
```
       this.player =  flv.createPlayer({
            type: 'flv',
            url: 'http://localhost:8000/live/STREAM_NAME.flv'
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
```
* STREAM_NAME is defined by OBS. for cnvenience we set name as id
* current videoRef is null and throws an error. this is because we do conditional rendering so at init when we dont have the stream we dont load the <video /> so ref is not attached to video element so there is no current. we will load the player no matter what and do conditional rendering for title and name or we can conditional create the player
* we put the setup code in a helper method and call it in DidMount and DidUpdate checking if it can load or not
```
        if(this.player || !this.props.stream) {
            return;
        }
```
* in OBS we set up the connection to RTMP server running locally. in settings => stream we select custom and set
    * Stream Type : Custom Streaming Server
    * URL : rtmp://localhost/live
    * Stream key : STREAM_NAME
* i set name as strem.id (3) press start streaming. refresh show page and BOOM it works
* when we navigate away from the page (unmount) we need to tell the player to stop streaming video.
```
    componentWillUnmount() {
        this.player.destroy();
    }
```

## Section 23: The Context System with React

* Props System: Gets data from a parent component to a direct child component
* Context System: Gets data from a parent component to any nested child component
* we will showcase the COntext system with an app that offers 2 languages english and dutch
* the component hierarchy: App => UserCreate => Field,Button. Context will be used to communicate language property, as UserCreate doesnt care about it.
* we generate a new project `create-react-app translate`
* we will add a context object that acts as a pipe
* To get info in the Context:
    * set default value when context is created
    * In parent component add a Provider component that will push info in the Context
* To get info out of the Context
    * reference this.context in the nested child component
    * create a Consumer componet in the nested child component
* we add /context folder and 'LanguageContext.js'
```
import React from 'react';
export default React.createContext('english');
```
* we pass in the default value as param at creation
* we import LanguageContext in Button
* we setup contextType property in Button class component `static contextType = LanguageContext;` this is a class attribute so any instance of Button has it. is equivalent to `Button.contextType = LanguageContext`
* `this.context` returns the default value 'english'
* we need a way to change the value in context so that its useful. we will use the Provider component to do so from App
* we import the LanguageContext in App and pass the language selection as value in the COntext object to be used down the nested tree with
```
 <LanguageContext.Provider value={this.state.language}>
                <UserCreate />
               </LanguageContext.Provider>
```
* Context object has a Provider attribute. the value prop will be used to update the context
* the App with context lifecycle (steps 3-6 repeat on each state change):
    * Application loads up in the browser
    * we create a context object with a default value of 'english'
    * app components gets rendered, creates a Provider that wraps UserCreate
    * Provider updates the value of the context  object to 'this.state.language'
    * Button and Field reach into context object, see the value from 'this.state.language'
    * Button and Field render appropriate text to the screen
* Each separate use of LanguageContext.Provider creates a new separate 'pipe' of information
* If we dont wrap with Provider the child componets that use context will use only the default value
* instead of using  this.context and static ContextType components down the tree can use the Consumer react component of context to use the values of the pipe
* we see the way to use the consumer
```
class Button extends React.Component {
    renderSubmit(value) {
    return value === 'english' ? 'Submit' : 'Voorleggen';
    }

    render() {

        return (
            <button className="ui button primary">
                <LanguageContext.Consumer>
                {(value) => this.renderSubmit(value)}
                </LanguageContext.Consumer>
            </button>
        );
    }
}
```
* we wrap a callback to be called at each context velue update
* consumer is useful when we want to consume multiple contexts in a component
* consuming multiple context
```
            <ColorContext.Consumer>
            {(value) => 
                    <button className={`ui button ${value}`}>
                        <LanguageContext.Consumer>
                            {(value) => this.renderSubmit(value)}
                        </LanguageContext.Consumer>
                    </button>
            }
            </ColorContext.Consumer>
```
* it has to wrap a method so we return JSX
* provideing multiple context
```
               <LanguageContext.Provider value={this.state.language}>
               <ColorContext.Provider value='red'>
                <UserCreate />
               </ColorContext.Provider> 
               </LanguageContext.Provider>
```

## Section 24: Replacing Redux with Context

* Redux vs Context
    * Redux: Distributes data to various components, centralizes data with store, provides mechanism for changing data in the store
    * Context: Distributes data to various components
* we will extract language selector as a different component to attempt replace redux with context
* if we want to use Context in place of Redux
    * we need to be able to get data to any component in our hierarchy (ok)
    * we need to be able to separate our view logic from business logic (implement a store like Component for logic)
    * we need to be able to split up business logic (not to have a single file with 10000 line sof code)
* store is implemented as a HOC
```
import React from 'react';

const Context = React.createContext('dutch');

export class LanguageStore extends React.Component {
    state = { language: 'english' };

    onLanguageChange = (language) => {
        this.setState({ language });
    }

    render() {
        return (
            <Context.Provider value={{ ...this.state, onLanguageChange }} >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default Context;
```
* Redux: excellend documents, well-known design patterns, a lot of open source libs
* Context: no need for extra lib, hard to build a store component with cross cutting concepts

## Section 25: Hooks with Functional Components

* With React Hool system Function based components can have state and (kind off) lifecycle methods
* Why bother? Hooks makes it easy to share logic between components
* we create a new react project 'hooks-simple' and gut out src
* our App will host 2 buttons, depending onthe click event the content of a child ResourceList component will change
* we refactor class component App with state into functional
* The [Hook](https://reactjs.org/docs/hooks-intro.html) system in React offers various hooks such as:
    * `useState()` : Allow a functional component to use a component level state
    * `useEffect()` : Allow a functional component to use 'lifecycle' methods
    * `useContext()` : Allow a functional component to use the Context system
    * `useRef()` : Allow a functional component to use the ref system
    * `useReducer()` : Allow a functional component to store data through a reducer
* we import the hooks from react `import React, { useState } from 'react';`
* the refactored App w/state useing hooks
```
const App = () => {
    const [ resource, setResource ] = useState('posts');
    return (
        <div>
            <div>
                <button onClick={() => setResource('posts')}>Posts</button>
                <button onClick={() => setResource('todos') }>Todos</button>
            </div>
            {resource}
        </div>
    );
}
```
* we set the state prop using useState passing an init value creating a prop and setter
* we alter the state val with the setter and get it referencing the prop
* the way to get the setter and prop outs of the hooks method is 'array destructuring' `const [ resource, setResource ] = useState('posts');`
* the setter causes a rerender
* we can call useState() multiple times to add multiple attributes to state
* we add ResourceList as class based componet passing the parent comp state as prop
* we will fetch ResourceList content from jsonplaceholder dummy backend. we install axios
* we will fetch content at mount time (lifecycle method)
```
    async componentDidMount() {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/${this.props.resource}`);
        
        this.setState({ resources: response.data });
    }
```
* we store the returned list in state.
* button has no effect as fetch is done at mount time. 
* we need to repeat the code in componentDidUpdate() to trigger at update. props change trigger update
* if we fetch backend at coponentDidUpdatewe flood backend with requests. this is because its a deadlock.
* if we mod state in update triggers update and so on
* the solution is to get prevProps in and compare it with current props. if they are the same we dont run async code
```
    async componentDidUpdate(prevProps) {
        if(prevProps.resource !== this.props.resource) {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/${this.props.resource}`);
            this.setState({ resources: response.data });
        }
    }
```
* we refactor clas comp into func comp
* this comp will use useState and useEffect hooks
* useEffec() combines componentDidMount() and componentDidUpdate(). it runs when component first mounts and when it updates the collback  passed in runs
```
    useEffect(()=> {
        fetchResource(resource);
    },[]);
```
* the code above is equivalent to componentDidMount. it does not rerun
```
    useEffect(()=> {
        fetchResource(resource);
    },[resource]);
```
* the code above works well it reruns on update. how come??? when the second argument of useEffect() changes the callback runs
* if we dont pass a second argument the callback is called all the time (deadlock)
* with empty array as second arg its called once like componentDidMount(). same as if the second param is a constant unchanged
* if we pass an object literal the callback is recalled as it is like a state object in redux. a new copy not the same
* i cannot pass an async method as callback. useEffect function must return a cleanup function or nothing. we must use a second wrapper method. or a direct empty arrow method
```
    useEffect(()=> {
        (async (resource) => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);

            setResources(response.data);
        })(resource);
    },[resource]);
```
* in this way we define a function and call it right away
* with hooks its easy to share logic between components
* our ResourceList component if we think it as blackbox gets a prop and outputs an array
* we will try to extract all hook coe in a separate reusable method
```
const useResources = (resource) => {
    const [resources, setResources] = useState([]);
    useEffect(() => {
        (async (resource) => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);

            setResources(response.data);
        })(resource);
    }, [resource]);

    return resources;
};
```
* we use it in the react component separating view from controller
```
const ResourceList = ({ resource }) => {
    const resources = useResources(resource);

    return (
        <ul>
            {resources.map(record=><li key={record.id}>{record.title}</li>)}
        </ul>
    );
}
```
* we put hooks in a separate file and use it in a new functional component showing how easy it is to reuse the logic

## Section 26: More Fun with Hooks

* the convention is to returns arrays from hooks logic wrapper fuanctions not objects
* we refactor seasons app to use Hooks 