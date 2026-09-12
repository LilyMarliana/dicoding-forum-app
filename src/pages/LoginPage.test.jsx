import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import LoginPage from './LoginPage';
import * as reactRedux from 'react-redux';
import {asyncSetAuthUser} from '../states/authUser/action';

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock('../states/authUser/action', () => ({
  asyncSetAuthUser: vi.fn(),
}));

/**
 * skenario pengujian LoginPage
 *
 * - LoginPage
 *   - should display login form when user is not authenticated
 *   - should call dispatch with asyncSetAuthUser thunk when form is submitted
 */
describe('LoginPage', () => {
  beforeEach(() => {
    reactRedux.useSelector.mockImplementation(
        (selector) => selector({authUser: null}),
    );
  });

  it('should display login form when user is not authenticated', () => {
    reactRedux.useDispatch.mockReturnValue(vi.fn());

    render(<LoginPage />, {wrapper: MemoryRouter});

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Login'})).toBeInTheDocument();
  });

  it('should call dispatch with asyncSetAuthUser thunk when form is submitted', async () => {
    const dispatch = vi.fn();
    reactRedux.useDispatch.mockReturnValue(dispatch);
    const user = userEvent.setup();

    render(<LoginPage />, {wrapper: MemoryRouter});

    await user.type(screen.getByLabelText('Email'), 'marliana@mail.com');
    await user.type(screen.getByLabelText('Password'), 'rahasia123');
    await user.click(screen.getByRole('button', {name: 'Login'}));

    expect(asyncSetAuthUser).toHaveBeenCalledWith({
      email: 'marliana@mail.com',
      password: 'rahasia123',
    });
    expect(dispatch).toHaveBeenCalled();
  });
});
