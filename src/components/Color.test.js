import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const exampleColor = {
    color: 'red',
    code: {
        hex: '#ff0000'
    },
    id: 1
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{ color: '', code: { hex: '' } }} />)
});

test("Renders the color passed into component", () => {
    render(<Color color={exampleColor} />)
    expect(screen.getByText(/red/i)).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockDeleteColor = jest.fn();
    const mockToggleEdit = jest.fn();
    render(<Color color={exampleColor} deleteColor={mockDeleteColor} toggleEdit={mockToggleEdit} />);
    const deleteButton = screen.getByTestId("delete");

    userEvent.click(deleteButton);

    expect(mockDeleteColor.mock.calls.length).toBe(1);
    expect(mockToggleEdit.mock.calls.length).toBe(1);

});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockEditColor = jest.fn();
    const mockToggleEdit = jest.fn();
    render(<Color color={exampleColor} setEditColor={mockEditColor} toggleEdit={mockToggleEdit} />)
    const colorDiv = screen.getByTestId("color");

    userEvent.click(colorDiv);

    expect(mockEditColor.mock.calls.length).toBe(1);
    expect(mockToggleEdit.mock.calls.length).toBe(1);
});