import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import { vi } from 'vitest';

// Test if the Button component correctly renders its children
describe('Button component', () => {
  it('renders the children prop', () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonElement = getByText('Hello');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick prop when clicked', () => {
    const onClickMock = vi.fn();
    const { getByLabelText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const buttonElement = getByLabelText('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('disables the button when the disabled prop is true', () => {
    const { getByLabelText } = render(<Button disabled>Disabled button</Button>);
    const buttonElement = getByLabelText('button') as HTMLButtonElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('renders the correct type prop', () => {
    const { getByLabelText } = render(<Button type="submit">Submit button</Button>);
    const buttonElement = getByLabelText('button') as HTMLButtonElement;
    expect(buttonElement.type).toBe('submit');
  });
});
