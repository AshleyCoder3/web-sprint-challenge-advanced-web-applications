import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen } from "@testing-library/react";
import BubblePage from './BubblePage';
import { exampleColors } from './ColorList.test'
import fetchColorService from '../services/fetchColorService';

jest.mock("../services/fetchColorService");

test("Renders without errors", () => {
    fetchColorService.mockResolvedValueOnce({ exampleColors })
    render(<BubblePage />)
});

test("Renders appropriate number of colors passed in through mock", async () => {
    fetchColorService.mockResolvedValueOnce({ data: exampleColors })
    //Keep in mind that our service is called on mount for this component.
    render(<BubblePage />)
    const color = await screen.findAllByTestId('color')
    expect(color).toHaveLength(4)
});