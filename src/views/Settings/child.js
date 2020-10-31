import { Input } from 'antd';
import React, { Component } from 'react'

 class Child extends Component {
     state={
         name:"我是子组件",
         component:"child"
     }
    componentDidMount(){
      this.props.fn.getcild(this.state)
    }  
    time=false 
    handleChange=(v)=>{
        v.persist()
        clearTimeout(this.time)
        this.time=setTimeout(()=>{
            console.log(v.target.value);
        },1000)
    }
   
    render() {
        
        return (
            <div>
                <h1>我是子组件,父组件给我传的值是{this.props.content}</h1>
                <Input type="text" onChange={this.handleChange}/>
            </div>
        )
    }
}
export default Child