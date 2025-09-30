import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ChatWindow component', () => {
  render(<App />);
  const chatWindowElement = screen.getByTestId('chat-window'); 
  expect(chatWindowElement).toBeInTheDocument();
});