'use client';

import { useState } from 'react';
import { ColumnStatus } from '../DataTable/ColumnStatus';
import { CHECKED_KEY, Column, DataTable } from '../DataTable/DataTable';

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

type ThreatTableProps = {
  data: Array<object>;
};

export function ThreatTable(props: ThreatTableProps) {
  const { data: rawData } = props;
  const [data, setData] = useState([...rawData]);

  return (
    <div>
      <span>Threats</span>
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
