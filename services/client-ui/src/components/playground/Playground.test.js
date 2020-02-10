import React from 'react';
import { render } from '@testing-library/react';
import Playground from './Playground';

test('renders learn react link', () => {
  const { getByText } = render(<Playground />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});