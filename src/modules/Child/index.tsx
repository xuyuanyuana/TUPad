import React, { Component, Fragment } from 'react';
import Three from '../Three'

const LocalContext = React.createContext('es')

class index extends Component {

  handle =() => {
    console.log(11111)
  }
  render() {
    return (
      <Fragment>
        <input type="text"/>
        <LocalContext.Provider value='in'>
          <Three></Three>
          <button onClick={this.handle}>test</button>
        </LocalContext.Provider>
      </Fragment>
      
    );
  }
}

export default index;
export { 
  LocalContext
}
