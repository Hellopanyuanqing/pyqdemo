import { Button, Card, Table, Tag ,Modal,Typography,message,Tooltip} from 'antd';
import React, { Component } from 'react';
import { getArticles ,deleteArticles} from '../../requests'
import XLSX from 'xlsx'
const ButtonGroup=Button.Group
  
const titleDisplayMap={
  id:'id',
  title:'标题',
  author:'作者',
  amount:'阅读数量'
}

class ArticleList extends Component {

   constructor(){
     super()
     this.state={
      columns:[],
      dataSource:[],
      total:0,
      isLoading:false,
      ofset:0,
      limitd:10,
      deleteModalcontent:null,
      Modalisvisible:false,
      deleteArticleConfirmLoading:false,
      deleteArticleId:null,
     }
   }

createColums=(columnKeys)=>{

   const columns=columnKeys.map(item=>{
    if (item==='amount'){
      return{
        title:titleDisplayMap[item],
        key:item,
        render:(text,record)=>{
          const {amount}=record
        return <Tooltip title="红色表示大于230,,绿色小于230"><Tag color={amount>230 ? 'red' : 'green' }>{amount}</Tag></Tooltip>

        }
      }

    }
    return{
      title:titleDisplayMap[item],
      dataIndex:item,
      key:item
    }
  })
  columns.push({
    title:'操作',
    key:'action',
    render:(text,record)=>{
      return <ButtonGroup>
          <Button size="small" type='primary' onClick={this.toEdit.bind(this,record.id)}>编辑</Button>
          <Button size="small" type='danger' onClick={this.deleteArticle.bind(this,record)}>删除</Button>
      </ButtonGroup>
    }
  })

  return columns;

}
toEdit=(id)=>{
  this.props.history.push(`/admin/article/edit/${id}`)

  
}

onDeteleArticle=()=>{

  this.setState({
    deleteArticleConfirmLoading:true
  })
  deleteArticles(this.state.deleteArticleId).then(res=>{
    message.success(res.msg)
       
     this.setState({ofset:0},()=>{
      this.getData();
     })

  }).catch(err=>{
     //处理错误
  }).finally(()=>{
    this.setState({
      Modalisvisible:false,
      deleteArticleConfirmLoading:false,

    })


  })

}
//隐藏modal
onHideModal=()=>{
  this.setState({
    deleteModalcontent:null,
    Modalisvisible:false,
    deleteArticleConfirmLoading:false,
    deleteArticleId:null,
  })
}
//展示modal
deleteArticle=(record)=>{
  // Modal.confirm({
  //    title:<Typography>确认要删除{record.title}</Typography>,
  //    content:'此操作不可逆',
  //    okText:"别墨迹，赶紧删！",
  //    cancelText:'我点错了！',
  //    visible:this.state.Modalisvisible,
  //    confirmLoading:true,
  //    onOk:()=>{
  //      console.log('删除了')
  //    }
  //  })

   this.setState({
    Modalisvisible:true,
    deleteModalcontent:`确认要删除${record.title}`,
    deleteArticleId:record.id
   })


}
//导出Excel
toExcel=()=>{
//组合数据
const data=[Object.keys(this.state.dataSource[0])]
 for(let i=0; i<this.state.dataSource.length; i++){
      data.push(Object.values(this.state.dataSource[i]))    
 }
 /* convert state to workbook */
 const ws = XLSX.utils.aoa_to_sheet(data);
 const wb = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
 /* generate XLSX file and send to client */
 XLSX.writeFile(wb, "sheetjs.xlsx")
}
pageOnChange=(page, pageSize)=>{
   this.setState({
     ofset:pageSize*(page-1),
     limitd:pageSize
   },()=>{
     this.getData()
   })
}
onShowSizeChange=(current, size)=>{
  this.setState({
    ofset:0,
    limitd:size
  },()=>{
    this.getData()
  })
}
getData=()=>{
     this.setState({isLoading:true})
    getArticles(this.state.ofset,this.state.limitd).then(res=>{
       const columnKeys=Object.keys(res.list[0])
       const columns=this.createColums(columnKeys)
       //如果组件已经销毁就不需要去setState
     if(!this.updater.isMounted(this)) return
      this.setState({
        total:res.total,hideOnSingPage:true,
        columns,
        dataSource:res.list

     })
 })
  .catch(err=>{

    //处理错误！
  })
  .finally(()=>{
    if(!this.updater.isMounted(this)) return
    this.setState({
      isLoading:false
    })
  })


   }
  componentDidMount(){
    this.getData();
    
  }
    componentWillUnmount(){
      
    }
    render() {
        return (
            <Card bordered={false} extra={<Button type='primary' onClick={this.toExcel}>导出Excel</Button>}>
                 <Table 
                 loading={this.state.isLoading}
                  rowKey={record=>record.id} 
                  dataSource={this.state.dataSource} 
                  columns={this.state.columns}
                   pagination={{
                    current:this.state.ofset/this.state.limitd+1,
                     total:this.state.total,
                     onChange:this.pageOnChange,
                     showQuickJumper:true,
                     showSizeChanger:true,
                     onShowSizeChange:this.onShowSizeChange,
                     pageSizeOptions:[10, 20, 30,40]
                  }}
                   />

                   <Modal
                    title="确认要删除"
                    visible={this.state.Modalisvisible}
                    okText="确定删除吗"
                    cancelText="我点错了"
                    confirmLoading={this.state.deleteArticleConfirmLoading}
                    onOk={this.onDeteleArticle}
                    onCancel={this.onHideModal}
                    maskClosable={false}
                   >
                     <Typography>{this.state.deleteModalcontent}</Typography>
                   </Modal>
                      


                   
            </Card>
        );
    }
}

export default ArticleList;