import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import {
  Button,
  Input,
  Checkbox,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Modal,
} from '../components';
import Accordion, { AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/Accordion';

describe('Phase 4 Core Components', () => {
  describe('Button Component', () => {
    it('renders with label and handles onClick', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders disabled state and prevents click', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders loading state with spinner and accessible aria attributes', () => {
      render(<Button isLoading>Loading Action</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('renders as Link when to prop is passed', () => {
      render(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Button to="/services">Go to Services</Button>
        </BrowserRouter>
      );
      const link = screen.getByRole('link', { name: /go to services/i });
      expect(link).toHaveAttribute('href', '/services');
    });

    it('renders as external anchor when href prop is passed', () => {
      render(<Button href="https://example.com" external>External Site</Button>);
      const link = screen.getByRole('link', { name: /external site/i });
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Form Controls', () => {
    it('renders Input with accessible label and handles typing', () => {
      const handleChange = vi.fn();
      render(
        <Input
          id="email-test"
          label="Email Address"
          type="email"
          placeholder="user@example.com"
          onChange={handleChange}
        />
      );
      const input = screen.getByLabelText(/email address/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'user@example.com');

      fireEvent.change(input, { target: { value: 'patient@healix.com' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('renders Input error message with aria-invalid', () => {
      render(
        <Input
          id="err-test"
          label="Full Name"
          error="This field is required"
        />
      );
      const input = screen.getByLabelText(/full name/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('renders Checkbox and handles state toggles', () => {
      const handleToggle = vi.fn();
      render(
        <Checkbox
          id="consent-check"
          label="I agree to the privacy policy"
          onChange={handleToggle}
        />
      );
      const checkbox = screen.getByLabelText(/i agree to the privacy policy/i);
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(handleToggle).toHaveBeenCalled();
    });
  });

  describe('Badge Component', () => {
    it('renders variant and icon correctly', () => {
      render(<Badge variant="success">Verified</Badge>);
      expect(screen.getByText('Verified')).toBeInTheDocument();
    });
  });

  describe('Card Component Compound Structure', () => {
    it('renders composite card structure', () => {
      render(
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Clinical Excellence</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Healix provides world-class surgical care.</p>
          </CardContent>
        </Card>
      );
      expect(screen.getByText('Clinical Excellence')).toBeInTheDocument();
      expect(screen.getByText('Healix provides world-class surgical care.')).toBeInTheDocument();
    });
  });

  describe('Accordion Component', () => {
    it('toggles accordion content expansion on trigger click', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger id="trigger-1">What is Healix Care?</AccordionTrigger>
            <AccordionContent>Healix is a next-generation healthcare platform.</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /what is healix care/i });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Healix is a next-generation healthcare platform.')).toBeInTheDocument();

      // Click to collapse
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Modal Component', () => {
    it('renders modal dialog when isOpen is true and closes via close button', () => {
      const handleClose = vi.fn();
      render(
        <Modal
          isOpen={true}
          onClose={handleClose}
          title="Patient Intake Form"
        >
          <p>Please enter your clinical details.</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Patient Intake Form')).toBeInTheDocument();
      expect(screen.getByText('Please enter your clinical details.')).toBeInTheDocument();

      const closeButton = screen.getByLabelText(/close dialog/i);
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not render modal when isOpen is false', () => {
      render(
        <Modal
          isOpen={false}
          onClose={() => {}}
          title="Hidden Modal"
        >
          <p>Hidden Content</p>
        </Modal>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
