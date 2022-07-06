import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar' 

export default class App extends Component {
  pageSize = 9;

  state = {
    progress :  0
  }

  setProgress=(progress)=>{
    this.setState({progress : progress})
  }  

  render() {
    return (
      <div> 
        <Router>
            <Navbar/>
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
             
            /> 
        <Routes>
          <Route exact  path="/" key="general" element={<News setProgress={this.setProgress}  pageSize={this.pageSize} country='in' category='general'/>} />
          <Route exact  path="/business" key="business" element={<News setProgress={this.setProgress}  pageSize={this.pageSize} country='in' category='business'/>} />
          <Route exact  path="/entertainment" key="entertainment" element={<News setProgress={this.setProgress}  pageSize={this.pageSize} country='in' category='entertainment'/>} />            
          <Route exact  path="/health" key="health" element={<News setProgress={this.setProgress}  pageSize={this.pageSize} country='in' category='health'/>} />
          <Route exact  path="/science" key="science" element={<News setProgress={this.setProgress}  pageSize={this.pageSize} country='in' category='science'/>}/>
          <Route exact  path="/sports" key="sports" element={<News setProgress={this.setProgress}  pageSize={this.pageSize} country='in' category='sports'/>}/>
          <Route exact  path="/techology" key="techology" element={<News setProgress={this.setProgress}  pageSize={this.pageSize} country='in' category='techology'/>}/> 
       </Routes>
         </Router>
      </div>
    )
  }
}
