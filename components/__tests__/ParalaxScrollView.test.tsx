import React from 'react';
import { render} from '@testing-library/react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native';

describe('ParallaxScrollView', () => {
  const headerImage = <ThemedView style={{ width: 100, height: 100 }} />;
  const headerBackgroundColor = { light: 'white', dark: 'black' };

  it('renders correctly with children', () => {
    const { getByTestId } = render(
      <ParallaxScrollView
        headerImage={headerImage}
        headerBackgroundColor={headerBackgroundColor}
      >
        <Text>Test Content</Text>
      </ParallaxScrollView>
    );

    const scrollView = getByTestId('parallax-scroll-view'); 
    expect(scrollView).toBeTruthy();
  });
});
