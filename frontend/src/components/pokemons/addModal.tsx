import { FC } from "react";

import { Modal, Input, InputNumber, Form, Select, Row, Col, Button } from 'antd';
import { types } from "../../misc/types";

import styles from "./addModal.module.css";

interface Props {
  isModalOpen?: boolean;
  onCancel?: () => void;
}

export const AddModal: FC<Props> = ({ 
  isModalOpen=true,
  onCancel
}) => {

  const typeOptions = types.map((type: string) => {
    return ({
      value: type,
      label: type,
    })
  })

  const inputNumberComponent = (baseElement: string) => {
    return (
      <div key={baseElement} className={styles['input-number']}>
        <p>{baseElement}</p>
        <Form.Item 
          name={`base.${baseElement}`}
          required
          rules={[{ required: true, message: `Please fill in the stat for ${baseElement}!` }]}
        >
          <InputNumber min={1} max={250} id={`base.${baseElement}`} style={{width: '100%'}} />
        </Form.Item>
      </div>
    )
  }

  const onSubmitHandler = (values: FormData) => {
    console.log( 'values', values )
  }

  return (
    <Modal title="Add new pokemon" open={isModalOpen} /*onOk={onOkHandler}*/ onCancel={onCancel} /*okText="Submit"*/ footer={null}>
      <Form id="new_pokemon" onFinish={onSubmitHandler} requiredMark={'optional'}>

        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Form.Item 
              name="name"
              required
              rules={[{ required: true, message: `Please fill in a name!` }]}
            >
              <Input placeholder="Pokemon name" id="name" allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Form.Item 
              name="type"
              required
              rules={[{ required: true, message: `Please select types!` }]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Types"
                // onChange={handleChange}
                options={typeOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            {['HP', 'Attack', 'Defense'].map((baseElement: string) => {
              return inputNumberComponent(baseElement)
            })}
          </Col>
          <Col className="gutter-row" span={12}>
            {['Speed', 'Sp. Attack', 'Sp. Defense'].map((baseElement: string) => {
              return inputNumberComponent(baseElement)
            })}
            
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Button form="new_pokemon" key="submit" htmlType="submit" type="primary">Submit</Button>
          </Col>
        </Row>

        
      </Form>
  </Modal>
  );
};
