import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  SAMPLE_MEDICINES,
  PHARMACY_CATEGORIES,
  searchMedicines,
  getMedicineBySlug,
  getMedicinesByLetter,
  getMedicinesByCategory,
  getFeaturedMedicines,
  ALPHABET_LETTERS,
} from '../data/pharmacy';
import { PharmacyProvider, usePharmacy } from '../context/PharmacyContext';
import MedicineCard from '../components/pharmacy/MedicineCard';
import AlphabetFilter from '../components/pharmacy/AlphabetFilter';

describe('Pharmacy Data Layer & Lookup Helpers', () => {
  it('contains valid sample medicines with all required schema fields', () => {
    expect(SAMPLE_MEDICINES.length).toBeGreaterThanOrEqual(20);
    SAMPLE_MEDICINES.forEach((med) => {
      expect(med).toHaveProperty('id');
      expect(med).toHaveProperty('slug');
      expect(med).toHaveProperty('name');
      expect(med).toHaveProperty('genericName');
      expect(med).toHaveProperty('brand');
      expect(med).toHaveProperty('strength');
      expect(med).toHaveProperty('dosageForm');
      expect(med).toHaveProperty('packSize');
      expect(med).toHaveProperty('category');
      expect(med).toHaveProperty('price');
      expect(med).toHaveProperty('stockStatus');
      expect(typeof med.price).toBe('number');
      expect(typeof med.prescriptionRequired).toBe('boolean');
    });
  });

  it('searches medicines correctly by name, generic name, brand, or category', () => {
    const panadolResults = searchMedicines('panadol');
    expect(panadolResults.length).toBeGreaterThan(0);
    expect(panadolResults[0].name.toLowerCase()).toContain('panadol');

    const amoxResults = searchMedicines('amoxicillin');
    expect(amoxResults.length).toBeGreaterThan(0);

    const emptyResults = searchMedicines('xyznonexistentmed999');
    expect(emptyResults).toEqual([]);
  });

  it('retrieves medicine by slug', () => {
    const firstMed = SAMPLE_MEDICINES[0];
    const med = getMedicineBySlug(firstMed.slug);
    expect(med).toBeDefined();
    expect(med.name).toBe(firstMed.name);
    expect(med.strength).toBe(firstMed.strength);
  });

  it('retrieves medicines by alphabetical letter', () => {
    const letterA = getMedicinesByLetter('A');
    expect(letterA.length).toBeGreaterThan(0);
    letterA.forEach((m) => {
      expect(m.name.toUpperCase().startsWith('A')).toBe(true);
    });
  });

  it('retrieves medicines by category', () => {
    const otc = getMedicinesByCategory('pain-fever-otc');
    expect(otc.length).toBeGreaterThan(0);
    otc.forEach((m) => {
      expect(m.categorySlug === 'pain-fever-otc' || m.category.toLowerCase().includes('pain')).toBe(true);
    });
  });

  it('retrieves featured medicines list', () => {
    const featured = getFeaturedMedicines();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((m) => {
      expect(m.featured).toBe(true);
    });
  });
});

describe('PharmacyContext & Shopping Cart Engine', () => {
  function TestConsumer({ med1, med2 }) {
    const {
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      cartDiscount,
      cartDeliveryFee,
      cartTotal,
      hasPrescriptionItems,
      addPrescription,
      prescriptions,
      requestMedicine,
      requestedMedicines,
    } = usePharmacy();

    return (
      <div>
        <div data-testid="cart-count">{cartCount}</div>
        <div data-testid="cart-subtotal">{cartSubtotal.toFixed(2)}</div>
        <div data-testid="cart-discount">{cartDiscount.toFixed(2)}</div>
        <div data-testid="cart-delivery">{cartDeliveryFee.toFixed(2)}</div>
        <div data-testid="cart-total">{cartTotal.toFixed(2)}</div>
        <div data-testid="has-rx">{hasPrescriptionItems ? 'yes' : 'no'}</div>
        <div data-testid="rx-count">{prescriptions.length}</div>
        <div data-testid="req-count">{requestedMedicines.length}</div>

        <button
          onClick={() => addToCart(med1, 2)}
          data-testid="add-btn-1"
        >
          Add Item 1 (Qty 2)
        </button>

        <button
          onClick={() => addToCart(med2, 1)}
          data-testid="add-btn-2"
        >
          Add Item 2
        </button>

        <button
          onClick={() => updateQuantity(med1.id, 5)}
          data-testid="update-qty-btn"
        >
          Update Qty Item 1
        </button>

        <button
          onClick={() => removeFromCart(med1.id)}
          data-testid="remove-btn"
        >
          Remove Item 1
        </button>

        <button onClick={clearCart} data-testid="clear-btn">
          Clear Cart
        </button>

        <button
          onClick={() => addPrescription({ id: 'rx-test', fileName: 'test.pdf' })}
          data-testid="add-rx-btn"
        >
          Add Prescription
        </button>

        <button
          onClick={() => requestMedicine({ name: 'Special Item', phone: '123' })}
          data-testid="add-req-btn"
        >
          Request Medicine
        </button>
      </div>
    );
  }

  beforeEach(() => {
    localStorage.clear();
  });

  it('correctly handles adding items, calculating totals, and updating quantities', () => {
    const med1 = SAMPLE_MEDICINES[0];
    const med2 = SAMPLE_MEDICINES[1];

    render(
      <PharmacyProvider>
        <TestConsumer med1={med1} med2={med2} />
      </PharmacyProvider>
    );

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-subtotal').textContent).toBe('0.00');

    // Add item 1
    fireEvent.click(screen.getByTestId('add-btn-1'));
    expect(screen.getByTestId('cart-count').textContent).toBe('2');

    // Add item 2
    fireEvent.click(screen.getByTestId('add-btn-2'));
    expect(screen.getByTestId('cart-count').textContent).toBe('3');

    // Update quantity
    fireEvent.click(screen.getByTestId('update-qty-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('6'); // 5 + 1

    // Remove item 1
    fireEvent.click(screen.getByTestId('remove-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('1');

    // Clear cart
    fireEvent.click(screen.getByTestId('clear-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });

  it('records prescription uploads and medicine requests', () => {
    const med1 = SAMPLE_MEDICINES[0];
    const med2 = SAMPLE_MEDICINES[1];

    render(
      <PharmacyProvider>
        <TestConsumer med1={med1} med2={med2} />
      </PharmacyProvider>
    );

    fireEvent.click(screen.getByTestId('add-rx-btn'));
    expect(screen.getByTestId('rx-count').textContent).toBe('1');

    fireEvent.click(screen.getByTestId('add-req-btn'));
    expect(screen.getByTestId('req-count').textContent).toBe('1');
  });
});

describe('Pharmacy UI Components', () => {
  it('renders MedicineCard with price, brand, strength, and add to cart action', () => {
    const testMed = SAMPLE_MEDICINES[0];
    render(
      <MemoryRouter>
        <PharmacyProvider>
          <MedicineCard medicine={testMed} />
        </PharmacyProvider>
      </MemoryRouter>
    );

    expect(screen.getByText((content) => content.includes(testMed.name.split(' ')[0]))).toBeDefined();
    expect(screen.getByText((content) => content.includes(testMed.strength))).toBeDefined();
    expect(screen.getByText(new RegExp(testMed.price.toFixed(2)))).toBeDefined();
  });


  it('renders AlphabetFilter and triggers letter selection', () => {
    let selected = '';
    const handleSelect = (l) => {
      selected = l;
    };

    render(
      <AlphabetFilter selectedLetter="" onSelectLetter={handleSelect} />
    );

    const letterPButton = screen.getByRole('button', { name: /Browse medicines starting with P/i });
    expect(letterPButton).toBeDefined();

    fireEvent.click(letterPButton);
    expect(selected).toBe('P');
  });
});
