import Header from "../Header";
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Header test', () => {

    it('Render the right way the Header"', () => {
      render(<Header/>);
      const aTag = screen.getByLabelText('Github')
      expect(aTag).toBeInTheDocument
      expect(screen.getByText('redesigner.io')).toBeInTheDocument();
    });
});