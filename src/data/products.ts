import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'ICare',
    category: 'Enterprise Solutions',
    description:
      'A comprehensive enterprise solution designed to streamline operations and boost productivity across your organization.',
    features: ['Scalable Architecture', 'Real-time Analytics', '24/7 Support'],
  },
  {
    id: 2,
    name: 'Product Beta',
    category: 'Data Analytics',
    description:
      'Advanced data analytics platform that transforms raw data into actionable insights for smarter decision-making.',
    features: ['AI-Powered Insights', 'Custom Dashboards', 'Data Integration'],
  },
];
