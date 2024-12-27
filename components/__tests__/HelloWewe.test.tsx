import React from 'react';
import { render } from '@testing-library/react-native';
import { HelloWave } from '@/components/HelloWave';
import { Text } from 'react-native';

describe('HelloWave Component', () => {
  it('1. Should render correctly with wave emoji', () => {
    const { getByText } = render(<HelloWave />);
    expect(getByText('👋')).toBeTruthy();
  });
});
