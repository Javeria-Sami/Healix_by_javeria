import { MEDICINE_PRODUCTS } from '../data/pharmacy.js';
import { LAB_TESTS_NAV } from '../data/navigation.js';
import { ARTICLES } from '../data/articles.js';

// Flatten lab tests list
const ALL_LAB_TESTS = LAB_TESTS_NAV.columns.flatMap(col => col.items);

// Common medical aliases for Recognition over Recall
const ALIASES = {
  'sugar': ['blood glucose fasting test', 'glucophage', 'accu-chek'],
  'blood sugar': ['blood glucose fasting test', 'glucophage', 'accu-chek'],
  'diabetes': ['glucophage', 'accu-chek', 'blood glucose fasting test'],
  'pressure': ['omron m3', 'concor', 'cozaar', 'cholesterol test', 'ecg test'],
  'blood pressure': ['omron m3', 'concor', 'cozaar', 'ecg test'],
  'bp': ['omron m3', 'concor', 'cozaar', 'ecg test'],
  'fever': ['panadol extra', 'calpol', 'brufen', 'disprin'],
  'pain': ['panadol extra', 'brufen', 'disprin', 'voltarol'],
  'headache': ['panadol extra', 'brufen', 'disprin'],
  'cough': ['ventolin', 'zyrtec'],
  'allergy': ['zyrtec', 'ventolin', 'betnovate-n'],
  'asthma': ['ventolin'],
  'cholesterol': ['lipitor', 'cholesterol test', 'understanding-preventative-cardiovascular-markers'],
  'heart': ['concor', 'cozaar', 'lipitor', 'ecg test', 'understanding-preventative-cardiovascular-markers'],
  'acid': ['gaviscon', 'nexium', 'uric acid (serum) test'],
  'stomach': ['gaviscon', 'nexium', 'flagyl', 'lft (liver function test)'],
  'infection': ['augmentin', 'flagyl', 'betnovate-n', 'blood culture test'],
  'vitamins': ['surbex-z', 'neurobion', 'vitamin c 1000mg + zinc effervescent'],
  'energy': ['surbex-z', 'neurobion', 'optimizing-metabolic-flexibility-for-longevity'],
  'skin': ['betnovate-n', 'sudocrem', 'biopsy'],
  'baby': ['calpol', 'sudocrem'],
};

/**
 * Universal Healthcare Search Provider
 * Searches across Medicines, Lab Tests, and Health Articles with fuzzy prefix & keyword matching.
 */
export function searchHealthcareCatalog(query) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return { medicines: [], labTests: [], articles: [], all: [] };
  }

  const cleanQuery = query.trim().toLowerCase();
  const tokens = cleanQuery.split(/\s+/).filter(Boolean);

  // 1. Medicines
  const matchedMedicines = MEDICINE_PRODUCTS.filter((m) => {
    const text = `${m.name} ${m.genericName} ${m.brand} ${m.category} ${m.description} ${m.ingredients}`.toLowerCase();
    const matchesTokens = tokens.every(t => text.includes(t));
    
    // Check alias matching
    const aliasMatches = Object.entries(ALIASES).some(([aliasKey, targetNames]) => {
      if (cleanQuery.includes(aliasKey)) {
        return targetNames.some(target => m.name.toLowerCase().includes(target) || m.id.toLowerCase().includes(target));
      }
      return false;
    });

    return matchesTokens || aliasMatches;
  }).slice(0, 5).map(m => ({
    id: m.id,
    title: m.name,
    subtitle: `${m.strength ? m.strength + ' • ' : ''}${m.genericName || m.brand}`,
    type: 'Medicine',
    badgeClass: 'bg-primary-50 text-primary-700 border-primary-200',
    href: `/pharmacy/medicine/${m.slug}`,
    price: m.price ? `Rs. ${Math.round(m.price * 278)}` : null, // Approx PKR formatting
    imageUrl: m.imageUrl || '/images/medicines/panadol-extra.jpg',
  }));

  // 2. Lab Tests
  const matchedLabTests = ALL_LAB_TESTS.filter((t) => {
    const text = `${t.name} ${t.slug}`.toLowerCase();
    const matchesTokens = tokens.every(tok => text.includes(tok));
    
    // Check alias matching
    const aliasMatches = Object.entries(ALIASES).some(([aliasKey, targetNames]) => {
      if (cleanQuery.includes(aliasKey)) {
        return targetNames.some(target => t.name.toLowerCase().includes(target) || t.slug.toLowerCase().includes(target));
      }
      return false;
    });

    return matchesTokens || aliasMatches;
  }).slice(0, 4).map(t => ({
    id: t.slug,
    title: t.name,
    subtitle: 'Accredited Clinical Diagnostic Test',
    type: 'Lab Test',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
    href: t.href || `/lab-tests/${t.slug}`,
    price: null,
    imageUrl: null,
  }));

  // 3. Health Articles & Blogs
  const matchedArticles = ARTICLES.filter((a) => {
    const text = `${a.title} ${a.category} ${a.excerpt} ${a.tags?.join(' ')}`.toLowerCase();
    const matchesTokens = tokens.every(tok => text.includes(tok));
    return matchesTokens;
  }).slice(0, 3).map(a => ({
    id: a.id,
    title: a.title,
    subtitle: `${a.category} • ${a.readTime}`,
    type: 'Health Article',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    href: `/blog/${a.slug}`,
    price: null,
    imageUrl: a.image,
  }));

  const all = [...matchedMedicines, ...matchedLabTests, ...matchedArticles];

  return {
    medicines: matchedMedicines,
    labTests: matchedLabTests,
    articles: matchedArticles,
    all,
    totalCount: all.length,
  };
}
