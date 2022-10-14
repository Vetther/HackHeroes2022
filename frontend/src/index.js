import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import Geocode from './Geocode'
import {Alert} from "react-daisyui";

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <><Router>

        <Alert status="success" style={{marginTop: 15, marginBottom: 15, width: "auto"}}>
            Testowy status biblioteki React.js DaisyUI
        </Alert>

        {/*<Geocode />*/}
        <App/>

    </Router></>
)
