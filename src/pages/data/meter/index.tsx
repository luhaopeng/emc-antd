import {
  Button,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  Layout,
  Radio,
  Row,
  Select,
  Table,
  TreeSelect
} from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Common, Data } from '../../../api'
import DataHisModal from '../../../components/data-his-modal'
import './index.less'

const { TreeNode, SHOW_PARENT } = TreeSelect
const { Option } = Select
const { RangePicker } = DatePicker

interface ITreeSrcItem {
  children?: ITreeSrcItem[]
  name: string
}

interface IPointSrcItem {
  key: number | string
  point: string
  unit: string
}

interface IDataSrcItem {
  key: number
  point: string
  type?: string
  data: number
  time: string
}

const PageDataMeter: React.FunctionComponent = (): JSX.Element => {
  const [unit, setUnit] = useState()
  const [item, setItem] = useState()
  const [energy, setEnergy] = useState('电')
  const [selectedRowKeys, setSelectedRowKeys] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalPointId, setModalPointId] = useState()
  const [itemTree, setItemTree] = useState([])
  const [unitTree, setUnitTree] = useState([])
  const [pointData, setPointData] = useState([])
  const [dataSrc, setDataSrc] = useState([])
  let searchInput: Input | null

  const hSubmit = () => console.log('submitted')
  const hUnitChange = (val: string) => setUnit(val)
  const hItemChange = (val: string) => setItem(val)
  const hEnergyChange = (e: RadioChangeEvent) => setEnergy(e.target.value)
  const hSelectRow = (selectedKeys: string[] | number[] | undefined) =>
    setSelectedRowKeys(selectedKeys)
  const hModalCancel = () => setModalVisible(false)

  const buildTreeNode = (tree: ITreeSrcItem) => (
    <TreeNode value={tree.name} title={tree.name} key={tree.name}>
      {tree.children ? tree.children.map(buildTreeNode) : null}
    </TreeNode>
  )

  const pointNameRenderer = (text: string, row: IDataSrcItem) => {
    const onClick = () => {
      setModalVisible(true)
      setModalPointId(row.key)
    }
    return (
      <a data-key={row.key} onClick={onClick}>
        {text}
      </a>
    )
  }
  const queryItemTree = async () => {
    const { data } = await Data.Meter.ItemTree.query()
    setItemTree(data.data)
    setItem('表码')
  }
  const queryUnitTree = async () => {
    const { data } = await Common.UnitTree.query()
    setUnitTree(data.data)
    setUnit(data.data[0].name)
  }
  const queryPointData = async () => {
    const { data } = await Data.Meter.PointData.query()
    setPointData(data.data)
    setSelectedRowKeys(data.data.map((v: IPointSrcItem) => v.key))
  }
  const queryDataSrc = async () => {
    const { data } = await Data.Meter.DataSrc.query()
    setDataSrc(data.data)
  }

  const pointColumns: Array<ColumnProps<IPointSrcItem>> = [
    {
      dataIndex: 'point',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => {
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          return (
            setSelectedKeys &&
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          )
        }
        const onReset = () => clearFilters && clearFilters([])
        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                searchInput = node
              }}
              placeholder='搜索 计量点'
              value={selectedKeys && selectedKeys[0]}
              onChange={onChange}
              onPressEnter={confirm}
              style={{ width: 160, marginBottom: 8, display: 'block' }}
            />
            <div style={{ textAlign: 'right' }}>
              <Button
                type='primary'
                onClick={confirm}
                size='small'
                style={{ marginRight: 8 }}
              >
                搜索
              </Button>
              <Button onClick={onReset} size='small'>
                重置
              </Button>
            </div>
          </div>
        )
      },
      filterIcon: (filtered: boolean) => (
        <Icon
          type='search'
          style={{ color: filtered ? '#1890ff' : undefined }}
        />
      ),
      onFilter: (value: string, record: IPointSrcItem) => {
        return record.point
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      },
      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => searchInput && searchInput.select())
        }
      },
      title: '计量点'
    },
    {
      dataIndex: 'unit',
      title: '用能单元'
    }
  ]
  const dataColumns: Array<ColumnProps<IDataSrcItem>> = [
    { dataIndex: 'point', title: '计量点', render: pointNameRenderer },
    { dataIndex: 'type', title: '费率' },
    { dataIndex: 'data', title: '数据值' },
    { dataIndex: 'time', title: '最新采集时间' }
  ]

  const treeDropdownStyle = { maxHeight: 400, overflow: 'auto' }

  useEffect(() => {
    queryItemTree()
    queryUnitTree()
    queryPointData()
    queryDataSrc()
  }, [])

  return (
    <Layout.Content className='page-data'>
      <Row gutter={16}>
        <Col span={6}>
          <section className='meter-section'>
            <div className='condition-header'>
              <h4>查询条件</h4>
              <Button type='primary' htmlType='submit'>
                查询
              </Button>
            </div>
            <Form
              labelAlign='left'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onSubmit={hSubmit}
            >
              <Form.Item label='能源类别'>
                <Radio.Group
                  value={energy}
                  buttonStyle='solid'
                  onChange={hEnergyChange}
                >
                  <Radio.Button value='电'>电</Radio.Button>
                  <Radio.Button value='水'>水</Radio.Button>
                </Radio.Group>
              </Form.Item>
              {energy === '电' ? (
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
              ) : null}
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
              <RangePicker
                style={{ width: '100%', marginBottom: 8 }}
                showTime={{ format: 'HH:mm' }}
                format='YYYY-MM-DD HH:mm'
                defaultPickerValue={[moment().startOf('date'), moment()]}
                placeholder={['开始时间', '结束时间']}
              />
              <Form.Item label='用能单位'>
                <TreeSelect
                  showSearch={true}
                  value={unit}
                  dropdownStyle={treeDropdownStyle}
                  onChange={hUnitChange}
                >
                  {unitTree.length && buildTreeNode(unitTree[0])}
                </TreeSelect>
              </Form.Item>
              <Table
                size='middle'
                bordered={true}
                columns={pointColumns}
                dataSource={pointData}
                rowSelection={{ selectedRowKeys, onChange: hSelectRow }}
              />
            </Form>
          </section>
        </Col>
        <Col span={18}>
          <section className='meter-section data-table'>
            <Table
              size='middle'
              bordered={true}
              columns={dataColumns}
              dataSource={dataSrc}
              pagination={{ pageSize: 20 }}
            />
          </section>
        </Col>
      </Row>
      <DataHisModal
        srcId={modalPointId}
        visible={modalVisible}
        onCancel={hModalCancel}
        footer={null}
      />
    </Layout.Content>
  )
}

export default PageDataMeter
