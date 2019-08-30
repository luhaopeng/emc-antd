import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React from 'react'

interface IModalProp extends ModalProps {
  srcId: number
}

const DataHisModal: React.FunctionComponent<IModalProp> = (
  props: IModalProp
): JSX.Element => {
  return (
    <Modal title='Title' {...props}>
      <p>point id : {props.srcId}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default DataHisModal
