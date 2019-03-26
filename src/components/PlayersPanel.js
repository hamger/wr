import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './PlayersPanel.less';
import 'hg-parapicker/picker.css';
import ParaPicker from 'hg-parapicker';
import { Affix } from 'antd';

const selectItems = [['未知', '平民', '狼人'], ['存活', '死亡', '警长']];

class PlayersPanel extends Component {
  constructor(props) {
    super(props);
    props.configGod.forEach(item => {
      if (item.select) selectItems[0].push(item.title);
    });
    // props 是只读的，不能作为Object.assign的第一个参数
    // this.state = Object.assign({},  props)
  }

  componentDidMount() {
    let that = this;
    let playersArr = this.props.record.players;

    this.picker = new ParaPicker({
      data: selectItems,
      success: function(arr) {
        const i = this.playerNumber;
        playersArr[i].identity = arr[0];
        playersArr[i].status = arr[1];
        that.setState({ players: playersArr });
      },
    });
  }

  handle(i) {
    let playersArr = this.props.record.players;
    if (!this.props.record.voteStatus) {
      // 正常状态,启用选择器
      this.picker.playerNumber = i;
      this.picker.setTitle(i + 1 + '号玩家');
      this.picker.show();
    } else {
      // 投票状态，禁用选择器
      if (playersArr[i].status === '死亡') return;
      if (playersArr[i].voted) playersArr[i].voted = 0;
      else playersArr[i].voted = 1;
      var tempVote = this.props.record.tempVote;
      var idx = tempVote.indexOf(i);
      if (idx > -1 && playersArr[i].voted === 0) {
        tempVote.splice(idx, 1);
      }
      if (idx === -1 && playersArr[i].voted === 1) {
        tempVote.push(i);
      }
      this.props.dispatch({
        type: 'record/changePlayers',
        payload: playersArr,
        tempVote,
      });
    }
  }

  render() {
    return (
      <Affix>
        <div
          className={styles.playersBox}
          style={{
            backgroundColor: this.props.record.voteStatus ? '#ffe5e5' : '#fff',
          }}
        >
          {this.props.record.players.map(item => {
            return (
              <div
                key={item.id}
                id={`player-${item.id}`}
                className={styles.player}
                onClick={this.handle.bind(this, item.id)}
                style={{
                  backgroundColor:
                    item.status === '存活' ?
                      '#5bb1fb' :
                      item.status === '死亡' ?
                      '#bebebe' :
                      '#f36f6f',
                  border:
                    this.props.record.voteStatus && item.status !== '死亡' ?
                      item.voted ?
                        '2px solid #244a32' :
                        '2px dashed #009838' :
                      '',
                }}
              >
                {item.id + 1 + '号'}
                <br />
                {item.identity}
              </div>
            );
          })}
        </div>
      </Affix>
    );
  }
}

PlayersPanel.propTypes = {};

// 函数的返回值作为 props 传入组件
function mapStateToProps(state) {
  // {key : state.命名空间}
  return {
    record: state.record,
  };
}

export default connect(mapStateToProps)(PlayersPanel);
