import { Checkbox } from '../Checkbox/Checkbox';
import styles from './ThreatTable.module.scss';

type CheckHandler = (params: { checked: boolean }) => void;

export type ToolbarProps = {
  checkStatus: 'indeterminate' | 'checked' | 'unchecked';
  onCheck: CheckHandler;
  numberOfSelected: number;
};

export function Toolbar(props: ToolbarProps) {
  const { checkStatus, onCheck, numberOfSelected } = props;

  return (
    <div className={styles.toolbar}>
      <Checkbox
        indeterminate={checkStatus === 'indeterminate'}
        onChange={(e) => {
          onCheck({ checked: e.target.checked });
        }}
        checked={checkStatus === 'checked'}
      />
      <span>
        {numberOfSelected > 0
          ? `Selected ${numberOfSelected}`
          : 'None Selected'}
      </span>
    </div>
  );
}
