import { Button } from 'antd';
import React, { Component } from 'react';
import Child from './child'

class Settings extends Component {
state={
    count:1,
    name:"",
    component:"",
    clickCount:0,
    clickCount1:0,
}

componentDidMount(){
    this.setState({
        count:2 
    })
 
}

getChild=(chindstate)=>{
   console.log(chindstate.name);
   console.log(chindstate.component);
    this.setState({
        name:chindstate.name,
        component:chindstate.component,
    })
}

//防抖函数
time=false;
handleOnclick=()=>{

    clearTimeout(this.time);
   this.time=setTimeout(()=>{
        this.setState({
            clickCount:this.state.clickCount+1,
        })
    },300)
 
}
//节流函数
run=true
handleOnclick1=()=>{
    if(!this.run){
         return
    }
    this.run=false
    setTimeout(()=>{
        this.setState({
            clickCount1:this.state.clickCount1+1,
        })
        this.run=true;
    },300)

 
}

    render() {
          
       
       let array1=[7,3,5,7,9];
       let array2=[1,3,5,8,12]
       let arr3=[...array1,...array2];
       //数组去重1
       let myset=new Set(arr3)
       let arr4=[...myset]
       //数组去重2
        let arr5= arr3.filter((v,k)=>arr3.indexOf(v)===k)
        //数组去重3
        let arr6=[]
        for(let i=0 ; i<arr3.length; i++){
            if(!arr6.includes(arr3[i])){
                arr6.push(arr3[i])
            }
        }
         
       
       //找出字符串中出现最多次数的元素
       let str="abbscddbbbabc"
        let times=0;
        let maxstr='';
        let strArr=str.split('')
        let strobj={}
        
        for( let i=0; i<strArr.length;i++){
               if(!strobj[strArr[i]]){
                strobj[strArr[i]]=1
               }else{
                strobj[strArr[i]]++
               }
        }
      
       for (const key in strobj) {
             if(strobj[key]>times){
                 times=strobj[key]
                 maxstr=key
             }
            
       }
    //    console.log("字符串中出现最多的元素是"+maxstr+"出现过"+times+"次");
   //数组转字符串
    let str2=strArr.toString()
    //  console.log(str2);
    //a,b,b,s,c,d,d,b,b,b,a,b,c
    let str3=strArr.toLocaleString()
    //  console.log(str3);
    let str4=strArr.join('')
    let phoneStr="15902861706"
    let mid=phoneStr.substr(3,4)
    let phone= phoneStr.replace(mid,"****")
    // console.log(phone);
    //通过闭包 找出数组区间
    let arr7=[1,2,3,4,5,6,7,8,9];

 const filterpyq=(a, b)=>{
      return (v)=>{
        return  v>=a&& v<=b;
   }
  }

    
   let arr8= arr7.filter(filterpyq(3,6))


        return (
            <div>
                <h1>我是父组件</h1>
                <div>子组件给我传值是----{this.state.name}子组件名字--{this.state.component}</div>
                <Child fn={{getcild:this.getChild}} content={this.state.count} style={{border:"1px solid #c71119"}}/>
                <Button onClick={this.handleOnclick}>防抖测试{this.state.clickCount}</Button>
                <Button onClick={this.handleOnclick1.bind(this)}>节流测试{this.state.clickCount1}</Button>
            </div>
        );
    }
}

export default Settings;