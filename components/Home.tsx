import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useGetArticlesQuery, useDeleteMutation } from '@/api';
import { Router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Home from '@/app';

jest.mock('@/api', () => ({
  useGetArticlesQuery: jest.fn(),
  useDeleteMutation: jest.fn(),
}));
jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('<Home />', () => {
  beforeEach(() => {
    (useGetArticlesQuery as jest.Mock).mockReturnValue({
      data: [
        { uid: '1', title: 'Article 1' },
        { uid: '2', title: 'Article 2' },
      ],
    });

    (useDeleteMutation as jest.Mock).mockReturnValue([jest.fn()]);
  });

  it('renders correctly when there are articles', async () => {
    const { getByText } = render(<Home />);

    expect(getByText('Article 1')).toBeTruthy();
    expect(getByText('Article 2')).toBeTruthy();
  });

  it('navigates to article creation page when the "Create your own article" link is clicked', () => {
    const { getByText } = render(<Home />);
    const link = getByText('Create your own article');

    const mockPush = jest.fn();
    jest
      .spyOn(require('expo-router'), 'useRouter')
      .mockReturnValue({ push: mockPush });

    fireEvent.press(link);

    expect(mockPush).toHaveBeenCalledWith('/articles/create');
  });

  it('navigates to the edit page when edit button is pressed', () => {
    const { getByTestId } = render(<Home />);
    const editButton = getByTestId('edit-1');

    const mockPush = jest.fn();
    jest
      .spyOn(require('expo-router'), 'useRouter')
      .mockReturnValue({ push: mockPush });

    fireEvent.press(editButton);

    expect(mockPush).toHaveBeenCalledWith('/articles/edit/1');
  });

  it('calls deleteArticle when delete button is pressed', async () => {
    const { getByTestId } = render(<Home />);
    const deleteButton = getByTestId('delete-1');

    fireEvent.press(deleteButton);

    expect(useDeleteMutation()[0]).toHaveBeenCalledWith('1');
  });
});
