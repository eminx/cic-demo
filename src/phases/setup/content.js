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
    info: [
      'Community Inclusion Currencies (CICs) enable communities to thrive in their local markets by enabling them to issue their own currencies, and pursue their market dynamics autonomously.',
      'During the course of this dedicated application, you will be introduced with the fundamental concepts that together compose CIC and design your own.',
      'This is meant to be an interactive & playful tool that is crafted to make it fun learning about the technical details, that may otherwise sound too complex.',
      'Enjoy!',
    ],
    color: 'dark',
    content: SetupIntro,
  },
  {
    path: '/setup/initials',
    title: 'Initials',
    info: [
      'Selecting Initial Parameters will be the first steps in identifying your CIC and making it unique against other currencies by giving it a name, an identifier, and an icon.',
    ],
    color: 'warning',
    content: SetupInitials,
  },
  {
    path: '/setup/reserve-supply',
    title: 'Reserve & Supply',
    info: [
      'Collateral Reserve filled with national money is required to implement an initial trust in communities, as well as for CICs to be exchangable with national currencies; particularly the ones nationally used.',
    ],
    color: 'info',
    content: SetupReserve,
  },
  {
    path: '/setup/trr',
    title: 'TRR & Exchange Rate',
    info: [
      `Target Reserve Ratio (TRR) is a fixed number set initially that will remain as the ideal ratio throughout the usage of CICs, which is basically the amount of CICs issued in relation to the amount in the Reserve.`,
      `Exchange Rate is the dynamic rate that will enable to exchange CICs for national currency in the reserve, and vice versa. The Exchange Rate will be dynamically changed throughout the market dynamics according to the fixed TRR, the amount in the collateral reserve and CICs issued throughout time.`,
      `You can modify the start exchange rate by setting the TRR here.`,
    ],
    color: 'primary',
    content: SetupTRR,
  },
  {
    path: '/setup/confirm',
    title: 'Confirm & Deploy',
    info: [
      'Now one can check and verify how many CICs will be issued in relation to the amount in Reserve. Once parameters are confirmed and contract is deployed, everything is ready for the markets to thrive',
    ],
    color: 'success',
    content: SetupConfirm,
  },
];

export default setupContent;
