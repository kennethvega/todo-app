import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <Container>
        <p>Test content</p>
      </Container>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });
});
