import React from 'react';
import CheckboxWithLabel from './CheckboxWithLabel';
import { render, screen, fireEvent } from '@testing-library/react'

const onChange = jest.fn();

describe('Checkbox tests', () => {
  it('Checkbox should  be defined', () => {
    render(
      <CheckboxWithLabel
        label='hello world'
        checked={false}
        onChange={onChange}
      />
    );
    const firstTitle = screen.getByText(/hello world/i)
    expect(firstTitle).toBeDefined();
  });
});
