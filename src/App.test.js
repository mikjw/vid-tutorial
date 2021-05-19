import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main page title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Vid-Tutorial/i);
  expect(linkElement).toBeInTheDocument();
});
