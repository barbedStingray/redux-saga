import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Step 1 - Saga imports 
import createSagaMiddleware from 'redux-saga';
// put is equivalent to dispatch
import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';


const elementList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};    

// Step 2 - Create Saga
// sagas are generator functions
function* fetchElements() {
    // this code is the same as your previous axios requests
    try {
        // try everything, if no errors, then we're good
        const response = yield axios.get('/api/element');
        // yield will wait for response to have a value, no need for .then()
        
        // dispatch an action
        // make sure type is different than the saga action type
        const action = { type: 'SET_ELEMENTS', payload: response.data};
        put(action);
        // put = dispatch

    } catch (error) {
        // if any erros occur, catch triggered
        console.log('error fetching elements', error);
        alert(`something wen't wrong`);

    }
}

function* postElement(action) {
    try {
        // replacing the axios POST request

        // sends info to server
        yield axios.post('/api/element', action.payload);

        // updates list of elements
        yield put({ type: 'FETCH_ELEMENTS' });

    } catch (error) {
        console.log(`error posting element`, error);
        alert(`something went wrong`);

    }
}

const planets = (state = [], action) => {
    if(action.type === 'SET_PLANETS') {
        return action.payload;
    }
    return state;
}

const jokeData = (state = [], action) => {
    if(action.type === 'TELL_JOKE') {
        return action.payload;
    }
    return state;
} 

// USING AN API

function* getPlanets() {
    try {
        const response = yield axios.get('https://swapi.dev/api/planets/');
        console.log(`response:`, response.data.results);
        yield put({ type: 'SET_PLANETS', payload: response.data.results })

    } catch (error) {
        console.log(`getPlanets error`, error);
        alert(`get planets went wrong!`);
    }
}

function* tellAJoke() {
    try {
        const response = yield axios.get('https://v2.jokeapi.dev/joke/Any');
        console.log(`JOKE DATA response:`, response.data);
        yield put({ type: 'TELL_JOKE', payload: response.data });

    } catch (error) {
        console.log(`error in telling jokes`, error);
        alert(`getting jokes went wrong`);
    }
}

// Step 3 - collect your sagas
// this is the saga that will watch for actions
// combines all of the sagas
function* rootSaga() {
    // add all your sagas here
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
    // this is the name that needs to be different than the saga
    yield takeEvery('ADD_ELEMENT', postElement);

    yield takeLatest('FETCH_PLANETS', getPlanets);

    yield takeLatest( 'TELL_A_JOKE', tellAJoke);
}


const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementList,
        planets,
        jokeData
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
