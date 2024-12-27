import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Collapsible } from '@/components/Collapsible';
import { Text } from 'react-native';

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

describe('Collapsible Component', () => {
  it('1. Should render with initial collapsed state', () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Test Title">
        <Text>Test Content</Text>
      </Collapsible>
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(queryByText('Test Content')).toBeNull();
  });

  it('2. Should toggle content visibility on press', () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Test Title">
        <Text>Test Content</Text>
      </Collapsible>
    );
    expect(queryByText('Test Content')).toBeNull();
    fireEvent.press(getByText('Test Title'));
    expect(queryByText('Test Content')).toBeTruthy();
    fireEvent.press(getByText('Test Title'));
    expect(queryByText('Test Content')).toBeNull();
  });
});
