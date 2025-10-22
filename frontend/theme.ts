import { buildLegacyTheme } from 'sanity'

export const customTheme = buildLegacyTheme({
  '--black': '#000000',
  '--white': '#ffffff',

  '--default-button-color': '#000000',
  '--default-button-primary-color': '#000000',
  '--default-button-success-color': '#43d675',
  '--default-button-warning-color': '#fbd024',
  '--default-button-danger-color': '#f03e2f',

  '--state-info-color': '#000000',
  '--state-success-color': '#43d675',
  '--state-warning-color': '#fbd024',
  '--state-danger-color': '#f03e2f',

  '--main-navigation-color': '#000000',
  '--focus-color': '#000000',
})
