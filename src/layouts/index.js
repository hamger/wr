import styles from './index.css';

function BasicLayout(props) {
  if (props.location.pathname === '/') {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Welcome to WR!</h1>
        {props.children}
      </div>
    );
  } else {
    return <div>{props.children}</div>;
  }
}

export default BasicLayout;
