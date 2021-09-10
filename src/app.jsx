import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from '../public/logo.png';

import modules from './modules'; // All the parent knows is that it has modules ...

function App() {
//class App extends React.Component {	
//  render() {
  const [currentTab, setCurrentTab] = useState('dashboard');
   
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <ul className="App-nav noSelect">
              {modules.map(module => ( // with a name, and routes
                  <li key={module.name} className={currentTab === module.name ? 'active' : ''}>
                    <Link to={{pathname: module.routeProps.path}} onClick={() => setCurrentTab(module.name)}>{module.name}</Link>
                  </li>
              ))}
            </ul>
          </header>
          <div className="App-content">
            {modules.map(module => (
              <Route {...module.routeProps} key={module.name} params={'bar'}/>
            ))}
          </div>
        </div>
      </Router>
  );
}
//}

//ReactDOM.render(<App />, document.getElementById('root'));

export default App;

//class App extends React.Component {	
//  render() {
//    console.log("foo")
//    const [currentTab, setCurrentTab] = useState('dashboard');
//    return (
//
//    )
//  }
//}

//ReactDOM.render(<App />, document.getElementById('root'));
