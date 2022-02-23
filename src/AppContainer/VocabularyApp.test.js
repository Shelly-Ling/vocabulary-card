import { render, screen } from '@testing-library/react';
import VocabularyApp from './VocabularyApp';

test('renders learn react link', () => {
  render(<VocabularyApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
