import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThreatData, ThreatTable } from './ThreatTable';

describe('ThreatTable integration tests', () => {
  let mockData: ThreatData[];

  beforeEach(() => {
    mockData = [
      {
        name: 'Threat 1',
        device: 'Device A',
        path: '/path/1',
        status: 'scheduled',
      },
      {
        name: 'Threat 2',
        device: 'Device B',
        path: '/path/2',
        status: 'available',
      },
    ];
  });

  it('renders correctly with initial data', () => {
    render(<ThreatTable data={mockData} />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockData.length + 1); // +1 for the header row
  });

  it('selects all rows when toolbar checkbox is clicked', async () => {
    render(<ThreatTable data={mockData} />);
    const toolbarCheckbox = screen.getByLabelText(
      'Toggle selection of all items'
    );
    await userEvent.click(toolbarCheckbox);

    const rowCheckboxes = screen.getAllByLabelText('Toggle row selection');
    rowCheckboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  it('updates data when individual row checkbox is clicked', async () => {
    render(<ThreatTable data={mockData} />);
    const firstRowCheckbox = screen.getAllByLabelText(
      'Toggle row selection'
    )[0];
    await userEvent.click(firstRowCheckbox);

    const updatedData = screen.getByRole('table').querySelectorAll('tbody tr');
    expect(updatedData[0]).toHaveClass('selected');
  });
});
