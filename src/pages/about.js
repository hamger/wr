import styles from './about.less';
import Link from 'umi/link';
import { Button } from 'antd';

const About = () => {
  return (
    <div className={styles.normal}>
      <h2 className={styles.title}>WR is a short name of wereworfkill-recorder.</h2>
      <div>
        Author: <b>Hanger</b>
      </div>
      <div>
        你可以到这里提建议：
        <a href="https://github.com/hamger/werewolfkill-recorder/issues" target="brank">
          Github
        </a>
      </div>
      <Button>
        <Link to="/">返回</Link>
      </Button>
    </div>
  );
};

About.propTypes = {};

export default About;
