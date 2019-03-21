import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.less';

function App() {
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>
          <Link to="/allocation">设置配置</Link>
        </li>
        <li>
          <Link to="/record">记录本局</Link>
        </li>
        <li>
          <Link to="/about">关于</Link>
        </li>
      </ul>
    </div>
  );
}

App.propTypes = {};

export default connect()(App);
