import { defineConfig } from 'sanity'
import { buildLegacyTheme } from 'sanity'

const props = {
  '--white': '#ffffff',
  '--black': '#111827',
  '--gray': '#6b7280',
  '--gray-base': '#9ca3af',
  '--component-bg': '#ffffff',
  '--component-text-color': '#111827',

  // Brand colors
  '--brand-primary': '#1e40af',
  '--brand-primary-light': '#3b82f6',
  '--brand-secondary': '#10b981',

  // Backgrounds
  '--default-button-color': '#f3f4f6',
  '--default-button-primary-color': '#1e40af',
  '--default-button-success-color': '#10b981',
  '--default-button-warning-color': '#f59e0b',
  '--default-button-danger-color': '#ef4444',

  // State colors
  '--state-info-color': '#3b82f6',
  '--state-success-color': '#10b981',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#ef4444',

  // Main navigation
  '--main-navigation-color': '#111827',
  '--main-navigation-color--inverted': '#ffffff',

  // Focus
  '--focus-color': '#3b82f6',
}

export const customTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--black'],
  '--white': props['--white'],
  '--gray': props['--gray'],
  '--gray-base': props['--gray-base'],

  '--component-bg': props['--component-bg'],
  '--component-text-color': props['--component-text-color'],

  /* Brand */
  '--brand-primary': props['--brand-primary'],

  // Default button
  '--default-button-color': props['--default-button-color'],
  '--default-button-primary-color': props['--default-button-primary-color'],
  '--default-button-success-color': props['--default-button-success-color'],
  '--default-button-warning-color': props['--default-button-warning-color'],
  '--default-button-danger-color': props['--default-button-danger-color'],

  /* State */
  '--state-info-color': props['--state-info-color'],
  '--state-success-color': props['--state-success-color'],
  '--state-warning-color': props['--state-warning-color'],
  '--state-danger-color': props['--state-danger-color'],

  /* Navbar */
  '--main-navigation-color': props['--main-navigation-color'],
  '--main-navigation-color--inverted': props['--main-navigation-color--inverted'],

  /* Focus */
  '--focus-color': props['--focus-color'],
})
