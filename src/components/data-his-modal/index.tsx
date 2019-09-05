import {
  Button,
  DatePicker,
  Form,
  Modal,
  Select,
  Table,
  TreeSelect
} from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { ColumnProps } from 'antd/lib/table'
import { Axis, Chart, Geom, Tooltip } from 'bizcharts'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Data } from '../../api'
import Utils from '../../utils'
import './index.less'

const { TreeNode, SHOW_PARENT } = TreeSelect
const { Option } = Select
const { RangePicker } = DatePicker

interface ITreeSrcItem {
  children?: ITreeSrcItem[]
  name: string
}

interface IModalProp extends ModalProps {
  srcId: number
  point: string
}

interface IPointData {
  time: string
  value: number
}

const DataHisModal: React.FunctionComponent<IModalProp> = (
  props: IModalProp
): JSX.Element => {
  const [item, setItem] = useState()
  const [itemTree, setItemTree] = useState([])
  const [lineData, setLineData] = useState([])
  const [lineColumns, setLineColumns] = useState({})

  const hSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submitted')
  }
  const hItemChange = (val: string) => setItem(val)

  const buildTreeNode = (tree: ITreeSrcItem) => (
    <TreeNode value={tree.name} title={tree.name} key={tree.name}>
      {tree.children ? tree.children.map(buildTreeNode) : null}
    </TreeNode>
  )

  const queryItemTree = async () => {
    const { data } = await Data.Meter.ItemTree.query()
    setItemTree(data.data)
    setItem('表码')
  }
  const queryLineDate = async () => {
    const { data } = await Data.History.PointHis.query()
    setLineData(data.data)
    setLineColumns({
      time: { type: 'timeCat', mask: 'YYYY-MM-DD HH:mm:ss' },
      value: Utils.Chart.calcRange(data.data.map((v: IPointData) => v.value))
    })
  }

  const dataColumns: Array<ColumnProps<IPointData>> = [
    { dataIndex: 'time', title: '采集时间' },
    { dataIndex: 'value', title: '正向有功表码' }
  ]

  const treeDropdownStyle = { maxHeight: 400, overflow: 'auto' }

  useEffect(() => {
    queryItemTree()
    queryLineDate()
  }, [])

  return (
    <Modal
      title={
        <div className='modal-title'>
          计量点抄表历史数据
          <span className='modal-sub-title'>{props.point}</span>
        </div>
      }
      {...props}
      width='90%'
      style={{ top: 20 }}
    >
      <Form layout='inline' onSubmit={hSubmit}>
        <Form.Item>
          <RangePicker
            key='range-picker'
            style={{ width: '100%', marginBottom: 8 }}
            showTime={{ format: 'HH:mm' }}
            format='YYYY-MM-DD HH:mm'
            defaultValue={[moment().startOf('date'), moment()]}
            placeholder={['开始时间', '结束时间']}
          />
        </Form.Item>
        <Form.Item label='数据项'>
          <TreeSelect
            showSearch={false}
            value={item}
            className='multi-tree'
            dropdownStyle={treeDropdownStyle}
            onChange={hItemChange}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}
          >
            {itemTree.length && buildTreeNode(itemTree[0])}
          </TreeSelect>
        </Form.Item>
        <Form.Item label='费率类型'>
          <Select defaultValue='总'>
            <Option value=''>全部</Option>
            <Option value='总'>总</Option>
            <Option value='尖'>尖</Option>
            <Option value='峰'>峰</Option>
            <Option value='平'>平</Option>
            <Option value='谷'>谷</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ float: 'right' }}>
          <Button type='primary' htmlType='submit'>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Chart
        padding='auto'
        height={200}
        data={lineData}
        scale={lineColumns}
        forceFit={true}
      >
        <Axis name='time' />
        <Axis name='value' />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type='line' position='time*value' size={2} />
        <Geom
          type='point'
          position='time*value'
          size={4}
          shape={'circle'}
          style={{ lineWidth: 1, stroke: '#fff' }}
        />
      </Chart>
      <Table
        size='middle'
        bordered={true}
        columns={dataColumns}
        dataSource={lineData}
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  )
}

export default DataHisModal
