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

const PurchaseSummary = (props) => <div className='persistent-order-summary'>
  <div className='item-a'>Subtotal</div>
  <div className='item-b'>$95.00</div>
  <div className='item-c'>Shipping</div>
  <div className='item-d'>Free</div>
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
)(PurchaseSummary)

render(
  <Provider store={store}>
    <App className='appaa' />
  </Provider>,
  target
)
