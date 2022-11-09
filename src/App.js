import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './App.scss'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="content" style={{ maxWidth: '1000px', margin: 'auto' }} >
          <div className="title" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 30px' }}>
            <div>
              <FontAwesomeIcon icon={'bars'} style={{ fontSize: '24pt' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div>MyENV</div>
              <span style={{ marginRight: '.3rem' }}>Current Location</span>
              <FontAwesomeIcon icon={'caret-down'} />
            </div>
            <div>
              <FontAwesomeIcon icon={'bell'} style={{ fontSize: '24pt' }} />
            </div>
          </div>
          <div className="detail" style={{ padding: '80px 0 100px', display: 'flex', gap: "1rem", alignItems: 'center', justifyContent: 'center' }}>
            <div><FontAwesomeIcon icon={'cloud'} style={{ fontSize: '50pt', transform: 'rotateY(180deg)' }} /></div>
            <div>
              <div style={{ fontSize: '25pt', fontWeight: '777' }}>Cloudy</div>
              <div style={{ display: 'inline', fontWeight: 'bold', marginRight: '3rem', fontSize: '15pt' }}><FontAwesomeIcon icon={'temperature-three-quarters'} /> 29°C</div>
              <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '15pt' }}><FontAwesomeIcon icon={'droplet'} /> 27%</div>
            </div>
          </div>
          <div className="add" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ maxWidth: '100px', width: '25%', backgroundImage: "linear-gradient(#70b9ff,#fff)", backgroundRepeat: 'no-repeat', backgroundSize: '1px 100%', backgroundPositionX: 'right', padding: '10px 0' }}>
              <div>PSI</div>
              <div style={{ background: '#1ae863', borderRadius: '5px', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '0 5px', width: '40px', height: '36px' }}>23</div>
              <div>Good</div>
            </div>
            <div style={{ maxWidth: '100px', width: '25%', backgroundImage: "linear-gradient(#70b9ff,#fff)", backgroundRepeat: 'no-repeat', backgroundSize: '1px 100%', backgroundPositionX: 'right', padding: '10px 0' }}>
              <div>RAIN</div>
              <div style={{ padding: '0 5px', margin: '5px' }}>0</div>
              <div>mm</div>
            </div>
            <div style={{ maxWidth: '100px', width: '25%', backgroundImage: "linear-gradient(#70b9ff,#fff)", backgroundRepeat: 'no-repeat', backgroundSize: '1px 100%', backgroundPositionX: 'right', padding: '10px 0' }}>
              <div >DENGUE</div>
              <div style={{ width: '50px', height: '50px', border: '1px solid white', borderRadius: '50%', margin: '8px auto auto' }}></div>
            </div>
            <div style={{ maxWidth: '100px', width: '25%', padding: '10px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <FontAwesomeIcon icon='plus' style={{ fontSize: '25pt' }} />
              <div>Add</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
