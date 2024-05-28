import { ColumnStatus } from './components/DataTable/ColumnStatus';
import { Column, DataTable } from './components/DataTable/DataTable';
import { data } from './data';
import styles from './page.module.scss';

export default function Index() {
  const columns: Array<Column> = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'device',
      title: 'Device',
    },
    {
      key: 'path',
      title: 'Path',
    },
    {
      key: 'status',
      title: 'Status',
      template: (props) => <ColumnStatus {...props} />,
    },
  ];

  return (
    <div className={styles.page}>
      <DataTable columns={columns} rows={data} selectable />
    </div>
  );
}
