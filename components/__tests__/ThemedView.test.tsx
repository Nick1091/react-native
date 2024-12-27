import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedView } from '../ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));


describe('ThemedView', () => {
  it('renders with light color', () => {
    (useThemeColor as jest.Mock).mockReturnValue('red');

    const { getByTestId } = render(
      <ThemedView lightColor="light"/>
    );


    const button = getByTestId('themed-view-id');
    const styles = button.props.style;
    expect(styles).toContainEqual(
      expect.objectContaining({ backgroundColor: 'red' })
    );
  });
});
