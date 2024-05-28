import { Download } from 'lucide-react';
import styles from './ThreatTable.module.scss';
import { ThreatData } from './ThreatTable';

type DownloadButtonProps = {
  selected: Array<ThreatData>;
};

export function DownloadButton(props: DownloadButtonProps) {
  const { selected } = props;
  const downloadable = selected.filter((item) => item.status === 'available');

  const onClick = () => {
    const content = downloadable.map((item) => ({
      path: item.path,
      device: item.device,
    }));
    alert(JSON.stringify(content, null, 2));
  };

  return (
    <button className={styles.downloadButton} onClick={onClick}>
      <Download className="icon" />
      <span>Download Selected</span>
      {downloadable.length === 0 && (
        <em>
          Warning: none of the selected items can be downloaded as this time
        </em>
      )}
      {downloadable.length > 0 && downloadable.length !== selected.length && (
        <em>
          Warning: some of the selected items can be downloaded as this time
        </em>
      )}
    </button>
  );
}
