import styles from './DataTable.module.scss';

export type ColumnTemplateProps = {
  columnProps: Column;
  data: object;
};

export type Column = {
  key: string;
  title: string;
  template?: (props: ColumnTemplateProps) => React.ReactNode;
};

export type DataTableProps = {
  columns: Array<Column>;
  rows: Array<object>;
  selectable: boolean;
};

export function DataTable(props: DataTableProps) {
  const { columns, rows, selectable } = props;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {/* th keys in case re-ordering/other dynamic behavior is added */}
          {selectable && <th key={`th-selectable`} />}
          {columns.map((c) => (
            <th key={`th-${c.key}`}>{c.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {selectable && (
              <td key={`td-selectable-${rowIndex}`}>
                <input type="checkbox" />
              </td>
            )}
            {columns.map((column) => {
              let rowKeys: Array<string> = [];
              try {
                rowKeys = Object.keys(row);
              } catch (e) {
                // TODO: report error/warning to telemetry
              }

              if (!rowKeys.includes(column.key)) {
                return <td key={column.key}></td>;
              }

              return (
                <td key={column.key}>
                  {column.template
                    ? column.template({ columnProps: column, data: row })
                    : (row as any)[column.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}