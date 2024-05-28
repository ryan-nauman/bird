import { ThreatTable } from './components/ThreatTable/ThreatTable';
import { data } from './data';
import styles from './page.module.scss';

export default function Index() {
  return (
    <div className={styles.page}>
      <ThreatTable data={data} />
    </div>
  );
}
