import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './App.scss'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <div className="title">
            <div>
              <FontAwesomeIcon icon={'bars'} className='icon-bars' />
            </div>
            <div>
              <div>MyENV</div>
              <span>Current Location <FontAwesomeIcon icon={'caret-down'} /></span>
            </div>
            <div>
              <FontAwesomeIcon icon={'bell'} className='icon-bell' />
            </div>
          </div>
          <div className="detail">
            <div>
              <FontAwesomeIcon icon={'cloud'} className='icon-cloud' />
            </div>
            <div>
              <div className="name">Cloudy</div>
              <div className="temperature">
                <FontAwesomeIcon icon={'temperature-three-quarters'} /> 29°C
              </div>
              <div className="droplet">
                <FontAwesomeIcon icon={'droplet'} /> 27%
              </div>
            </div>
          </div>
          <div className="add">
            <div className="item break">
              <div>PSI</div>
              <div className="number-psi">23</div>
              <div>Good</div>
            </div>
            <div className="item break">
              <div>RAIN</div>
              <div className="number-rain">0</div>
              <div>mm</div>
            </div>
            <div className="item break">
              <div >DENGUE</div>
              <div className="number-dengue"></div>
            </div>
            <div className="item center-height">
              <FontAwesomeIcon icon='plus' className="icon-plus" />
              <div>Add</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
