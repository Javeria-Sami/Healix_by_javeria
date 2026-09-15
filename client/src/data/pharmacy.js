/**
 * Healix Pharmacy & Medicine Marketplace Data Catalog
 * Realistic, verified medicine specifications, categories, and pharmaceutical metadata.
 */

export const PHARMACY_CATEGORIES = [
  // Primary Departments
  {
    id: 'medications',
    slug: 'medications',
    name: 'Prescription Medications',
    description: 'Specialized clinical pharmaceuticals for cardiovascular, endocrine, respiratory, and chronic conditions.',
    iconName: 'Pill',
    itemCount: 13,
    color: 'emerald',
    subcategories: ['Cardiac Care', 'Diabetes & Metabolic', 'Hypertension', 'Antibiotics', 'Neurology'],
  },
  {
    id: 'pain-fever-otc',
    slug: 'pain-fever-otc',
    name: 'Pain, Fever & OTC',
    description: 'Everyday analgesics, antipyretics, cold remedies, and over-the-counter wellness relief.',
    iconName: 'ShieldPlus',
    itemCount: 6,
    color: 'teal',
    subcategories: ['Pain Relief', 'Fever & Cold', 'Allergy & Sinus', 'First Aid'],
  },
  {
    id: 'respiratory-allergy',
    slug: 'respiratory-allergy',
    name: 'Respiratory & Allergy',
    description: 'Bronchodilators, inhalers, antihistamines, and pulmonary support treatments.',
    iconName: 'Wind',
    itemCount: 4,
    color: 'cyan',
    subcategories: ['Inhalers & Nebulizers', 'Antihistamines', 'Cough Syrups', 'Nasal Sprays'],
  },
  {
    id: 'digestive-health',
    slug: 'digestive-health',
    name: 'Digestive & Stomach Care',
    description: 'Proton-pump inhibitors, antacids, digestive enzymes, and gastrointestinal therapy.',
    iconName: 'Activity',
    itemCount: 4,
    color: 'indigo',
    subcategories: ['Acid Reflux & GERD', 'Antacids', 'Probiotics', 'Anti-Diarrheal'],
  },
  {
    id: 'family-baby-care',
    slug: 'family-baby-care',
    name: 'Family & Baby Care',
    description: 'Pediatric suspensions, maternal wellness, infant colic relief, and family first-aid.',
    iconName: 'Baby',
    itemCount: 4,
    color: 'amber',
    subcategories: ['Infant Colic', 'Pediatric Fever', 'Nappy Rash', 'Maternal Nutrition'],
  },
  {
    id: 'wellness-vitamins',
    slug: 'wellness-vitamins',
    name: 'Wellness & Supplements',
    description: 'Daily multivitamins, minerals, immune support complexes, and longevity nutrients.',
    iconName: 'Sparkles',
    itemCount: 5,
    color: 'violet',
    subcategories: ['Multivitamins', 'Bone & Joint', 'Immune Support', 'Omega & Heart Oils'],
  },
  {
    id: 'dermatology-skin',
    slug: 'dermatology-skin',
    name: 'Dermatology & Topicals',
    description: 'Topical antifungal creams, corticosteroid lotions, and dermatological barrier repairs.',
    iconName: 'Sparkle',
    itemCount: 3,
    color: 'rose',
    subcategories: ['Topical Antifungal', 'Eczema & Dermatitis', 'Antiseptic Lotions'],
  },
  {
    id: 'medical-devices',
    slug: 'medical-devices',
    name: 'Medical Devices & Diagnostics',
    description: 'Clinical grade blood pressure monitors, glucometers, pulse oximeters, and test strips.',
    iconName: 'HeartPulse',
    itemCount: 5,
    color: 'blue',
    subcategories: ['Blood Pressure Monitors', 'Glucose Meters', 'Pulse Oximeters', 'Thermometers'],
  },

  // Specific Medications Subcategories
  { id: 'bone-and-joint-pain', slug: 'bone-and-joint-pain', name: 'Bone And Joint Pain', description: 'Anti-inflammatory treatments, analgesics, calcium complexes, and musculoskeletal support.', iconName: 'Activity', itemCount: 4, color: 'emerald' },
  { id: 'cardiac-care', slug: 'cardiac-care', name: 'Cardiac Care', description: 'Statins, beta-blockers, ACE inhibitors, and lipid management therapeutics.', iconName: 'HeartPulse', itemCount: 5, color: 'rose' },
  { id: 'derma-care', slug: 'derma-care', name: 'Derma Care', description: 'Specialized clinical dermatology treatments for eczema, acne, psoriasis, and dermatitis.', iconName: 'Sparkle', itemCount: 3, color: 'teal' },
  { id: 'ent-care', slug: 'ent-care', name: 'ENT Care', description: 'Ear drops, decongestants, throat lozenges, and sinus relief therapies.', iconName: 'Headphones', itemCount: 3, color: 'cyan' },
  { id: 'eye-and-ear-care', slug: 'eye-and-ear-care', name: 'Eye And Ear Care', description: 'Sterile ophthalmic drops, antibiotic ear solutions, and lubricating eye ointments.', iconName: 'Eye', itemCount: 3, color: 'blue' },
  { id: 'genitals-care', slug: 'genitals-care', name: 'Genitals Care', description: 'Reproductive health treatments, antifungal topicals, and pelvic wellness medications.', iconName: 'ShieldPlus', itemCount: 2, color: 'indigo' },
  { id: 'kidney-and-pancreatic-care', slug: 'kidney-and-pancreatic-care', name: 'Kidney And Pancreatic Care', description: 'Renal balance therapeutics, pancreatic enzymes, and diabetes metabolic support.', iconName: 'Pill', itemCount: 4, color: 'amber' },
  { id: 'liver-care', slug: 'liver-care', name: 'Liver Care', description: 'Hepatoprotective supplements, silymarin formulations, and hepatic metabolism support.', iconName: 'Activity', itemCount: 3, color: 'emerald' },
  { id: 'lung-care', slug: 'lung-care', name: 'Lung Care', description: 'Bronchodilators, corticosteroid inhalers, and pulmonary respiratory formulations.', iconName: 'Wind', itemCount: 4, color: 'cyan' },
  { id: 'mental-health', slug: 'mental-health', name: 'Mental Health', description: 'Prescription neurological and psychological support medications with clinical supervision.', iconName: 'Brain', itemCount: 3, color: 'violet' },
  { id: 'other-conditions', slug: 'other-conditions', name: 'Other Conditions', description: 'Broad clinical therapeutics for diverse specialized and rare medical indications.', iconName: 'Pill', itemCount: 4, color: 'teal' },
  { id: 'stomach-health-care', slug: 'stomach-health-care', name: 'Stomach Health Care', description: 'Proton-pump inhibitors, antacids, mucosal protectants, and digestive enzymes.', iconName: 'Activity', itemCount: 4, color: 'indigo' },
  { id: 'urinary-care', slug: 'urinary-care', name: 'Urinary Care', description: 'Urinary tract therapeutics, alkalinizers, and bladder comfort remedies.', iconName: 'ShieldPlus', itemCount: 3, color: 'blue' },

  // Wellness And Beauty Subcategories
  { id: 'hair-and-nails-care', slug: 'hair-and-nails-care', name: 'Hair And Nails Care', description: 'Biotin complexes, keratin serums, and therapeutic trichological formulas.', iconName: 'Sparkles', itemCount: 3, color: 'violet' },
  { id: 'oral-hygiene', slug: 'oral-hygiene', name: 'Oral Hygiene', description: 'Clinical chlorhexidine rinses, sensitivity toothpastes, and dental barrier care.', iconName: 'Smile', itemCount: 3, color: 'teal' },
  { id: 'skin-care', slug: 'skin-care', name: 'Skin Care', description: 'Hyaluronic moisturizers, barrier recovery creams, and daily protective skincare.', iconName: 'Sparkle', itemCount: 4, color: 'rose' },
  { id: 'supplements', slug: 'supplements', name: 'Supplements', description: 'High-potency multivitamins, antioxidant complexes, and vitality minerals.', iconName: 'Sparkles', itemCount: 5, color: 'amber' },
  { id: 'weight-management', slug: 'weight-management', name: 'Weight Management', description: 'Metabolic rate optimizers, meal replacement nutrition, and fiber therapies.', iconName: 'Activity', itemCount: 3, color: 'emerald' },

  // Devices And Injectables Subcategories
  { id: 'devices', slug: 'devices', name: 'Devices', description: 'Digital blood pressure cuffs, blood glucose meters, and clinical diagnostic monitors.', iconName: 'HeartPulse', itemCount: 4, color: 'blue' },
  { id: 'drips', slug: 'drips', name: 'Drips', description: 'Sterile IV normal saline, Ringer lactate, and infusion administration sets.', iconName: 'Pill', itemCount: 3, color: 'cyan' },
  { id: 'injectables', slug: 'injectables', name: 'Injectables', description: 'Sterile pre-filled syringes, insulin pens, and clinical injectable preparations.', iconName: 'ShieldPlus', itemCount: 3, color: 'emerald' },
  { id: 'supportive-appliances', slug: 'supportive-appliances', name: 'Supportive Appliances', description: 'Orthopedic braces, compression stockings, cervical collars, and mobility supports.', iconName: 'Activity', itemCount: 3, color: 'teal' },
  { id: 'surgicals-and-solutions', slug: 'surgicals-and-solutions', name: 'Surgicals And Solutions', description: 'Antiseptic povidone iodine, sterile gauze, surgical tapes, and wound care sets.', iconName: 'ShieldPlus', itemCount: 4, color: 'rose' },
];

export const MEDICINE_PRODUCTS = [
  // Reference Featured: Benclin Gel
  {
    id: 'benclin-gel-10g',
    slug: 'benclin-1-5-10g-gel',
    name: 'Benclin (1/5%) 10G Gel',
    genericName: 'Clindamycin 1%, Anhydrous Benzoyl Peroxide 5%',
    brand: 'Sante Pharmaceuticals',
    strength: '1% / 5%',
    dosageForm: 'Topical Gel',
    packSize: '10g Tube',
    category: 'Skin Care',
    categorySlug: 'skin-care',
    imageUrl: '/images/medicines/benclin-gel.png',
    description: 'Benclin Gel contains Clindamycin Phosphate and Benzoyl Peroxide, combining antibiotic and keratolytic antibacterial actions for the effective topical treatment of acne vulgaris.',
    ingredients: 'Clindamycin Phosphate 1%, Anhydrous Benzoyl Peroxide 5%.',
    manufacturer: 'Sante Pharmaceuticals (Pvt) Ltd',
    price: 496.13,
    compareAtPrice: 551.25,
    discountPercentage: 10,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'For topical treatment of acne. Apply a thin layer to clean skin once daily as directed by your physician.',
    storageInformation: 'Store below 25°C in a dry place. Do not freeze.',
    warnings: 'Avoid contact with eyes, lips, and mucous membranes. May bleach hair or colored fabrics.',
    featured: true,
    rating: 4.9,
    reviewsCount: 154,
  },
  // Reference 2: Citanew
  {
    id: 'citanew-10mg-14-tablets',
    slug: 'citanew-10mg-14-tablets',
    name: 'Citanew (10Mg) 14 Tablets',
    genericName: 'Escitalopram Oxalate',
    brand: 'Sami Pharmaceuticals',
    strength: '10 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 14 Tablets',
    category: 'Mental Health',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/citanew.png',
    description: 'Citanew (Escitalopram) is a selective serotonin reuptake inhibitor (SSRI) prescribed for major depressive disorders and generalized anxiety disorders.',
    ingredients: 'Escitalopram Oxalate equivalent to 10mg Escitalopram.',
    manufacturer: 'Sami Pharmaceuticals (Pvt) Ltd',
    price: 444.65,
    compareAtPrice: 494.06,
    discountPercentage: 10,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Take once daily in the morning or evening as prescribed by your psychiatrist or physician.',
    storageInformation: 'Store below 30°C. Protect from light and moisture.',
    warnings: 'Prescription required. Do not discontinue abruptly without clinical consultation.',
    featured: true,
    rating: 4.8,
    reviewsCount: 62,
  },
  // Reference 3: Alp
  {
    id: 'alp-025mg-30-tablets',
    slug: 'alp-025mg-30-tablets',
    name: 'Alp (0.25Mg) 30 Tablet',
    genericName: 'Alprazolam',
    brand: 'PharmEvo / Searle',
    strength: '0.25 mg',
    dosageForm: 'Oral Tablets',
    packSize: 'Pack of 30 Tablets',
    category: 'Mental Health',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/alp.png',
    description: 'Alp (Alprazolam) is a triazolo analog of the 1,4-benzodiazepine class of central nervous system-active compounds indicated for the management of panic disorder and anxiety relief.',
    ingredients: 'Alprazolam 0.25mg per tablet.',
    manufacturer: 'PharmEvo Pharmaceuticals',
    price: 90.00,
    compareAtPrice: 100.00,
    discountPercentage: 10,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Take as directed under strict medical supervision.',
    storageInformation: 'Store in a secure, dry place below 25°C.',
    warnings: 'Controlled prescription medicine. May cause drowsiness or habit formation.',
    featured: true,
    rating: 4.7,
    reviewsCount: 45,
  },
  // Reference 4: Brufen
  {
    id: 'brufen-200mg-100-tablets',
    slug: 'brufen-200mg-100-tablets',
    name: 'Brufen (200Mg) 100 Tablets',
    genericName: 'Ibuprofen',
    brand: 'Abbott Laboratories',
    strength: '200 mg',
    dosageForm: 'Sugar-Coated Tablets',
    packSize: 'Pack of 100 Tablets',
    category: 'Pain Relief',
    categorySlug: 'pain-fever-otc',
    imageUrl: '/images/medicines/brufen-tab.png',
    description: 'Brufen (Ibuprofen) is a non-steroidal anti-inflammatory drug (NSAID) indicated for its analgesic and anti-inflammatory effects in the treatment of rheumatoid arthritis, osteoarthritis, dental pain, headache, and musculoskeletal pain.',
    ingredients: 'Ibuprofen 200mg per tablet.',
    manufacturer: 'Abbott Laboratories Pakistan Ltd',
    price: 39.60,
    compareAtPrice: 44.00,
    discountPercentage: 10,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults: 1 to 2 tablets three to four times a day after meals.',
    storageInformation: 'Store in a cool and dry place below 25°C.',
    warnings: 'Take with or after food. Not recommended for patients with active peptic ulceration.',
    featured: true,
    rating: 4.9,
    reviewsCount: 210,
  },
  // Reference 5: Arinac Forte
  {
    id: 'arinac-forte-400-60mg',
    slug: 'arinac-forte-tablets',
    name: 'Arinac Forte (400/60Mg) 100 Tablets',
    genericName: 'Ibuprofen + Pseudoephedrine HCl',
    brand: 'Abbott Laboratories',
    strength: '400 mg / 60 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 100 Tablets',
    category: 'Cold & Flu',
    categorySlug: 'respiratory-allergy',
    imageUrl: '/images/medicines/arinac-forte.png',
    description: 'Arinac Forte combines the anti-inflammatory analgesic action of Ibuprofen with the systemic nasal decongestant properties of Pseudoephedrine for comprehensive multi-symptom cold, sinusitis, and flu relief.',
    ingredients: 'Ibuprofen 400mg, Pseudoephedrine Hydrochloride 60mg per tablet.',
    manufacturer: 'Abbott Laboratories Pakistan Ltd',
    price: 135.00,
    compareAtPrice: 150.00,
    discountPercentage: 10,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults: 1 tablet every 4 to 6 hours as needed. Do not exceed 4 tablets in 24 hours.',
    storageInformation: 'Store below 30°C in a dry place.',
    warnings: 'Caution in patients with severe hypertension or coronary artery disease.',
    featured: true,
    rating: 4.9,
    reviewsCount: 188,
  },
  // 1. Panadol Extra
  {
    id: 'panadol-extra-500mg-65mg',
    slug: 'panadol-extra-tablets',
    name: 'Panadol Extra',
    genericName: 'Paracetamol + Caffeine',
    brand: 'GSK Consumer Healthcare',
    strength: '500 mg / 65 mg',
    dosageForm: 'Tablets',
    packSize: 'Pack of 20 Tablets',
    category: 'Pain, Fever & OTC',
    categorySlug: 'pain-fever-otc',
    imageUrl: '/images/medicines/panadol-extra.jpg',
    description: 'Panadol Extra tablets provide strong and fast-acting relief of tough pain including headaches, migraines, muscle aches, toothache, and fever. Formulated with caffeine to amplify the analgesic efficacy of paracetamol.',
    ingredients: 'Paracetamol 500mg, Caffeine 65mg per tablet.',
    manufacturer: 'GlaxoSmithKline Healthcare Ltd',
    price: 3.50,
    compareAtPrice: 4.20,
    discountPercentage: 16,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults and children over 12 years: 1 to 2 tablets every 4 to 6 hours as required. Do not exceed 8 tablets in 24 hours.',
    storageInformation: 'Store below 25°C in a dry place away from direct sunlight.',
    warnings: 'Contains Paracetamol. Do not take with any other products containing paracetamol. Excessive caffeine intake may cause insomnia or agitation.',
    faqs: [
      {
        question: 'How quickly does Panadol Extra work?',
        answer: 'Panadol Extra typically begins providing pain relief within 15 to 30 minutes following oral ingestion.'
      },
      {
        question: 'Can I take this on an empty stomach?',
        answer: 'Yes, Panadol Extra is gentle on the stomach and may be taken with or without food.'
      }
    ],
    featured: true,
    rating: 4.8,
    reviewsCount: 142,
  },

  // 2. Lipitor 20mg
  {
    id: 'lipitor-atorvastatin-20mg',
    slug: 'lipitor-atorvastatin-20mg',
    name: 'Lipitor',
    genericName: 'Atorvastatin Calcium',
    brand: 'Pfizer',
    strength: '20 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 30 Tablets',
    category: 'Prescription Medications',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/lipitor.jpg',
    description: 'Lipitor (Atorvastatin) is an HMG-CoA reductase inhibitor used alongside diet to lower low-density lipoprotein (LDL) cholesterol and triglycerides in the blood, reducing cardiovascular morbidity and stroke risks.',
    ingredients: 'Atorvastatin Calcium equivalent to 20mg Atorvastatin.',
    manufacturer: 'Pfizer Pharmaceuticals',
    price: 24.50,
    compareAtPrice: 28.00,
    discountPercentage: 12,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Take once daily in the evening with or without food as directed by your physician.',
    storageInformation: 'Store between 20°C to 25°C. Protect from moisture and child access.',
    warnings: 'Prescription medicine. Regular liver function monitoring is recommended. Inform your clinician immediately if unexplained muscle pain, tenderness, or weakness develops.',
    faqs: [
      {
        question: 'Do I need a doctor prescription to order Lipitor?',
        answer: 'Yes, Lipitor is a prescription-only medication. Please upload a valid clinical prescription at checkout.'
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 88,
  },

  // 3. Ventolin Evohaler 100mcg
  {
    id: 'ventolin-salbutamol-inhaler-100mcg',
    slug: 'ventolin-salbutamol-inhaler',
    name: 'Ventolin Evohaler',
    genericName: 'Salbutamol Sulfate',
    brand: 'GSK Respiratory',
    strength: '100 mcg / Dose',
    dosageForm: 'Metered Dose Inhaler (200 Actuations)',
    packSize: '1 Inhaler Unit',
    category: 'Respiratory & Allergy',
    categorySlug: 'respiratory-allergy',
    imageUrl: '/images/medicines/ventolin.jpg',
    description: 'Ventolin Evohaler is a fast-acting selective beta-2 adrenoceptor agonist used for the prompt relief and prevention of bronchospasm in asthma, chronic bronchitis, and exercise-induced asthma.',
    ingredients: 'Salbutamol Sulfate providing 100mcg salbutamol per metered actuation.',
    manufacturer: 'GlaxoSmithKline Respiratory UK',
    price: 14.80,
    compareAtPrice: 16.50,
    discountPercentage: 10,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'For acute bronchospasm: 1 to 2 puffs as needed. For exercise-induced prevention: 2 puffs 10-15 minutes prior to exertion.',
    storageInformation: 'Store below 30°C. Do not freeze or expose to direct sunlight or puncture the pressurized canister.',
    warnings: 'If a previously effective dose fails to provide relief for at least 3 hours, seek urgent clinical medical advice.',
    faqs: [
      {
        question: 'How many puffs are in one Ventolin inhaler?',
        answer: 'Each standard Ventolin Evohaler canister provides exactly 200 metered actuations.'
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 210,
  },

  // 4. Nexium 40mg
  {
    id: 'nexium-esomeprazole-40mg',
    slug: 'nexium-esomeprazole-40mg',
    name: 'Nexium',
    genericName: 'Esomeprazole Magnesium',
    brand: 'AstraZeneca',
    strength: '40 mg',
    dosageForm: 'Gastro-Resistant Tablets',
    packSize: 'Pack of 28 Tablets',
    category: 'Digestive & Stomach Care',
    categorySlug: 'digestive-health',
    imageUrl: '/images/medicines/nexium.jpg',
    description: 'Nexium is a proton pump inhibitor (PPI) that decreases the amount of acid produced in the stomach. Indicated for gastroesophageal reflux disease (GERD), erosive esophagitis healing, and acid-related dyspepsia.',
    ingredients: 'Esomeprazole magnesium trihydrate 40mg.',
    manufacturer: 'AstraZeneca Pharmaceuticals',
    price: 32.00,
    compareAtPrice: 36.50,
    discountPercentage: 12,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Take one tablet daily in the morning, at least 1 hour before breakfast with a glass of water. Swallow whole; do not chew or crush.',
    storageInformation: 'Store in original blister pack below 30°C to protect from ambient moisture.',
    warnings: 'Prolonged use should be reviewed regularly by a licensed physician.',
    faqs: [
      {
        question: 'Can Nexium tablets be split in half?',
        answer: 'No, Nexium tablets have a special gastro-resistant coating and must be swallowed whole.'
      }
    ],
    featured: true,
    rating: 4.7,
    reviewsCount: 95,
  },


  // 5. Augmentin 625mg
  {
    id: 'augmentin-amoxicillin-clavulanate-625mg',
    slug: 'augmentin-amoxicillin-625mg',
    name: 'Augmentin',
    genericName: 'Co-Amoxiclav (Amoxicillin + Clavulanic Acid)',
    brand: 'GSK',
    strength: '500 mg / 125 mg (625 mg)',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 14 Tablets',
    category: 'Prescription Medications',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/augmentin.jpg',
    description: 'Augmentin is a broad-spectrum penicillin antibacterial combination effective against bacterial infections of the respiratory tract, urinary tract, skin, dental abscesses, and soft tissues.',
    ingredients: 'Amoxicillin Trihydrate 500mg, Potassium Clavulanate 125mg.',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals',
    price: 18.50,
    compareAtPrice: 21.00,
    discountPercentage: 12,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Adults: One 625mg tablet twice daily or as prescribed. Take at the start of a meal to minimize potential gastrointestinal discomfort.',
    storageInformation: 'Store below 25°C in a dry place. Protect from moisture.',
    warnings: 'Contraindicated in individuals with a history of penicillin or beta-lactam hypersensitivity.',
    faqs: [
      {
        question: 'Is a prescription required for Augmentin?',
        answer: 'Yes, antibiotics strictly require a registered physician prescription to prevent microbial resistance.'
      }
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 76,
  },


  // 6. Brufen 400mg
  {
    id: 'brufen-ibuprofen-400mg',
    slug: 'brufen-ibuprofen-400mg',
    name: 'Brufen',
    genericName: 'Ibuprofen',
    brand: 'Abbott Laboratories',
    strength: '400 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 30 Tablets',
    category: 'Pain, Fever & OTC',
    categorySlug: 'pain-fever-otc',
    imageUrl: '/images/medicines/brufen.jpg',
    description: 'Brufen contains Ibuprofen, a trusted non-steroidal anti-inflammatory drug (NSAID) with anti-inflammatory, analgesic, and antipyretic properties for arthritis, sprains, backache, dental pain, and sports injuries.',
    ingredients: 'Ibuprofen 400mg.',
    manufacturer: 'Abbott Laboratories',
    price: 4.80,
    compareAtPrice: 5.50,
    discountPercentage: 13,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults: 1 tablet 3 times daily after food. Do not exceed 1200mg (3 tablets) in 24 hours without medical supervision.',
    storageInformation: 'Store below 25°C in a dry place.',
    warnings: 'Avoid if you have an active stomach ulcer, severe kidney/liver impairment, or aspirin allergy.',
    faqs: [
      {
        question: 'Should I take Brufen with meals?',
        answer: 'Yes, always take NSAIDs like Brufen with food or milk to safeguard the gastric lining.'
      }
    ],
    featured: true,
    rating: 4.7,
    reviewsCount: 164,
  },

  // 7. Zyrtec 10mg
  {
    id: 'zyrtec-cetirizine-10mg',
    slug: 'zyrtec-cetirizine-10mg',
    name: 'Zyrtec',
    genericName: 'Cetirizine Dihydrochloride',
    brand: 'Johnson & Johnson',
    strength: '10 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 20 Tablets',
    category: 'Respiratory & Allergy',
    categorySlug: 'respiratory-allergy',
    imageUrl: '/images/medicines/zyrtec.jpg',
    description: 'Zyrtec provides 24-hour non-drowsy relief from seasonal allergic rhinitis (hay fever), perennial rhinitis, itchy eyes, sneezing, runny nose, and allergic urticaria (hives).',
    ingredients: 'Cetirizine Dihydrochloride 10mg.',
    manufacturer: 'Johnson & Johnson Healthcare',
    price: 9.20,
    compareAtPrice: 11.00,
    discountPercentage: 16,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults and children over 12 years: Take 1 tablet once daily with a drink of water.',
    storageInformation: 'Store below 30°C.',
    warnings: 'Do not exceed the recommended dose. Use with caution if operating heavy machinery.',
    faqs: [
      {
        question: 'Will Zyrtec make me drowsy?',
        answer: 'Zyrtec is a 2nd-generation antihistamine with minimal sedative effects in the vast majority of patients.'
      }
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 112,
  },

  // 8. Surbex-Z High Potency Zinc + Vitamin B Complex
  {
    id: 'surbex-z-multivitamin',
    slug: 'surbex-z-multivitamin',
    name: 'Surbex-Z High Potency',
    genericName: 'Zinc + Vitamin B-Complex + Vitamin C & E',
    brand: 'Abbott Nutrition',
    strength: 'Zinc 22.5mg + Vit C 500mg + B Complex',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Bottle of 30 Tablets',
    category: 'Wellness & Supplements',
    categorySlug: 'wellness-vitamins',
    imageUrl: '/images/medicines/surbex-z.jpg',
    description: 'Surbex-Z is an advanced high-potency nutritional formula engineered to replenish essential B-complex vitamins, antioxidant Vitamin C & E, and Zinc for sustained cellular energy, immune resilience, and stress recovery.',
    ingredients: 'Zinc 22.5mg, Vitamin C 500mg, Niacinamide 100mg, Vitamin E 30IU, B1, B2, B6, B12, Folic Acid.',
    manufacturer: 'Abbott Nutrition',
    price: 8.50,
    compareAtPrice: 10.00,
    discountPercentage: 15,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults: Take 1 tablet daily with or after a main meal.',
    storageInformation: 'Store in a cool, dry place below 25°C. Keep bottle tightly closed.',
    warnings: 'Nutritional supplement; not a substitute for a balanced diet. Do not exceed stated recommended intake.',
    faqs: [
      {
        question: 'When is the best time to take Surbex-Z?',
        answer: 'Take it with breakfast or lunch for optimal nutrient absorption and sustained daytime energy.'
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 230,
  },

  // 9. Glucophage 500mg
  {
    id: 'glucophage-metformin-500mg',
    slug: 'glucophage-metformin-500mg',
    name: 'Glucophage',
    genericName: 'Metformin Hydrochloride',
    brand: 'Merck Serono',
    strength: '500 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 50 Tablets',
    category: 'Prescription Medications',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/glucophage.jpg',
    description: 'Glucophage (Metformin) is the first-line oral antidiabetic medication for managing type 2 diabetes mellitus, improving insulin sensitivity, and reducing hepatic glucose output.',
    ingredients: 'Metformin Hydrochloride 500mg.',
    manufacturer: 'Merck Healthcare KGaA',
    price: 11.20,
    compareAtPrice: 13.00,
    discountPercentage: 14,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Take with or immediately after meals to reduce gastrointestinal side effects, as prescribed by your endocrinologist.',
    storageInformation: 'Store below 25°C in dry conditions.',
    warnings: 'Prescription medicine. Renal function assessment must be performed prior to and during treatment.',
    faqs: [
      {
        question: 'Why must Metformin be taken with food?',
        answer: 'Taking Metformin with meals significantly decreases nausea and stomach cramping during the initial weeks of therapy.'
      }
    ],
    featured: false,
    rating: 4.7,
    reviewsCount: 65,
  },


  // 10. Gaviscon Double Action Liquid
  {
    id: 'gaviscon-double-action-liquid-200ml',
    slug: 'gaviscon-double-action-liquid',
    name: 'Gaviscon Double Action',
    genericName: 'Sodium Alginate + Calcium Carbonate',
    brand: 'Reckitt Benckiser',
    strength: '500mg / 213mg per 10ml',
    dosageForm: 'Oral Suspension Liquid',
    packSize: '200 ml Amber Bottle',
    category: 'Digestive & Stomach Care',
    categorySlug: 'digestive-health',
    imageUrl: '/images/medicines/gaviscon.jpg',
    description: 'Gaviscon Double Action provides fast, soothing, and long-lasting relief from heartburn and indigestion. Forms a protective physical raft barrier over the stomach contents to prevent acid reflux.',
    ingredients: 'Sodium Alginate 500mg, Sodium Bicarbonate 213mg, Calcium Carbonate 325mg per 10ml.',
    manufacturer: 'Reckitt Benckiser Healthcare',
    price: 7.90,
    compareAtPrice: 9.00,
    discountPercentage: 12,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults and children over 12: 10-20ml after meals and at bedtime, up to 4 times a day.',
    storageInformation: 'Store below 30°C. Do not refrigerate or freeze.',
    warnings: 'Contains sodium and calcium. Consult a doctor if on a sodium-restricted diet.',
    faqs: [
      {
        question: 'How quickly does Gaviscon provide relief?',
        answer: 'Gaviscon acts instantly upon ingestion, forming an active barrier in under 3 minutes.'
      }
    ],
    featured: true,
    rating: 4.8,
    reviewsCount: 188,
  },

  // 11. Concor 5mg
  {
    id: 'concor-bisoprolol-5mg',
    slug: 'concor-bisoprolol-5mg',
    name: 'Concor',
    genericName: 'Bisoprolol Fumarate',
    brand: 'Merck',
    strength: '5 mg',
    dosageForm: 'Heart-Shaped Scored Tablets',
    packSize: 'Pack of 30 Tablets',
    category: 'Prescription Medications',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/concor.jpg',
    description: 'Concor contains Bisoprolol, a cardio-selective beta-blocker indicated for the management of arterial hypertension, coronary heart disease (angina pectoris), and stable chronic heart failure.',
    ingredients: 'Bisoprolol Fumarate 5mg.',
    manufacturer: 'Merck Healthcare',
    price: 15.60,
    compareAtPrice: 17.50,
    discountPercentage: 11,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Take 1 tablet in the morning with or without food. Swallow with water without chewing.',
    storageInformation: 'Store below 25°C.',
    warnings: 'Do not discontinue abruptly without physician consultation, as this may exacerbate cardiac ischemia.',
    faqs: [
      {
        question: 'Can I cut Concor tablets in half?',
        answer: 'Concor 5mg tablets have a score line and may be divided into equal halves if prescribed a 2.5mg dosage.'
      }
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 54,
  },

  // 12. Omron M3 Comfort Blood Pressure Monitor
  {
    id: 'omron-m3-comfort-bp-monitor',
    slug: 'omron-m3-blood-pressure-monitor',
    name: 'Omron M3 Comfort Upper Arm Blood Pressure Monitor',
    genericName: 'Digital Sphygmomanometer with Intelli Wrap Cuff',
    brand: 'Omron Healthcare',
    strength: 'Clinical Grade Accuracy',
    dosageForm: 'Medical Diagnostic Device',
    packSize: '1 Complete Monitor Kit + Cuff',
    category: 'Medical Devices & Diagnostics',
    categorySlug: 'medical-devices',
    imageUrl: '/images/medicines/omron-m3.jpg',
    description: 'Clinically validated upper arm blood pressure monitor with unique 360° Intelli Wrap Cuff technology, ensuring accurate readings in any position around the upper arm. Features irregular heartbeat detection and 2-user 60-memory storage.',
    ingredients: 'Includes M3 Monitor, Intelli Wrap Cuff (22-42cm), 4 AA Batteries, Storage Case, Manual.',
    manufacturer: 'Omron Healthcare Co. Ltd',
    price: 58.00,
    compareAtPrice: 68.00,
    discountPercentage: 15,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Rest quietly for 5 minutes before measurement. Fasten cuff snugly around bare upper arm at heart level.',
    storageInformation: 'Store in provided protective case away from extreme temperatures and vibrations.',
    warnings: 'Self-monitoring is not a substitute for clinical diagnosis. Consult your cardiologist regarding readings.',
    faqs: [
      {
        question: 'What is the cuff size range?',
        answer: 'The included Intelli Wrap Cuff fits adult upper arm circumferences from 22cm to 42cm.'
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 320,
  },


  // 13. Calpol Infant Suspension 120mg/5ml
  {
    id: 'calpol-infant-suspension-paracetamol',
    slug: 'calpol-infant-suspension',
    name: 'Calpol Infant Sugar-Free Suspension',
    genericName: 'Paracetamol Pediatric Suspension',
    brand: 'Johnson & Johnson Pediatric',
    strength: '120 mg / 5 ml',
    dosageForm: 'Strawberry Flavor Suspension (100ml)',
    packSize: '100 ml Bottle with Syringe',
    category: 'Family & Baby Care',
    categorySlug: 'family-baby-care',
    imageUrl: '/images/medicines/calpol.jpg',
    description: 'Calpol Infant Suspension is formulated specifically for infants and young children aged 2 months to 6 years, providing gentle and effective relief from teething pain, post-vaccination fever, earache, and sore throats.',
    ingredients: 'Paracetamol 120mg per 5ml. Sugar-free, color-free.',
    manufacturer: 'Johnson & Johnson Consumer Ltd',
    price: 5.40,
    compareAtPrice: 6.20,
    discountPercentage: 13,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Use the enclosed oral dosing syringe. Dose by weight and age according to package instructions. Never exceed 4 doses in 24 hours.',
    storageInformation: 'Store below 25°C. Do not freeze. Keep out of reach of children.',
    warnings: 'Contains paracetamol. Do not administer alongside other paracetamol-containing pediatric products.',
    faqs: [
      {
        question: 'Is a dosing syringe included in the pack?',
        answer: 'Yes, each bottle includes an easy-to-use, graduated oral measuring syringe.'
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 195,
  },

  // 14. Betnovate-N Cream 15g
  {
    id: 'betnovate-n-cream-15g',
    slug: 'betnovate-n-cream',
    name: 'Betnovate-N Cream',
    genericName: 'Betamethasone Valerate + Neomycin Sulfate',
    brand: 'GSK Dermatology',
    strength: '0.1% / 0.5% w/w',
    dosageForm: 'Topical Dermatological Cream',
    packSize: '15 g Aluminum Tube',
    category: 'Dermatology & Topicals',
    categorySlug: 'dermatology-skin',
    imageUrl: '/images/medicines/betnovate-n.jpg',
    description: 'Betnovate-N combines a potent anti-inflammatory corticosteroid (Betamethasone) with a broad-spectrum antibiotic (Neomycin) to treat inflammatory dermatoses complicated by secondary bacterial infection.',
    ingredients: 'Betamethasone Valerate 0.1% w/w, Neomycin Sulfate 0.5% w/w.',
    manufacturer: 'GlaxoSmithKline Healthcare',
    price: 6.20,
    compareAtPrice: 7.50,
    discountPercentage: 17,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Apply a thin film sparingly to affected areas 1-2 times daily until clinical improvement occurs. Wash hands thoroughly after application.',
    storageInformation: 'Store below 25°C. Do not freeze.',
    warnings: 'Prescription medicine. Avoid prolonged use on facial skin or under occlusive dressings.',
    faqs: [
      {
        question: 'Can this cream be used on broken skin?',
        answer: 'Use strictly as directed by your dermatologist to avoid systemic absorption.'
      }
    ],
    featured: false,
    rating: 4.6,
    reviewsCount: 42,
  },

  // 15. Accu-Chek Guide Blood Glucose Monitoring System
  {
    id: 'accu-chek-guide-glucose-monitor',
    slug: 'accu-chek-guide-glucose-monitor',
    name: 'Accu-Chek Guide Blood Glucose Monitoring Kit',
    genericName: 'Blood Glucose Meter with Spill-Resistant Test Strips',
    brand: 'Roche Diabetes Care',
    strength: '10-Second Rapid Assay',
    dosageForm: 'Diagnostic System (Meter + Lancing Device)',
    packSize: '1 Complete Monitoring Kit',
    category: 'Medical Devices & Diagnostics',
    categorySlug: 'medical-devices',
    imageUrl: '/images/medicines/accu-chek.jpg',
    description: 'Advanced blood glucose monitoring system with spill-resistant SmartPack vial, bright port light, and wireless Bluetooth sync to healthcare apps. Delivers 10/10 analytical accuracy for diabetic management.',
    ingredients: 'Accu-Chek Guide meter, FastClix lancing device, 10 lancets, carry pouch, quick-start guide.',
    manufacturer: 'Roche Diabetes Care GmbH',
    price: 34.00,
    compareAtPrice: 42.00,
    discountPercentage: 19,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Insert test strip, apply a tiny 0.6 µl droplet of blood anywhere along the yellow edge. Results in under 4 seconds.',
    storageInformation: 'Store between 4°C and 30°C.',
    warnings: 'For in-vitro diagnostic self-testing only. Keep strips in original closed vial.',
    faqs: [
      {
        question: 'Does this meter connect to smartphones?',
        answer: 'Yes, it features Bluetooth wireless connectivity to sync logbook data to the mySugr app.'
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 178,
  },

  // 16. Neurobion Forte Vitamin B12 + B6 + B1
  {
    id: 'neurobion-forte-tablets',
    slug: 'neurobion-forte-tablets',
    name: 'Neurobion Forte',
    genericName: 'Vitamin B1 + B6 + B12 Neurotropic Complex',
    brand: 'P&G Health',
    strength: 'B1 100mg + B6 200mg + B12 200mcg',
    dosageForm: 'Sugar-Coated Tablets',
    packSize: 'Pack of 30 Tablets',
    category: 'Wellness & Supplements',
    categorySlug: 'wellness-vitamins',
    imageUrl: '/images/medicines/neurobion.jpg',
    description: 'Neurobion Forte delivers high-potency neurotropic B vitamins designed to support nerve regeneration, alleviate peripheral neuropathic tingling, and maintain healthy nervous system function.',
    ingredients: 'Thiamine Mononitrate (B1) 100mg, Pyridoxine (B6) 200mg, Cyanocobalamin (B12) 200mcg.',
    manufacturer: 'Procter & Gamble Health Ltd',
    price: 6.80,
    compareAtPrice: 8.00,
    discountPercentage: 15,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Take 1 tablet daily with meals, or as recommended by your physician.',
    storageInformation: 'Store below 25°C away from humidity.',
    warnings: 'Do not take if you have known sensitivity to cobalt or any vitamin B derivatives.',
    faqs: [
      {
        question: 'Who can benefit from Neurobion Forte?',
        answer: 'Individuals experiencing nerve tingling, vitamin B deficiencies, or diabetic neuropathy under clinical advice.'
      }
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 140,
  },

  // 17. Voltarol Emulgel 1.16%
  {
    id: 'voltarol-emulgel-diclofenac-50g',
    slug: 'voltarol-emulgel-50g',
    name: 'Voltarol Emulgel Joint Pain Relief',
    genericName: 'Diclofenac Diethylammonium Gel',
    brand: 'Haleon',
    strength: '1.16% w/w',
    dosageForm: 'Topical Gel',
    packSize: '50 g Easy-Open Tube',
    category: 'Pain, Fever & OTC',
    categorySlug: 'pain-fever-otc',
    imageUrl: '/images/medicines/voltarol.jpg',
    description: 'Voltarol Emulgel penetrates deeply into joint tissue to target the site of local inflammation and deliver targeted pain relief for osteoarthritis, joint stiffness, sprains, and backache.',
    ingredients: 'Diclofenac Diethylammonium 1.16% w/w.',
    manufacturer: 'Haleon UK Healthcare',
    price: 8.90,
    compareAtPrice: 10.50,
    discountPercentage: 15,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Gently rub a cherry-sized amount over the painful area 3-4 times daily. Do not apply for more than 14 days without medical advice.',
    storageInformation: 'Store below 30°C.',
    warnings: 'For external skin use only. Do not apply to cuts, open wounds, or eczema.',
    faqs: [
      {
        question: 'Does Voltarol smell strongly?',
        answer: 'Voltarol Emulgel has a mild, pleasant cooling scent that dissipates quickly upon skin absorption.'
      }
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 110,
  },

  // 18. Cozaar 50mg (Losartan)
  {
    id: 'cozaar-losartan-potassium-50mg',
    slug: 'cozaar-losartan-50mg',
    name: 'Cozaar',
    genericName: 'Losartan Potassium',
    brand: 'Organon / MSD',
    strength: '50 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 28 Tablets',
    category: 'Prescription Medications',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/cozaar.jpg',
    description: 'Cozaar (Losartan) is an angiotensin II receptor antagonist (ARB) used in the clinical management of hypertension and to protect kidney function in diabetic hypertensive patients.',
    ingredients: 'Losartan Potassium 50mg.',
    manufacturer: 'Organon & Co.',
    price: 19.80,
    compareAtPrice: 22.50,
    discountPercentage: 12,
    stockStatus: 'in_stock',
    prescriptionRequired: true,
    usageInformation: 'Take 1 tablet once daily, with or without meals, at approximately the same time each day.',
    storageInformation: 'Store below 30°C in original packaging.',
    warnings: 'Contraindicated during pregnancy. Periodic blood pressure and electrolyte monitoring is required.',
    faqs: [
      {
        question: 'Does Losartan cause dry cough like ACE inhibitors?',
        answer: 'Losartan is an ARB and causes significantly lower incidence of cough compared to traditional ACE inhibitors.'
      }
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 48,
  },

  // 19. Sudocrem Antiseptic Healing Cream 125g
  {
    id: 'sudocrem-antiseptic-healing-cream-125g',
    slug: 'sudocrem-healing-cream',
    name: 'Sudocrem Antiseptic Healing Cream',
    genericName: 'Zinc Oxide + Benzyl Benzoate + Anhydrous Hypoallergenic Lanolin',
    brand: 'Teva UK',
    strength: 'Triple Action Barrier Formula',
    dosageForm: 'Topical Healing Cream',
    packSize: '125 g Tub',
    category: 'Family & Baby Care',
    categorySlug: 'family-baby-care',
    imageUrl: '/images/medicines/sudocrem.jpg',
    description: 'Sudocrem is a clinically proven soothing emollient cream that treats and prevents nappy rash, cuts, grazes, minor burns, eczema, and surface bedsores with a protective water-repellent base.',
    ingredients: 'Zinc Oxide 15.25%, Benzyl Benzoate 1.01%, Benzyl Alcohol 0.39%, Lanolin.',
    manufacturer: 'Teva Pharmaceuticals',
    price: 5.80,
    compareAtPrice: 6.80,
    discountPercentage: 15,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Apply a thin layer to clean, dry skin. Massage in small circular movements until the cream disappears, leaving a translucent film.',
    storageInformation: 'Store below 25°C.',
    warnings: 'For external dermatological use only. Keep away from eyes and mucous membranes.',
    faqs: [
      {
        question: 'Can Sudocrem be used on adult skin?',
        answer: 'Yes, it is effective for adult eczema, dry elbows, minor abrasions, and acne.'
      }
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 260,
  },

  // 20. Disprin 300mg Soluble Tablets
  {
    id: 'disprin-aspirin-300mg',
    slug: 'disprin-aspirin-300mg',
    name: 'Disprin Direct Soluble Aspirin',
    genericName: 'Aspirin (Acetylsalicylic Acid)',
    brand: 'Reckitt Benckiser',
    strength: '300 mg',
    dosageForm: 'Effervescent Soluble Tablets',
    packSize: 'Pack of 24 Tablets',
    category: 'Pain, Fever & OTC',
    categorySlug: 'pain-fever-otc',
    imageUrl: '/images/medicines/disprin.jpg',
    description: 'Disprin delivers fast, effervescent pain relief for headaches, neuralgia, toothache, sore throat, and period discomfort, dissolving quickly in water for rapid systemic absorption.',
    ingredients: 'Aspirin 300mg.',
    manufacturer: 'Reckitt Benckiser Ltd',
    price: 2.90,
    compareAtPrice: 3.50,
    discountPercentage: 17,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Adults: Dissolve 1 to 2 tablets in a glass of water every 4 to 6 hours as needed. Do not exceed 12 tablets in 24 hours.',
    storageInformation: 'Store below 25°C in dry conditions.',
    warnings: 'Do not give to children under 16 years due to risk of Reye’s syndrome. Do not use if you have stomach ulcers.',
    faqs: [
      {
        question: 'Must Disprin be dissolved in water?',
        answer: 'Yes, dissolving Disprin in a half glass of water ensures rapid gastric absorption.'
      }
    ],
    featured: false,
    rating: 4.6,
    reviewsCount: 90,
  },

  // 21. Flagyl 400mg (Metronidazole) - Out of stock demo
  {
    id: 'flagyl-metronidazole-400mg',
    slug: 'flagyl-metronidazole-400mg',
    name: 'Flagyl',
    genericName: 'Metronidazole',
    brand: 'Sanofi',
    strength: '400 mg',
    dosageForm: 'Film-Coated Tablets',
    packSize: 'Pack of 20 Tablets',
    category: 'Prescription Medications',
    categorySlug: 'medications',
    imageUrl: '/images/medicines/flagyl.jpg',
    description: 'Flagyl is an antiprotozoal and antibacterial agent used for anaerobic bacterial infections, dental abscesses, and gastrointestinal protozoal conditions.',
    ingredients: 'Metronidazole 400mg.',
    manufacturer: 'Sanofi-Aventis',
    price: 9.80,
    compareAtPrice: 11.00,
    discountPercentage: 11,
    stockStatus: 'out_of_stock',
    prescriptionRequired: true,
    usageInformation: 'Take strictly according to physician prescription. Swallow whole with water during or after meals.',
    storageInformation: 'Store below 25°C away from direct light.',
    warnings: 'Avoid all alcohol during treatment and for at least 48 hours after stopping.',
    faqs: [
      {
        question: 'When will Flagyl be back in stock?',
        answer: 'Use the Request Item button to receive immediate notification upon inventory replenishment.'
      }
    ],
    featured: false,
    rating: 4.7,
    reviewsCount: 38,
  },

  // 22. Vitamin C 1000mg + Zinc Effervescent
  {
    id: 'vitamin-c-1000mg-zinc-effervescent',
    slug: 'vitamin-c-1000mg-zinc-effervescent',
    name: 'Healix Bio-C 1000mg + Zinc Effervescent',
    genericName: 'Ascorbic Acid + Zinc Citrate',
    brand: 'Healix Clinical Wellness',
    strength: '1000 mg / 10 mg',
    dosageForm: 'Effervescent Orange Tablets',
    packSize: 'Tube of 20 Effervescent Tablets',
    category: 'Wellness & Supplements',
    categorySlug: 'wellness-vitamins',
    imageUrl: '/images/medicines/bio-c.jpg',
    description: 'Advanced immune protection effervescent drink combining high-potency Vitamin C with bioactive Zinc for maximum bioavailability, cellular antioxidant defense, and seasonal wellness.',
    ingredients: 'Ascorbic Acid (Vitamin C) 1000mg, Zinc Citrate 10mg.',
    manufacturer: 'Healix Wellness Laboratories',
    price: 7.20,
    compareAtPrice: 8.50,
    discountPercentage: 15,
    stockStatus: 'in_stock',
    prescriptionRequired: false,
    usageInformation: 'Dissolve 1 tablet daily in 200ml of fresh water. Drink immediately after effervescence completes.',
    storageInformation: 'Store in tightly capped tube below 25°C in a dry place.',
    warnings: 'Food supplement. Do not exceed the recommended daily dose.',
    faqs: [
      {
        question: 'Does this contain added sugar?',
        answer: 'No, Healix Bio-C is naturally sweetened and free from added sucrose.'
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 155,
  }

];

export const DOSAGE_FORMS = [
  'Tablets',
  'Film-Coated Tablets',
  'Gastro-Resistant Tablets',
  'Metered Dose Inhaler',
  'Oral Suspension Liquid',
  'Topical Gel',
  'Topical Dermatological Cream',
  'Diagnostic System',
  'Effervescent Soluble Tablets',
  'Effervescent Orange Tablets'
];

export const ALPHABET_LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const SAMPLE_MEDICINES = MEDICINE_PRODUCTS;

/**
 * Helper to fetch a medicine by its slug
 */
export function getMedicineBySlug(slug) {
  return MEDICINE_PRODUCTS.find((m) => m.slug === slug) || null;
}

/**
 * Helper to get featured medicines
 */
export function getFeaturedMedicines() {
  return MEDICINE_PRODUCTS.filter((m) => m.featured);
}

/**
 * Helper to get medicines by letter for A-Z directory
 */
export function getMedicinesByLetter(letter) {
  if (!letter || letter === 'all') return MEDICINE_PRODUCTS;
  const upper = letter.toUpperCase();
  return MEDICINE_PRODUCTS.filter((m) => m.name.toUpperCase().startsWith(upper));
}

/**
 * Helper to get medicines by category slug
 */
export function getMedicinesByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return MEDICINE_PRODUCTS;
  const directMatches = MEDICINE_PRODUCTS.filter(
    (m) => m.categorySlug === categorySlug || 
           m.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(categorySlug) ||
           (m.subcategories && m.subcategories.some(s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categorySlug))
  );

  if (directMatches.length > 0) return directMatches;

  // Keyword relevance fallback for specific anatomical/clinical categories
  const slugClean = categorySlug.toLowerCase();
  const keywordMatches = MEDICINE_PRODUCTS.filter((m) => {
    const text = `${m.name} ${m.genericName} ${m.category} ${m.description} ${m.ingredients}`.toLowerCase();
    if (slugClean.includes('cardiac') || slugClean.includes('heart')) return text.includes('cholesterol') || text.includes('cardio') || text.includes('pressure') || text.includes('lipid');
    if (slugClean.includes('bone') || slugClean.includes('joint') || slugClean.includes('pain')) return text.includes('pain') || text.includes('calcium') || text.includes('paracetamol');
    if (slugClean.includes('derma') || slugClean.includes('skin') || slugClean.includes('nail') || slugClean.includes('hair')) return text.includes('derma') || text.includes('skin') || text.includes('topical');
    if (slugClean.includes('lung') || slugClean.includes('ent') || slugClean.includes('ear') || slugClean.includes('eye')) return text.includes('inhaler') || text.includes('salbutamol') || text.includes('respiratory') || text.includes('asthma');
    if (slugClean.includes('stomach') || slugClean.includes('digestive') || slugClean.includes('liver') || slugClean.includes('kidney') || slugClean.includes('urinary')) return text.includes('esomeprazole') || text.includes('metformin') || text.includes('stomach') || text.includes('reflux');
    if (slugClean.includes('device') || slugClean.includes('appliance') || slugClean.includes('surgical') || slugClean.includes('drip') || slugClean.includes('injectable')) return text.includes('monitor') || text.includes('pressure') || text.includes('glucose') || text.includes('device');
    if (slugClean.includes('supplement') || slugClean.includes('weight') || slugClean.includes('wellness')) return text.includes('vitamin') || text.includes('bio-c') || text.includes('effervescent');
    return false;
  });

  return keywordMatches.length > 0 ? keywordMatches : MEDICINE_PRODUCTS.slice(0, 4);
}

/**
 * Helper for live search query filtering
 */
export function searchMedicines(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return MEDICINE_PRODUCTS.filter((m) =>
    m.name.toLowerCase().includes(q) ||
    m.genericName.toLowerCase().includes(q) ||
    m.brand.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    m.dosageForm.toLowerCase().includes(q)
  );
}

