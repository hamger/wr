import React from 'react';
import styles from './VoteInput.less';

const VoteInput = ({ voter, votee }) => {
  return (
    <p className={styles.voteMark}>
      <span>{voter}</span>
      {votee === '弃票' ? ' ' : ' 投 '}
      <span>{votee}</span>
    </p>
  );
};

VoteInput.propTypes = {};

export default VoteInput;
