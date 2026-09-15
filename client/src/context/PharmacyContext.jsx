import React, { createContext, useContext, useState, useEffect } from 'react';

const PharmacyContext = createContext(null);

const CART_STORAGE_KEY = 'healix_pharmacy_cart';
const RECENT_SEARCHES_KEY = 'healix_pharmacy_searches';

export function PharmacyProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : ['Panadol', 'Ventolin', 'Omron', 'Augmentin'];
    } catch {
      return ['Panadol', 'Ventolin', 'Omron', 'Augmentin'];
    }
  });

  const [prescriptions, setPrescriptions] = useState([]);
  const [requestedMedicines, setRequestedMedicines] = useState([]);

  // Save cart to local storage (non-PHI, purely product IDs and quantities)
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore local storage error
    }
  }, [cart]);

  // Save recent searches
  useEffect(() => {
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
    } catch {
      // Ignore
    }
  }, [recentSearches]);

  const addToCart = (product, quantity = 1) => {
    if (!product || quantity <= 0) return;
    const productId = product.id;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === productId || item.product?.id === productId);
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, ...product, product, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId && item.product?.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.id === productId || item.product?.id === productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addRecentSearch = (query) => {
    if (!query || !query.trim()) return;
    const clean = query.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 8);
    });
  };

  const addPrescription = (prescriptionData) => {
    const newRecord = {
      id: `rx-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...prescriptionData,
    };
    setPrescriptions((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const requestMedicine = (requestData) => {
    const newRequest = {
      id: `req-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...requestData,
    };
    setRequestedMedicines((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  // Derived financial computations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.price || item.product?.price || 0) * item.quantity,
    0
  );

  const cartCompareTotal = cart.reduce(
    (sum, item) =>
      sum + ((item.compareAtPrice || item.product?.compareAtPrice || item.price || item.product?.price || 0) * item.quantity),
    0
  );

  const cartDiscount = Math.max(0, cartCompareTotal - cartSubtotal);

  const cartDeliveryFee = cartSubtotal >= 40 || cartSubtotal === 0 ? 0 : 5.00;

  const cartTotal = cartSubtotal + cartDeliveryFee;

  const hasPrescriptionItems = cart.some(
    (item) => item.prescriptionRequired || item.product?.prescriptionRequired
  );


  return (
    <PharmacyContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,
        hasPrescriptionItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        recentSearches,
        addRecentSearch,
        prescriptions,
        addPrescription,
        requestedMedicines,
        requestMedicine,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
}

export function usePharmacy() {
  const context = useContext(PharmacyContext);
  if (!context) {
    return {
      cart: [],
      cartCount: 0,
      cartSubtotal: 0,
      cartDiscount: 0,
      cartDeliveryFee: 0,
      cartTotal: 0,
      hasPrescriptionItems: false,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      recentSearches: [],
      addRecentSearch: () => {},
      prescriptions: [],
      addPrescription: () => {},
      requestedMedicines: [],
      requestMedicine: () => {},
    };
  }
  return context;
}

