import Room from "../page";
import React from 'react';
import { render } from '@testing-library/react';


describe('With React Testing Library', () => {

    it('Shows "Hello world!"', () => {
        const { getByText } = render(
            <Room/>
        );

        expect(getByText('Select Room type')).toBeInTheDocument();
    });
});