const PLANS = {
  free: {
    id: 'free',
    label: 'Free',
    tagline: 'BASIC ACCESS',
    price: 0,
    priceLabel: '₹0',
    period: '/forever',
    platformFee: 15,
    recommended: false,
    features: ['Standard Marketplace Listing', '15% Platform Fee', 'Basic Support'],
    cta: 'Current Plan',
    ctaUpgrade: 'Get Started',
  },
  pro: {
    id: 'pro',
    label: 'Pro',
    tagline: 'MOST POPULAR',
    price: 499,
    priceLabel: '₹499',
    period: '/month',
    platformFee: 8,
    recommended: true,
    features: ['Priority Search Results', '8% Platform Fee', 'Advanced Analytics'],
    cta: 'Current Plan',
    ctaUpgrade: 'Upgrade to Pro',
  },
  premium: {
    id: 'premium',
    label: 'Premium',
    tagline: 'ENTERPRISE SCALE',
    price: null,
    priceLabel: 'Custom',
    period: '',
    platformFee: 5,
    recommended: false,
    features: ['White-label Storefront', '5% Platform Fee', 'Dedicated Manager'],
    cta: 'Pending Approval',
    ctaUpgrade: 'Contact Us',
  },
};

const PLATFORM_FEES = { free: 15, pro: 8, premium: 5 };
const PLAN_ORDER = ['free', 'pro', 'premium'];

const STATUS = {
  active: 'active',
  pending: 'pending',
  cancelled: 'cancelled',
  expired: 'expired',
};

const BILLING = {
  monthly: 'monthly',
  forever: 'forever',
  custom: 'custom',
};

module.exports = {
  PLANS,
  PLATFORM_FEES,
  PLAN_ORDER,
  STATUS,
  BILLING,
};
