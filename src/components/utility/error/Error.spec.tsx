import React from 'react';
import { render } from '@testing-library/react';
import Error from './Error';

describe('Error component', () => {
  it('should renders the provided error message', () => {
    const errorMessage = 'This is an error message.';
    const { getByText } = render(<Error>{errorMessage}</Error>);
    const errorElement = getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
