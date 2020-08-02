import React, { Component } from "react";
import { Table, Tag, Button, Modal, Form, Input, Radio, message } from 'antd'
import { get } from "@/api/ajax";

class MainTable extends Component {
  state = {
    searchForm: {
      pageNum: 1,
      pageSize: 10,
      name: ''
    },
    loading: false,
    list: [],
    total: 0
  }
  
  componentDidMount() {
    this.queryList()
  }
  
  /** 查询表格数据 */
  queryList = () => {
    this.setState({ loading: true },() => {
      get('/paper/paperList', this.state.searchForm)
        .then(body => {
          const { list, total } = body
          this.setState({ list, total })
        })
        .finally(() =>{
          this.setState({ loading: false })
        })
    })

  }
  /** 表格分页等变动的回调 */
  onTableChange = ({current: pageNum, pageSize}) => {
    this.setState({ 
      searchForm: {
        ...this.state.searchForm, pageNum, pageSize
      }
     }, () => {
      this.queryList()
    })
  }
  
  render () {
    const columns = [
      { title: '考试名称', dataIndex: 'name' },
      { title: '已考次数', dataIndex: 'realNum',  width: '80px' },
      { 
        title: '状态', 
        dataIndex: 'usingState', 
        width: 150,
        render: state => state === 1
           ? (<>
              <Tag color="green">已发布</Tag>
              <Button type="danger" size="small">取消</Button>
             </>)
           : (<>
              <Tag color="red">未发布</Tag>
              <Button type="primary" size="small">发布</Button>
            </>)
      },
      { title: '分类', dataIndex: 'classifyName',  width: 120 },
      { title: '试卷类型', dataIndex: 'paperType',  width: 100, render: type => type === 1 ? '公开试卷' : '非公开试卷' },
      { title: '出题类型', dataIndex: 'generateType',  width: 80, render: type => type === 1 ? '固定试卷' : '随机试卷' },
      { title: '创建时间', dataIndex: 'createTime',  width: 160 },
      { title: '创建人', dataIndex: 'creatorName',  width: 100 },
      { 
        title: '操作', 
        key: 'action',
        fixed: 'right', 
        width: 100,
        render: (text,record) => (
          <span>
            <Button type="primary" size="small" icon="edit" onClick={ this.props.onClickEdit.bind(this, record) }>编辑</Button>
          </span>
        ) 
      },
    
    ]
    return (
      <Table 
        dataSource={this.state.list}
        columns= {columns}
        rowKey="id" 
        size="small"
        loading={this.state.loading}
        pagination= {{
          total: this.state.total
        }}
        onChange= {this.onTableChange}
      />
    )
  }

}

const ModalEditForm = Form.create()(props => {
  const { visible, formData, form, onCancel } = props
  const { getFieldDecorator } = form

  const saveForm = () => {
    form.validateFields((err, values) => {
      if(!err) {
        message.success('校验成功，正在提交。。。')
        console.log(values)

      }

    })
  }
  return (
    <Modal visible={visible} title={formData.id ? "编辑试卷" : '创建试卷'} okText='保存' onOk={saveForm} onCancel={onCancel}>
      <Form layout="vertical" labelCol={{ span: 5 }} wrapperCol={{span:18}} labelAlign="right">
        <Form.Item label="试卷名称" >
          {getFieldDecorator('name', {
            initialValue: formData.name,
            rules: [{ required: true, message: '试卷名称不能为空' }],
          })(
            <Input placeholder="试卷名称" allowClear/>
          )}
        </Form.Item>
        <Form.Item label="试卷类型">
          {getFieldDecorator('paperType',{
            initialValue: formData.paperType
          })(
            <Radio.Group>
              <Radio.Button value={1}>公开试卷</Radio.Button>
              <Radio.Button value={2}>非公开试卷</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
      </Form>

    </Modal>
  )
})

export default class ExamManage extends Component {
  state ={
    visibleEdit: false,
    formEdit: {}
  }
  onClickEdit = (data = {}) => {
    this.setState({ 
       visibleEdit: true,
       formEdit: data
    })
  }
  handleCloseEdit = state => {
    this.setState({ visibleEdit: false })
  }
  render() {
    return (
      <div>
        <h2>试卷列表页</h2>
        <MainTable onClickEdit={ this.onClickEdit }/>
        <ModalEditForm visible={this.state.visibleEdit} formData={this.state.formEdit} dataSrc={this.state.formEdit} onCancel={this.handleCloseEdit }/>
      </div>
    )
  }
}