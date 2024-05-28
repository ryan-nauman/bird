'use client';

import { useState } from 'react';
import { ColumnStatus } from '../DataTable/ColumnStatus';
import { CHECKED_KEY, Column, DataTable } from '../DataTable/DataTable';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './ThreatTable.module.scss';
import { Toolbar, ToolbarProps } from './Toolbar';

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

export type ThreatData = {
  name: string;
  device: string;
  path: string;
  status: 'scheduled' | 'available';
  [CHECKED_KEY]?: boolean;
};

type ThreatTableProps = {
  data: Array<ThreatData>;
};

export function ThreatTable(props: ThreatTableProps) {
  const { data: rawData } = props;
  const [data, setData] = useState([...rawData]);
  const selected = data.filter((item) => item[CHECKED_KEY]);
  const numberOfSelected = selected.length;

  let checkStatus: ToolbarProps['checkStatus'] = 'unchecked';
  if (numberOfSelected > 0 && data.length !== numberOfSelected) {
    checkStatus = 'indeterminate';
  } else if (numberOfSelected > 0 && data.length === numberOfSelected) {
    checkStatus = 'checked';
  }

  return (
    <div className={styles.table}>
      <Toolbar
        checkStatus={checkStatus}
        onCheck={(e) => {
          if (e.checked) {
            setData((prevData) => {
              const newData = [...prevData];
              newData.forEach((item) => (item[CHECKED_KEY] = true));
              return newData;
            });
          } else {
            setData((prevData) => {
              const newData = [...prevData];
              newData.forEach((item) => (item[CHECKED_KEY] = false));
              return newData;
            });
          }
        }}
        numberOfSelected={numberOfSelected}
        selected={selected}
      />
      <DataTable
        columns={columns}
        rows={data}
        selectable
        onCheck={(e) => {
          setData((prevData) => {
            const newData = [...prevData];
            newData[e.index] = {
              ...newData[e.index],
              [CHECKED_KEY]: e.checked,
            };
            return newData;
          });
        }}
      />
    </div>
  );
}
