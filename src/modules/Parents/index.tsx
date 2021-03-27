import React,{Component,Fragment} from 'react'
import Child from '../Child'

const ThemesContext = React.createContext('dark')

export {
  ThemesContext
}

class index extends Component {

  state = {
    num1 : '0'
  }

  render() {

    return (
      <div>
        <Fragment>
          <input type="text"/>
          <ThemesContext.Provider value={this.state.num1}>
          <Child />
          </ThemesContext.Provider>
        </Fragment>
      </div>
    );
  }
}

export default index;