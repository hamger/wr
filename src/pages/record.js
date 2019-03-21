import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './record.less';
import PlayersPanel from '../components/PlayersPanel';
import VoteInput from '../components/VoteInput';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';

class Record extends Component {
  constructor(props) {
    super(props);
    this.allocation = props.allocation;
    this.record = props.record;
    this.dispatch = props.dispatch;
  }
  componentDidMount() {
    this.initState = {
      allocation: this.allocation,
      record: this.record,
    };
  }
  endsVote(status, id) {
    this.dispatch({
      type: 'record/changeVoteStatus',
      payload: status,
      id,
    });
  }
  vote(status, id) {
    this.dispatch({
      type: 'record/markVote',
      payload: id,
      status,
    });
    this.dispatch({
      type: 'record/startVote',
    });
  }
  delVote(i, j) {
    this.dispatch({
      type: 'record/delVote',
      payload: i,
      j,
    });
  }
  addNote() {
    this.dispatch({
      type: 'record/addNote',
    });
  }
  back() {
    this.dispatch(routerRedux.push('/'));
  }
  reset() {
    this.dispatch({
      type: 'record/startVote',
    });
    this.dispatch({
      type: 'record/reset',
    });
  }

  render() {
    return (
      <div className={styles.wrap}>
        <PlayersPanel configGod={this.allocation.configGod} />
        {this.props.record.notes.map((item, idx) => {
          return (
            <div key={item.id} className={styles.voteBox}>
              <div className={styles.head}>
                <h5>{item.title}</h5>
                <div className={item.voteStatus === 0 ? styles.buttonBox : styles.buttonBox2}>
                  {item.voteStatus === 0 ? (
                    <Button key={0} onClick={() => this.endsVote(1, item.id)}>
                      进入投票模式
                    </Button>
                  ) : (
                    [
                      <Button key={idx + '-0'} onClick={() => this.vote(2, item.id)}>
                        下一组
                      </Button>,
                      <Button key={idx + '-1'} onClick={() => this.vote(1, item.id)}>
                        弃票
                      </Button>,
                      <Button
                        key={idx + '-2'}
                        onClick={() => {
                          this.vote(0, item.id);
                          this.endsVote(0, item.id);
                        }}
                      >
                        结束
                      </Button>,
                    ]
                  )}
                </div>
              </div>
              <div className={styles.content}>
                {item.vote.map((item2, index) => {
                  return (
                    <div key={index} className={styles.listItem}>
                      <VoteInput voter={item2.voter} votee={item2.votee} />
                      <span className={styles.delBtn} onClick={() => this.delVote(idx, index)}>
                        x
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className={styles.btnBox}>
          <Button
            className={styles.backBtn}
            disabled={this.props.record.voteStatus}
            size="small"
            onClick={() => this.back()}
          >
            返回
          </Button>
          <Button
            className={styles.backBtn}
            disabled={this.props.record.voteStatus}
            size="small"
            onClick={() => this.reset()}
          >
            重置
          </Button>
          <Button
            className={styles.addNote}
            disabled={this.props.record.voteStatus}
            size="small"
            onClick={() => this.addNote()}
          >
            下一轮
          </Button>
        </div>
      </div>
    );
  }
}

Record.propTypes = {};

// 函数的返回值作为 props 传入组件
function mapStateToProps(state) {
  // {key : state.命名空间}
  return {
    allocation: state.allocation,
    record: state.record,
  };
}

export default connect(mapStateToProps)(Record);
