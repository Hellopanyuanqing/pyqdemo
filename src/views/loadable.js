import React, { Component } from 'react';

const Loadable=({loader,loading:Loading})=>{
  return class LoadableComponent extends Component{
      state={
          loadedComponent:null
      }

   componentDidMount(){
    loader().then(res=>this.setState({
        loadedComponent:res.default
    }))
   }

   render(){
        const loadedComponent=this.state;

       return loadedComponent?<loadedComponent/>:<Loading/>
   }


  }

}

export default Loadable