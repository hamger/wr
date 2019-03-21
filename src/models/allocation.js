export default {
  namespace: 'allocation',

  state: {
    amount: 12,
    configBase: [
      {
        id: 0,
        title: '平民',
        number: 4,
      },
      {
        id: 1,
        title: '狼人',
        number: 4,
      },
    ],
    configGod: [
      {
        id: 0,
        title: '预言家',
        select: true,
      },
      {
        id: 1,
        title: '女巫',
        select: true,
      },
      {
        id: 2,
        title: '猎人',
        select: true,
      },
      {
        id: 3,
        title: '白痴',
        select: true,
      },
      {
        id: 4,
        title: '守卫',
        select: false,
      },
      {
        id: 5,
        title: '白狼王',
        select: false,
      },
      {
        id: 6,
        title: '骑士',
        select: false,
      },
      {
        id: 7,
        title: '替罪羊',
        select: false,
      },
      {
        id: 8,
        title: '长老',
        select: false,
      },
      {
        id: 9,
        title: '丘比特',
        select: false,
      },
      {
        id: 10,
        title: '驯熊师',
        select: false,
      },
    ],
  },

  reducers: {
    save(state, { payload: configBase, configGod, amount }) {
      return {
        ...state,
        configBase: configBase,
        configGod: configGod,
        amount: amount,
      };
    },
  },
};
