import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThreatData } from '../ThreatTable/ThreatTable';
import { CHECKED_KEY, DataTable, DataTableProps } from './DataTable';

describe('DataTable', () => {
  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'device', title: 'device' },
    { key: 'status', title: 'Status' },
  ];

  const rows: Array<ThreatData> = [
    {
      name: 'smss.exe',
      device: 'Mario',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'scheduled',
    },
    {
      name: 'netsh.exe',
      device: 'Luigi',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
      status: 'available',
    },
  ];

  const props: DataTableProps = {
    columns,
    rows,
    selectable: true,
    onCheck: jest.fn(),
  };

  it('renders table with correct number of rows and columns', () => {
    const { getAllByRole } = render(<DataTable {...props} />);
    const tableRows = getAllByRole('row');

    // one additional row for the table header
    expect(tableRows.length).toBe(rows.length + 1);

    tableRows.forEach((row) => {
      const cells = row.querySelectorAll('th,td');
      // one additional col for checkbox
      expect(cells.length).toBe(columns.length + 1);
    });
  });

  it('calls onCheck when checkbox is clicked', async () => {
    render(<DataTable {...props} />);
    const checkbox = screen.getAllByLabelText('Toggle row selection');
    await userEvent.click(checkbox[0]);

    expect(props.onCheck).toHaveBeenCalledWith(
      expect.objectContaining({
        checked: true,
        data: expect.objectContaining({
          device: 'Mario',
        }),
        index: 0,
      })
    );
  });

  it('applies selected class to row when row is checked', () => {
    const checkedRow = { ...rows[0], [CHECKED_KEY]: true };
    const { getByText } = render(
      <DataTable {...props} rows={[checkedRow, ...rows.slice(1)]} />
    );
    const selectedRow = getByText('Mario').parentElement;

    expect(selectedRow).toHaveClass('selected');
  });
});
