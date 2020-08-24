import {
  SetupIntro,
  SetupInitials,
  SetupReserve,
  SetupTRR,
  SetupConfirm,
} from './';

const setupContent = [
  {
    path: '/setup/intro',
    title: 'Intro',
    subtitle:
      'Community Inclusion Currencies enable communities to thrive in their local markets by enabling them to issue their own currencies, and pursue their market dynamics autonomously.',
    color: 'danger',
    content: SetupIntro,
  },
  {
    path: '/setup/initials',
    title: 'Initials',
    subtitle:
      'Selecting Initial Parameters will be the first steps in identifying your CIC and making it unique against other currencies by giving it a name, an identifier, and an icon.',
    color: 'warning',
    content: SetupInitials,
  },
  {
    path: '/setup/reserve',
    title: 'Collateral Reserve',
    subtitle:
      'Initial Reserve filled with national money is required to implement an initial trust in communities, as well as for CICs to be exchangable with national currencies; particularly the ones nationally used.',
    color: 'info',
    content: SetupReserve,
  },
  {
    path: '/setup/trr',
    title: 'Target Reserve Ratio',
    subtitle:
      'Target Reserve Ratio is the ideal ratio that will be in place throughout the usage of CICs, which is basically the amount of CICs issued in relation to the amount in the Reserve.',
    color: 'primary',
    content: SetupTRR,
  },
  {
    path: '/setup/confirm',
    title: 'Confirm & Deploy',
    subtitle:
      'Now one can check and verify how many CICs will be issued in relation to the amount in Reserve. Once parameters are confirmed and contract is deployed, everything is ready for the markets to thrive',
    color: 'success',
    content: SetupConfirm,
  },
];

export default setupContent;
