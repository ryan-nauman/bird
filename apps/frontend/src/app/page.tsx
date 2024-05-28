import { ThreatData, ThreatTable } from './components/ThreatTable/ThreatTable';
import { data } from './data';
import styles from './page.module.scss';

export default function Index() {
  return (
    <div className={styles.page}>
      <ThreatTable data={data as Array<ThreatData>} />
    </div>
  );
}
