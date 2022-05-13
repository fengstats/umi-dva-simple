import styles from './index.less';
// 国际化显示时间描述
import 'moment/locale/zh-cn';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
