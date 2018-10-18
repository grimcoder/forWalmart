import React from 'react'
import { render } from 'react-dom'

import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, bindActionCreators } from 'redux';

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')

const INCREMENT_COUNTER = 'increment_counter'
const DECREMENT_COUNTER = 'decrement_counter'

let countersReducer = function (state = 0, action) {
  switch (action.type) {

    case DECREMENT_COUNTER:
      state = state - 1;
      return state;
    case INCREMENT_COUNTER:
      state = state + 1;
      return state;
    default:
      return state;
  }
}

const initialState = { counter: 0 };

const rootReducer = combineReducers({
  counter: countersReducer
});

let store = createStore(rootReducer, initialState);

const increment = () => ({ type: INCREMENT_COUNTER })
const decrement = () => ({ type: DECREMENT_COUNTER })

const Board = (props) => <div>
  <div>Counter: {props.counter}</div>
  <button onClick={props.increment}>Increment</button>
  <button onClick={props.decrement}>Decrement</button>
</div>

const App = connect(
  state => ({ counter: state.counter, state }),

  dispatch =>
    bindActionCreators(
      {
        increment,
        decrement
      },
      dispatch
    )
)(Board)

render(
  <Provider store={store}>
    <App className='app' />
  </Provider>,
  target
)
