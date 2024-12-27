import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '@/components/Button';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn().mockReturnValue('blue'),
}));

describe('Button Component', () => {
  it('1. Should render correctly with primary theme', () => {
    const { getByTestId } = render(
      <Button label="Primary Button" theme="primary" />
    );
    const button = getByTestId('button');

    expect(button).toBeTruthy();

    // Получаем стили из кнопки
    const styles = button.props.style;

    // Проверяем, что один из объектов стилей содержит borderColor: 'blue'
    expect(styles).toContainEqual(
      expect.objectContaining({ borderColor: 'blue' })
    );
  });

  it('2. Should render correctly with secondary theme', () => {
    const { getByTestId } = render(
      <Button label="Secondary Button" theme="secondary" />
    );
    const button = getByTestId('button');

    expect(button).toBeTruthy();

    // Получаем стили из кнопки
    const styles = button.props.style;

    // Проверяем, что один из объектов стилей содержит backgroundColor: '#e9e9e9'
    expect(styles).toContainEqual(
      expect.objectContaining({ backgroundColor: '#e9e9e9' })
    );
  });

  it('3. Should render correctly without theme', () => {
    const { getByTestId } = render(<Button label="Default Button" />);
    const button = getByTestId('button');

    expect(button).toBeTruthy();
  });

  it('4. Should call onPress function when button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button label="Press Me" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Press Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('5. Should apply dynamic styles based on Pressable state', () => {
    const { getByTestId } = render(
      <Button
        label="Dynamic Style Button"
        style={() => ({ backgroundColor: 'red' })}
      />
    );

    const button = getByTestId('button');
    const styles = button.props.style;

    // Проверяем, что один из объектов стилей содержит backgroundColor: 'red'
    expect(styles).toContainEqual(
      expect.objectContaining({ backgroundColor: 'red' })
    );
  });
});
