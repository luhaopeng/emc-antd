import {
  Button,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  Layout,
  Row,
  Select,
  Table,
  TreeSelect
} from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Analytics, Common } from '../../../api'
import './index.less'

const { TreeNode } = TreeSelect
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
  unit: string
  data: number
  time: string
}

const PageAnalyticsPowerFactor: React.FunctionComponent = (): JSX.Element => {
  const [unit, setUnit] = useState()
  const [unitTree, setUnitTree] = useState([])
  const [pointData, setPointData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState()
  const [dataSrc, setDataSrc] = useState([])
  let searchInput: Input | null

  const hUnitChange = (val: string) => setUnit(val)
  const hSelectRow = (selectedKeys: string[] | number[] | undefined) =>
    setSelectedRowKeys(selectedKeys)

  const buildTreeNode = (tree: ITreeSrcItem) => (
    <TreeNode value={tree.name} title={tree.name} key={tree.name}>
      {tree.children ? tree.children.map(buildTreeNode) : null}
    </TreeNode>
  )

  const queryUnitTree = async () => {
    const { data } = await Common.UnitTree.query()
    setUnitTree(data.data)
    setUnit(data.data[0].name)
  }
  const queryPointData = async () => {
    const { data } = await Analytics.PowerFactor.PointData.query()
    setPointData(data.data)
    setSelectedRowKeys(data.data.map((v: IPointSrcItem) => v.key))
  }
  const queryDataSrc = async () => {
    const { data } = await Analytics.PowerFactor.DataSrc.query()
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
    { dataIndex: 'point', title: '计量点' },
    { dataIndex: 'unit', title: '用能单元' },
    { dataIndex: 'data', title: '功率因数' },
    { dataIndex: 'time', title: '数据时间' }
  ]

  useEffect(() => {
    queryUnitTree()
    queryPointData()
    queryDataSrc()
  }, [])

  return (
    <Layout.Content className='page-analytics'>
      <Row gutter={16}>
        <Col span={6}>
          <section className='factor-section'>
            <div className='condition-header'>
              <h4>查询条件</h4>
              <Button type='primary'>查询</Button>
            </div>
            <Form
              labelAlign='left'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <RangePicker
                style={{ width: '100%', marginBottom: 8 }}
                showTime={{ format: 'HH:mm' }}
                format='YYYY-MM-DD HH:mm'
                defaultValue={[moment().startOf('date'), moment()]}
                placeholder={['开始时间', '结束时间']}
              />
              <Form.Item label='功率因数'>
                <Select defaultValue='全部'>
                  <Option value='全部'>全部</Option>
                  <Option value='0.9~1.0'>0.9~1.0</Option>
                  <Option value='0.8~0.9'>0.8~0.9</Option>
                  <Option value='0.5~0.8'>0.5~0.8</Option>
                  <Option value='≤0.5'>≤0.5</Option>
                </Select>
              </Form.Item>
              <Form.Item label='用能单位'>
                <TreeSelect
                  showSearch={true}
                  value={unit}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
          <section className='factor-section data-table'>
            <Table
              size='middle'
              bordered={true}
              columns={dataColumns}
              dataSource={dataSrc}
              pagination={{ pageSize: 15 }}
            />
          </section>
        </Col>
      </Row>
    </Layout.Content>
  )
}

export default PageAnalyticsPowerFactor
