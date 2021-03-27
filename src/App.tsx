import * as React  from 'react'
import Parent from './modules/Parents'


// 应用根组件
class App extends React.Component{

  render() {
    return (
      <div className='wrap'> 
        <Parent/>
        <span>11111</span>
      </div>
    )
  }
}


export default App;