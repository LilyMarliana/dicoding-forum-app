import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

/**
 * skenario pengujian VoteButton
 *
 * - VoteButton
 *   - should render upCount and downCount correctly
 *   - should call onUpVote when up vote button is clicked
 *   - should call onDownVote when down vote button is clicked
 *   - should apply active class to up vote button when isUpVoted is true
 *   - should disable both buttons when disabled prop is true
 */
describe('VoteButton', () => {
  it('should render upCount and downCount correctly', () => {
    render(
        <VoteButton
          upCount={5}
          downCount={2}
          isUpVoted={false}
          isDownVoted={false}
          onUpVote={() => {}}
          onDownVote={() => {}}
        />,
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should call onUpVote when up vote button is clicked', async () => {
    const onUpVote = vi.fn();
    const user = userEvent.setup();

    render(
        <VoteButton
          upCount={0}
          downCount={0}
          isUpVoted={false}
          isDownVoted={false}
          onUpVote={onUpVote}
          onDownVote={() => {}}
        />,
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call onDownVote when down vote button is clicked', async () => {
    const onDownVote = vi.fn();
    const user = userEvent.setup();

    render(
        <VoteButton
          upCount={0}
          downCount={0}
          isUpVoted={false}
          isDownVoted={false}
          onUpVote={() => {}}
          onDownVote={onDownVote}
        />,
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);

    expect(onDownVote).toHaveBeenCalledTimes(1);
  });

  it('should apply active class to up vote button when isUpVoted is true', () => {
    render(
        <VoteButton
          upCount={1}
          downCount={0}
          isUpVoted={true}
          isDownVoted={false}
          onUpVote={() => {}}
          onDownVote={() => {}}
        />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('vote-btn-active');
    expect(buttons[1]).not.toHaveClass('vote-btn-active');
  });

  it('should disable both buttons when disabled prop is true', () => {
    render(
        <VoteButton
          upCount={0}
          downCount={0}
          isUpVoted={false}
          isDownVoted={false}
          onUpVote={() => {}}
          onDownVote={() => {}}
          disabled={true}
        />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });
});