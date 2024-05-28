import { ColumnTemplateProps } from './DataTable';
import styles from './ColumnStatus.module.scss';
import { Circle } from 'lucide-react';

export function ColumnStatus(props: ColumnTemplateProps) {
  const { columnProps, data } = props;
  let value,
    fill = '';
  try {
    value = (data as any)[columnProps.key];
  } catch (e) {
    // TODO: report error/warning to telemetry
  }

  switch (value) {
    case 'available':
      fill = '#81d434';
      break;
    default:
      fill = 'none';
      break;
  }

  return (
    <span className={styles.column}>
      <Circle className="icon" fill={fill} stroke="none" />
      <span className="status">{value}</span>
    </span>
  );
}
