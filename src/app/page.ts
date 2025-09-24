export { PageHome as default } from '~/pages/home';
// export { ComingSoonPage as default } from '~/pages/coming-soon';

// Use ISR (Incremental Static Regeneration) instead of force-dynamic for better performance
export const revalidate = 3600; // Revalidate every hour
