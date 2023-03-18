
import React from 'react'
import { Provider } from 'react-redux'
import Weather from './Components/Weather'
import { store } from './redux/store/Store'
import './App.css'


export default function App() {
  return (
    <>
    <Provider store={store}>
      <Weather/>
    </Provider>  
    </>
  )
}

