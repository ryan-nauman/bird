import { Checkbox } from '../Checkbox/Checkbox';
import { DownloadButton } from './DownloadButton';
import { ThreatData } from './ThreatTable';
import styles from './ThreatTable.module.scss';

type CheckHandler = (params: { checked: boolean }) => void;

export type ToolbarProps = {
  checkStatus: 'indeterminate' | 'checked' | 'unchecked';
  onCheck: CheckHandler;
  numberOfSelected: number;
  selected: Array<ThreatData>;
};

export function Toolbar(props: ToolbarProps) {
  const { checkStatus, onCheck, numberOfSelected, selected } = props;

  return (
    <div className={styles.toolbar}>
      <div className="selected-status">
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
      {numberOfSelected > 0 && <DownloadButton selected={selected} />}
    </div>
  );
}
