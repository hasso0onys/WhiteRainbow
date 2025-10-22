import { buildLegacyTheme } from 'sanity'

const props = {
  '--white': '#ffffff',
  '--black': '#000000',
  '--brand': '#000000',
}

export const customTheme = buildLegacyTheme({
  '--black': props['--black'],
  '--white': props['--white'],
  '--brand': props['--brand'],

  '--default-button-color': props['--black'],
  '--default-button-primary-color': props['--brand'],
  '--default-button-success-color': '#43d675',
  '--default-button-warning-color': '#fbd024',
  '--default-button-danger-color': '#f03e2f',

  '--state-info-color': props['--brand'],
  '--state-success-color': '#43d675',
  '--state-warning-color': '#fbd024',
  '--state-danger-color': '#f03e2f',

  '--main-navigation-color': props['--black'],
  '--focus-color': props['--black'],
})
