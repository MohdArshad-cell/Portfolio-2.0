import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

// Mock the typed.js library so it doesn't break our test
jest.mock('typed.js', () => {
  return jest.fn().mockImplementation(() => {
    return { destroy: jest.fn() };
  });
});

describe('Hero Component', () => {
  it('renders the architect name', () => {
    render(<Hero />)
    
    // Check if your name renders
    const heading = screen.getByText(/MOHD/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the download CV link', () => {
    render(<Hero />)
    
    // Check if the CV link exists
    const cvLink = screen.getByText(/DOWNLOAD_CV/i)
    expect(cvLink).toBeInTheDocument()
  })
})