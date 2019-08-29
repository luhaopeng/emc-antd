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
  type?: string
  time: string
  start: number
  end: number
  rate: number
  data: number
  startTime: string
  endTime: string
}

const PageDataUsage: React.FunctionComponent = (): JSX.Element => {
  const [unit, setUnit] = useState()
  const [energy, setEnergy] = useState('电')
  const [selectedRowKeys, setSelectedRowKeys] = useState()
  let searchInput: Input | null

  const hSubmit = () => console.log('submitted')
  const hUnitChange = (val: string) => setUnit(val)
  const hEnergyChange = (e: RadioChangeEvent) => setEnergy(e.target.value)
  const hSelectRow = (selectedKeys: string[] | number[] | undefined) =>
    setSelectedRowKeys(selectedKeys)

  const buildTreeNode = (tree: ITreeSrcItem) => (
    <TreeNode value={tree.name} title={tree.name} key={tree.name}>
      {tree.children ? tree.children.map(buildTreeNode) : null}
    </TreeNode>
  )

  const unitTree = [
    {
      children: [
        { name: 'B1厂房' },
        { name: 'B3厂房' },
        { name: '物流中心' },
        { name: 'B2厂房' },
        { name: '宿舍' },
        { name: '园区二级表' },
        {
          children: [
            { name: '品质科' },
            { name: 'B1厂房公共' },
            { name: 'B1厂房返修组' },
            { name: '采购部' },
            { name: 'B1厂房仓库总表' },
            { name: '包装车间' },
            { name: 'B1厂房工艺' },
            { name: 'B1厂房单相车间' },
            { name: 'B2系统车间' },
            { name: 'B2电子表三相车间' },
            { name: 'B2海外生产' },
            { name: 'B1厂房北区总校验' },
            { name: 'B1厂房总照明1' },
            { name: 'B1厂房总照明2' },
            { name: 'B1厂房二楼总动力' },
            { name: 'B1厂房二楼总校验' },
            { name: 'B1三楼动力' },
            { name: 'B1食堂动力' },
            { name: 'B1餐梯' },
            { name: 'B1三楼办公' },
            { name: 'B1信息中心动力' }
          ],
          name: '制造平台'
        },
        {
          children: [
            { name: '华方医药' },
            { name: '嘉禾众邦' },
            { name: '中博光电' },
            { name: '迪恩科技' },
            { name: '浙大网新' },
            { name: '天昱微创' },
            { name: '厚达' },
            { name: '华立能源' },
            { name: '元麦' }
          ],
          name: '非制造平台'
        },
        { name: '大楼办公' },
        { name: '演示箱' },
        {
          children: [
            { name: '模块车间' },
            { name: '物流' },
            { name: '动力中心低压配电室' },
            { name: '公共区域' },
            { name: 'IT管理' },
            { name: '质量部' },
            { name: '食堂' },
            { name: '二楼办公' },
            { name: '成品车间' }
          ],
          name: '青山湖基地'
        }
      ],
      name: '华立科技股份有限公司'
    }
  ]
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
  const pointData: IPointSrcItem[] = [
    { key: 1, point: '电测室', unit: '品质科' },
    { key: 2, point: '参观大厅', unit: 'B1厂房' },
    { key: 3, point: '超声波清洗', unit: 'B1厂房模块车间' },
    { key: 4, point: '老化区', unit: 'B1厂房模块车间' },
    { key: 5, point: '喷漆房', unit: 'B1厂房模块车间' },
    { key: 6, point: '模块调试', unit: 'B1厂房模块车间' },
    { key: 7, point: '插件流水线', unit: 'B1厂房模块车间' },
    { key: 8, point: '补焊区', unit: 'B1厂房模块车间' },
    { key: 9, point: '返修校验', unit: 'B1厂房返修组' },
    { key: 10, point: '返修动力、一楼开水器', unit: 'B1厂房返修组' },
    { key: 11, point: 'B1立体库', unit: '采购部' },
    { key: 12, point: '南仓库动力', unit: 'B1厂房仓库总表' }
  ]
  const dataColumns: Array<ColumnProps<IDataSrcItem>> = [
    { dataIndex: 'point', title: '计量点' },
    { dataIndex: 'unit', title: '用能单元' },
    { dataIndex: 'type', title: '费率' },
    { dataIndex: 'time', title: '数据时间' },
    { dataIndex: 'start', title: '起码' },
    { dataIndex: 'end', title: '止码' },
    { dataIndex: 'rate', title: '倍率' },
    { dataIndex: 'data', title: '电量（kWh）' },
    { dataIndex: 'startTime', title: '起码时间' },
    { dataIndex: 'endTime', title: '止码时间' }
  ]
  const dataSrc: IDataSrcItem[] = [
    {
      data: 113.4,
      end: 2634.12,
      endTime: '2019-08-29 00:00:00',
      key: 1,
      point: '嘉禾众邦2（三楼照明）',
      rate: 30.0,
      start: 2630.34,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '嘉禾众邦'
    },
    {
      data: 723.9,
      end: 9437.06,
      endTime: '2019-08-29 00:00:00',
      key: 2,
      point: '华方医药',
      rate: 30.0,
      start: 9412.93,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '华方医药'
    },
    {
      data: 5.11,
      end: 6492.93,
      endTime: '2019-08-29 00:00:00',
      key: 3,
      point: '餐梯',
      rate: 1.0,
      start: 6487.82,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: 'B3厂房'
    },
    {
      data: 3.81,
      end: 15457.26,
      endTime: '2019-08-29 00:00:00',
      key: 4,
      point: '电梯3',
      rate: 1.0,
      start: 15453.45,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: 'B3厂房'
    },
    {
      data: 0.96,
      end: 7114.98,
      endTime: '2019-08-29 00:00:00',
      key: 5,
      point: '迪恩科技照明',
      rate: 1.0,
      start: 7114.02,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '迪恩科技'
    },
    {
      data: 1196.0,
      end: 4460.23,
      endTime: '2019-08-29 00:00:00',
      key: 6,
      point: '嘉禾众邦（动力）',
      rate: 200.0,
      start: 4454.25,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '嘉禾众邦'
    },
    {
      data: 1148.0,
      end: 7970.62,
      endTime: '2019-08-29 00:00:00',
      key: 7,
      point: '浙大网新（动力）',
      rate: 200.0,
      start: 7964.88,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '浙大网新'
    },
    {
      data: 76.8,
      end: 2388.37,
      endTime: '2019-08-29 00:00:00',
      key: 8,
      point: '天昱微创',
      rate: 80.0,
      start: 2387.41,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '天昱微创'
    },
    {
      data: 113.4,
      end: 2634.12,
      endTime: '2019-08-29 00:00:00',
      key: 9,
      point: '嘉禾众邦2（三楼照明）',
      rate: 30.0,
      start: 2630.34,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '嘉禾众邦'
    },
    {
      data: 723.9,
      end: 9437.06,
      endTime: '2019-08-29 00:00:00',
      key: 10,
      point: '华方医药',
      rate: 30.0,
      start: 9412.93,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '华方医药'
    },
    {
      data: 5.11,
      end: 6492.93,
      endTime: '2019-08-29 00:00:00',
      key: 11,
      point: '餐梯',
      rate: 1.0,
      start: 6487.82,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: 'B3厂房'
    },
    {
      data: 3.81,
      end: 15457.26,
      endTime: '2019-08-29 00:00:00',
      key: 12,
      point: '电梯3',
      rate: 1.0,
      start: 15453.45,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: 'B3厂房'
    },
    {
      data: 0.96,
      end: 7114.98,
      endTime: '2019-08-29 00:00:00',
      key: 13,
      point: '迪恩科技照明',
      rate: 1.0,
      start: 7114.02,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '迪恩科技'
    },
    {
      data: 1196.0,
      end: 4460.23,
      endTime: '2019-08-29 00:00:00',
      key: 14,
      point: '嘉禾众邦（动力）',
      rate: 200.0,
      start: 4454.25,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '嘉禾众邦'
    },
    {
      data: 1148.0,
      end: 7970.62,
      endTime: '2019-08-29 00:00:00',
      key: 15,
      point: '浙大网新（动力）',
      rate: 200.0,
      start: 7964.88,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '浙大网新'
    },
    {
      data: 76.8,
      end: 2388.37,
      endTime: '2019-08-29 00:00:00',
      key: 16,
      point: '天昱微创',
      rate: 80.0,
      start: 2387.41,
      startTime: '2019-08-28 00:00:00',
      time: '2019-08-28',
      type: '总',
      unit: '天昱微创'
    }
  ]

  const treeDropdownStyle = { maxHeight: 400, overflow: 'auto' }

  useEffect(() => {
    setUnit(unitTree[0].name)
    setSelectedRowKeys(pointData.map(v => v.key))
  }, [])

  return (
    <Layout.Content className='page-data'>
      <Row gutter={16}>
        <Col span={6}>
          <section className='usage-section'>
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
                <Select defaultValue='正向有功表码'>
                  <Option value='正向有功表码'>正向有功表码</Option>
                  <Option value='正向无功表码'>正向无功表码</Option>
                  <Option value='反向有功表码'>反向有功表码</Option>
                  <Option value='反向无功表码'>反向无功表码</Option>
                  <Option value='组合有边表码'>组合有边表码</Option>
                  <Option value='组合无边表码'>组合无边表码</Option>
                </Select>
              </Form.Item>
              <RangePicker
                style={{ width: '100%', marginBottom: 8 }}
                showTime={{ format: 'HH:mm' }}
                format='YYYY-MM-DD HH:mm'
                ranges={{
                  '今 天': [moment().startOf('date'), moment()],
                  '本 月': [moment().startOf('month'), moment().endOf('month')]
                }}
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
                  {buildTreeNode(unitTree[0])}
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
          <section className='usage-section data-table'>
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
    </Layout.Content>
  )
}

export default PageDataUsage
