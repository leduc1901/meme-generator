import React from 'react';
import { BrowserRouter , Route , Switch, Link } from "react-router-dom"
import uploadSite from "./components/uploadSite"
import editSite from "./components/editSite"
import "./App.css"
import reducer from "./reducer"
import {createStore} from "redux"
import {Provider} from 'react-redux';

let store = createStore(reducer)

function App() {
  return (
    
        <BrowserRouter >
          <Provider store={store}>
          <div className="App">
            <h1>Meme Generator</h1>
            <Switch>
              <Route path="/" exact component={uploadSite}></Route>
              <Route path="/edit" exact component={editSite}></Route>
            </Switch>
          </div>
          </Provider>
        </BrowserRouter>
    
    
    
  );
}

export default App;
