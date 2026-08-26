import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';
import BackToTop from '@/components/BackToTop';

describe('Component Smoke Tests', () => {
  it('renders the Hero component successfully', () => {
    render(<Hero />);
    // Check if the main heading is present (MOHD ARSHAD)
    expect(screen.getByText(/MOHD/i)).toBeInTheDocument();
  });

  it('renders the BackToTop component without crashing', () => {
    const { container } = render(<BackToTop />);
    expect(container).toBeInTheDocument();
  });
});
