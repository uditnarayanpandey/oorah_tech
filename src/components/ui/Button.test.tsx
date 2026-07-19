import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders children and defaults to the primary/md variant classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
  });

  it('applies the requested variant and size', () => {
    render(
      <Button variant="outline" size="lg">
        Learn more
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Learn more' })).toHaveClass(
      'btn-outline',
      'btn-lg',
    );
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
