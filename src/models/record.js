export default {
  namespace: 'record',

  state: {
    voteStatus: 0,
    amount: 12,
    players: [
      { id: 0, identity: '未知', status: '存活', voted: 0 },
      { id: 1, identity: '未知', status: '存活', voted: 0 },
      { id: 2, identity: '未知', status: '存活', voted: 0 },
      { id: 3, identity: '未知', status: '存活', voted: 0 },
      { id: 4, identity: '未知', status: '存活', voted: 0 },
      { id: 5, identity: '未知', status: '存活', voted: 0 },
      { id: 6, identity: '未知', status: '存活', voted: 0 },
      { id: 7, identity: '未知', status: '存活', voted: 0 },
      { id: 8, identity: '未知', status: '存活', voted: 0 },
      { id: 9, identity: '未知', status: '存活', voted: 0 },
      { id: 10, identity: '未知', status: '存活', voted: 0 },
      { id: 11, identity: '未知', status: '存活', voted: 0 },
    ],
    tempVote: [],
    notes: [
      {
        id: 0,
        voteStatus: 0,
        title: '竞选警长',
        vote: [],
      },
    ],
  },

  reducers: {
    reset(state) {
      return {
        ...state,
        voteStatus: 0,
        notes: [
          {
            id: 0,
            voteStatus: 0,
            title: '竞选警长',
            vote: [],
          },
        ],
      };
    },
    createPlayers(state, { payload: amount }) {
      const players = [];
      for (let i = 0; i < amount; i++) {
        players.push({ id: i, identity: '未知', status: '存活', voted: 0 });
      }
      return {
        ...state,
        players: players,
        amount: amount,
      };
    },
    changePlayers(state, { payload: playersArr, tempVote }) {
      return {
        ...state,
        players: playersArr,
        tempVote: tempVote,
      };
    },
    // 初始化投票状态
    startVote(state) {
      let arr = state.players;
      arr.forEach(element => {
        element.voted = 0;
      });
      return {
        ...state,
        players: arr,
        tempVote: [],
      };
    },
    // 记录投票状态
    markVote(state, { payload: id, status }) {
      var data = state;

      if (data.tempVote.length > 0) {
        data.tempVote = data.tempVote.map(val => {
          return val + 1 + '号';
        });
        let tempObj = {};
        if (status === 1) {
          // 弃票状态
          tempObj.voter = data.tempVote.toString();
          tempObj.votee = '弃票';
        } else {
          // 被投票者（考虑到只选一个的情况，视为自投）
          if (data.tempVote.length === 1) tempObj.votee = data.tempVote.toString();
          else tempObj.votee = data.tempVote.pop().toString();
          // 投票者
          tempObj.voter = data.tempVote.toString();
        }
        data.notes[id].vote.push(tempObj);
      }
      return {
        ...state,
        data,
      };
    },
    // 删除某行投票
    delVote(state, { payload: i, j }) {
      var data = state;
      data.notes[i].vote.splice(j, 1);
      return {
        ...state,
        data,
      };
    },
    // 确定当前投票组
    changeVoteStatus(state, { payload: status, id }) {
      var arr = state.notes;
      arr.forEach(item => {
        item.voteStatus = 0;
      });
      arr[id].voteStatus = status;
      return {
        ...state,
        notes: arr,
        voteStatus: status,
      };
    },
    addNote(state) {
      var arr = state.notes;
      var len = arr.length;
      arr.push({ id: len, voteStatus: 0, title: '第' + len + '天', vote: [] });
      return {
        ...state,
        notes: arr,
      };
    },
  },
};
