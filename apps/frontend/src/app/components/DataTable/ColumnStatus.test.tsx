import { render, screen } from '@testing-library/react';
import { ColumnStatus } from './ColumnStatus';

describe('ColumnStatus', () => {
  const columnProps = {
    key: 'status',
    title: 'Status',
  };

  const dataAvailable = {
    status: 'available',
  };

  const dataUnavailable = {
    status: 'unavailable',
  };

  it('renders correctly with available status', () => {
    render(<ColumnStatus columnProps={columnProps} data={dataAvailable} />);
    const icon = screen.getByRole('img', { hidden: true });
    const status = screen.getByText('available');

    expect(icon).toHaveAttribute('fill', '#81d434');
    expect(status).toBeInTheDocument();
  });

  it('renders correctly with unavailable status', () => {
    render(<ColumnStatus columnProps={columnProps} data={dataUnavailable} />);
    const icon = screen.getByRole('img', { hidden: true });
    const status = screen.getByText('unavailable');

    expect(icon).toHaveAttribute('fill', 'none');
    expect(status).toBeInTheDocument();
  });

  it('renders correctly with unknown status', () => {
    const { container } = render(
      <ColumnStatus columnProps={columnProps} data={{}} />
    );
    const icon = screen.getByRole('img', { hidden: true });
    const status = container.querySelector('.status');

    expect(icon).toHaveAttribute('fill', 'none');
    expect(status).toBeEmptyDOMElement();
  });
});
