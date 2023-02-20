import Card from './Card';
import { vi } from 'vitest';
import { render } from '@testing-library/react';

describe('Card component', () => {
  it('should renders children prop', () => {
    const { getByText } = render(<Card>card content</Card>);
    const cardElement = getByText('card content');
    expect(cardElement).toBeInTheDocument();
  });
});

