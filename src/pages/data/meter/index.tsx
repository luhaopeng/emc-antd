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
  let searchInput: Input | null

  const hSubmit = () => console.log('submitted')
  const hUnitChange = (val: string) => setUnit(val)
  const hItemChange = (val: string) => setItem(val)
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
  const itemTree = [
    {
      children: [
        {
          children: [
            { name: '正向有功表码' },
            { name: '正向无功表码' },
            { name: '反向有功表码' },
            { name: '反向无功表码' },
            { name: '组合有边表码' },
            { name: '组合无边表码' }
          ],
          name: '表码'
        },
        {
          children: [
            { name: 'A相电压' },
            { name: 'B相电压' },
            { name: 'C相电压' }
          ],
          name: '电压'
        },
        {
          children: [
            { name: 'A相电流' },
            { name: 'B相电流' },
            { name: 'C相电流' }
          ],
          name: '电流'
        },
        {
          children: [
            { name: '总有功功率' },
            { name: 'A相有功功率' },
            { name: 'B相有功功率' },
            { name: 'C相有功功率' },
            { name: '总无功功率' },
            { name: 'A相无功功率' },
            { name: 'B相无功功率' },
            { name: 'C相无功功率' }
          ],
          name: '功率'
        },
        {
          children: [
            { name: '总功率因数' },
            { name: 'A相功率因数' },
            { name: 'B相功率因数' },
            { name: 'C相功率因数' }
          ],
          name: '功率因数'
        }
      ],
      name: '全部数据项'
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
    { dataIndex: 'type', title: '费率' },
    { dataIndex: 'data', title: '数据值' },
    { dataIndex: 'time', title: '最新采集时间' }
  ]
  const dataSrc: IDataSrcItem[] = [
    {
      data: 1548.08,
      key: 1,
      point: '1D1进线柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 13.19,
      key: 2,
      point: '1D2电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 0.32,
      key: 3,
      point: '1D3电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 41.96,
      key: 4,
      point: '1D4-1高配室照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1.34,
      key: 5,
      point: '1D4-2综合仓库照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 106.85,
      key: 6,
      point: '1D4-3门卫消防室电源',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 67.53,
      key: 7,
      point: '1D4-4热泵机房照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1121.01,
      key: 8,
      point: '1D4-5地源热泵机组配电4',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1548.08,
      key: 9,
      point: '1D1进线柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 13.19,
      key: 10,
      point: '1D2电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 0.32,
      key: 11,
      point: '1D3电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 41.96,
      key: 12,
      point: '1D4-1高配室照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1.34,
      key: 13,
      point: '1D4-2综合仓库照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 106.85,
      key: 14,
      point: '1D4-3门卫消防室电源',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 67.53,
      key: 15,
      point: '1D4-4热泵机房照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1121.01,
      key: 16,
      point: '1D4-5地源热泵机组配电4',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1548.08,
      key: 17,
      point: '1D1进线柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 13.19,
      key: 18,
      point: '1D2电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 0.32,
      key: 19,
      point: '1D3电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 41.96,
      key: 20,
      point: '1D4-1高配室照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1.34,
      key: 21,
      point: '1D4-2综合仓库照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 106.85,
      key: 22,
      point: '1D4-3门卫消防室电源',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 67.53,
      key: 23,
      point: '1D4-4热泵机房照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1121.01,
      key: 24,
      point: '1D4-5地源热泵机组配电4',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1548.08,
      key: 25,
      point: '1D1进线柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 13.19,
      key: 26,
      point: '1D2电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 0.32,
      key: 27,
      point: '1D3电容柜',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 41.96,
      key: 28,
      point: '1D4-1高配室照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1.34,
      key: 29,
      point: '1D4-2综合仓库照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 106.85,
      key: 30,
      point: '1D4-3门卫消防室电源',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 67.53,
      key: 31,
      point: '1D4-4热泵机房照明',
      time: '2019-08-28 15:45:00',
      type: '总'
    },
    {
      data: 1121.01,
      key: 32,
      point: '1D4-5地源热泵机组配电4',
      time: '2019-08-28 15:45:00',
      type: '总'
    }
  ]

  const treeDropdownStyle = { maxHeight: 400, overflow: 'auto' }

  useEffect(() => {
    setUnit(unitTree[0].name)
    setItem('表码')
    setSelectedRowKeys(pointData.map(v => v.key))
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
                  {buildTreeNode(itemTree[0])}
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
    </Layout.Content>
  )
}

export default PageDataMeter
