import React from 'react';
import {render, screen} from '@testing-library/react'
import BadgeRe from "./BadgeRe";
describe('Badge tests', () => {
    it('Badge should  be defined', () => {
        render(
            <BadgeRe badgeColor={"blue"} component={'Value'}/>
        );
        const firstTitle = screen.getByText(/Value/i)
        expect(firstTitle).toBeDefined();
    })
});