import { Card, Col, Row,Typography} from 'antd';
import React, { Component ,createRef} from 'react';
import echarts from 'echarts'
import{getArticlesAmount} from '../../requests'


class index extends Component {
   constructor(){
       super()
       this.articleAmount=createRef()
   }

   initAticleChart=()=>{
       this.articleCharts=echarts.init(this.articleAmount.current)
       getArticlesAmount().then(res=>{
         
        const option = {
            xAxis: {
                type: 'category',
                data: res.amount.map(item=>item.month)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: res.amount.map(item=>item.value),
                type: 'line'
            }]
        };
    
        this.articleCharts.setOption(option);


       })

       
   }
   
   componentDidMount=()=>{
       this.initAticleChart()

   }
     getcolor=()=>{
      return '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
    }
   

    render() {
    
        return (
            <div className="gutter-box">
                   <Typography.Title level={3}>数据概览</Typography.Title>

                 <Row gutter={[16,20]}>
                      <Col className="gutter-row" md={6}>
                          <Card bordered={false} style={{backgroundColor:`${this.getcolor()}`,height:'200px'}}></Card>
                      </Col>
                      <Col className="gutter-row" md={6} >
                       <Card bordered={false} style={{backgroundColor:`${this.getcolor()}`,height:'200px'}}></Card>
                      </Col>
                      <Col className="gutter-row" md={6} >
                      <Card bordered={false} style={{backgroundColor:`${this.getcolor()}`,height:'200px'}}></Card>
                      </Col>
                      <Col className="gutter-row" md={6} >
                      <Card bordered={false} style={{backgroundColor:`${this.getcolor()}`,height:'200px'}}></Card>
                      </Col>
                 </Row>
                 <Typography.Title level={4}>最近浏览量</Typography.Title>
                <Row gutter={16}>
                     <Col className="gutter-row" md={24}>
                         <Card bordered={false}>
                              <div ref={this.articleAmount} style={{height:'400px'}}></div>
                         </Card>
                     </Col>
                </Row>
            </div>
        );
    }
}

export default index;