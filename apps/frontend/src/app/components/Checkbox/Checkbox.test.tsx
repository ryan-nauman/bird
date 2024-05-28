import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox component', () => {
  it('renders correctly with screen reader label', () => {
    const onChange = jest.fn();
    render(
      <Checkbox
        checked={true}
        onChange={onChange}
        screenReaderLabel="Checkbox label"
      />
    );
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Checkbox label');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('checked');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('srOnly');
  });

  it('renders correctly without screen reader label', () => {
    const onChange = jest.fn();
    render(
      <Checkbox
        screenReaderLabel={undefined}
        checked={false}
        onChange={onChange}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    const label = screen.queryByRole('label');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveAttribute('checked');
    expect(label).not.toBeInTheDocument();
  });

  it('changes indeterminate state when prop is updated', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Checkbox checked={false} indeterminate={false} onChange={onChange} />
    );
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toHaveAttribute('aria-checked', 'mixed');
    rerender(<Checkbox checked={false} indeterminate={true} />);
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('calls onChange handler when clicked', async () => {
    const onChange = jest.fn();
    render(<Checkbox checked={false} onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
