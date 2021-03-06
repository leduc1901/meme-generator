import React from 'react';
import { BrowserRouter , Route , Switch } from "react-router-dom"
import uploadSite from "./components/uploadSite"
import editSite from "./components/editSite"
import "./App.css"
import reducer from "./reducer"
import {createStore} from "redux"
import {Provider} from 'react-redux';

let store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          
          <div className="App">
            <h1>Meme Generator</h1>
            <Switch>
              <Route path="/" exact component={uploadSite}></Route>
              <Route path={process.env.PUBLIC_URL + "/edit"}  exact component={editSite}></Route>
            </Switch>
          </div>
          
        </BrowserRouter>
    
        </Provider>
    
  );
}

export default App;
