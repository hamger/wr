import React from 'react';
import { connect } from 'dva';
import styles from './allocation.less';
import { Button, InputNumber, Checkbox, Row, Col, message } from 'antd';
import { routerRedux } from 'dva/router';

const Allocation = ({ allocation, dispatch }) => {
  let { configBase, configGod } = allocation;

  function save() {
    let amount = configBase[0].number + configBase[1].number;
    configGod.forEach(item => {
      if (item.select) amount++;
    });
    dispatch({
      type: 'allocation/save',
      payload: configBase,
      configGod,
      amount,
    });
    dispatch({
      type: 'record/createPlayers',
      payload: amount,
    });
    message.success('配置保存成功', 1.2);
  }

  function back() {
    dispatch(routerRedux.push('/'));
  }

  function changeBase(id, value) {
    configBase[id].number = value;
  }

  function changeGod(id, value) {
    configGod[id].select = value.target.checked;
  }

  return (
    <div className={styles.wrap}>
      <Row>
        <Col span={12}>
          <span>平民</span>{' '}
          <InputNumber
            min={1}
            max={8}
            defaultValue={configBase[0].number}
            onChange={value => changeBase(0, value)}
          />
        </Col>
        <Col span={12}>
          <span>狼人</span>{' '}
          <InputNumber
            min={1}
            max={8}
            defaultValue={configBase[1].number}
            onChange={changeBase.bind(this, 1)}
          />
        </Col>
      </Row>
      <Row>
        {configGod.map(function(item) {
          return (
            <Col key={item.id} span={8}>
              <Checkbox defaultChecked={item.select} onChange={value => changeGod(item.id, value)}>
                {item.title}
              </Checkbox>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Button className={styles.button} type="primary" onClick={save}>
          保存
        </Button>
        <Button className={styles.button} onClick={back}>
          返回
        </Button>
      </Row>
    </div>
  );
};

Allocation.propTypes = {};

// 函数的返回值作为 props 传入组件
function mapStateToProps(state) {
  // {key : state.命名空间}
  return {
    allocation: state.allocation,
    record: state.record,
  };
}

export default connect(mapStateToProps)(Allocation);
