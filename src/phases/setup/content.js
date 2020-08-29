import {
  SetupIntro,
  SetupInitials,
  SetupReserve,
//  SetupTRR,
  SetupConfirm,
} from './';

const setupContent = [
  {
    path: '/setup/intro',
    title: 'Intro',
    info: [
      'Community Inclusion Currencies (CICs) enable communities to collectivley plan for the future by developing and supporting community markets with their own currencies.',
      'This application will introduce you with the fundamental concepts that together compose CIC and help you and your community to design your own.',
      'This is meant to be an interactive & playful tool that is crafted to make it fun learning about the social and technical details.',
      'Enjoy!',
    ],
    color: 'dark',
    content: SetupIntro,
  },
  {
    path: '/setup/purpose',
    title: 'Purpose and projects',
    info: [
	'What is the overarching goal of this CIC and specifically what needs to be done in your community? What do you need a budget for?',
	'As with all group processes, listening and patience are important to enable all voices to be heard. This process is itterative, your community will go back and refine these concepts before launching a CIC.',
	'Setting a time period to develop your CIC and reach your goals as a community is also important.',
	'While this CIC is a budget for these projects and goals, there may be many CICs along the way to reach your ultimate goals.',
    ],
    color: 'warning',
    content: SetupIntro,
  },

  {
    path: '/setup/commitments',
    title: 'Commitment',
    info: [
	'As a community how many # of you are ready to contribute toward those projects and goals?',
	'And can you value your wealth in care, time, efforts, and resoruces in national currency?',
	'The total amount of commitments will be the supply of tokens you create which will be divided among the community based on individual commitments and projects.',
	'Give your currency a name (both long and short (25 & 5 characters)) that represents your purpose.'
    ],
    color: 'warning',
    content: SetupInitials,
  },
  {
    path: '/setup/reserves',
    title: 'Collateral',
    info: [
	'Committed goods and services alone may not be enough to reach your goals.',
	'A reserve is a way of adding collateral to your commitments and allowing community members holding your CIC to redeem them for National Currency in reserve.',
	'How much reserve can your community provide? Note that only CIC holders can remove collateral, but anyone can add to it.',
	'Because a community often does not have enough National Currency to 100% collateralize their committments, communities can set a goal of what a full collateral reserve is using a Target Reserve Ratio (TRR)',
	'The TRR is a fixed number that sets the target ratio of collateral to CIC supply that gives you an exchange price of 1:1 with the National Currency reserve.',
	'The xxchange Rate will be dynamically changed each time someone adds or removes collateral. Which you will be able to try later.',
	'You can modify the starting exchange rate by setting the TRR here.'

    ],
    color: 'info',
    content: SetupReserve,
  },
  {
    path: '/setup/confirm',
    title: 'Confirm & Deploy',
    info: [
      'Check and verify how many CICs will be issued in relation to the amount in Reserve. Once parameters are confirmed and contract is deployed, everything is ready for you to reach your goals and a markets to thrive',
    ],
    color: 'success',
    content: SetupConfirm,
  },
  {
    path: '/setup/trade',
    title: 'Local Trade',
    info: [
	'Your CIC contract has been created and the tokens have been distributed to community members and designated accounts for your projects.',
	'See your balance here and some of your options for local spending on committed goods and services as well as community designated projects, like a community garden',
	'You can also earn more CIC by selling your goods or services to others or working on community projects.',
	'The more you trade locally the more you are sharing your reseaources toward common goals!',

    ],
    color: 'success',
    content: SetupConfirm,
  },
  {
    path: '/setup/convert',
    title: 'Conversion',
    info: [
	'Some people holding CICs may have need for national currency.',
	'Redemption of CICs for underlying collateral makes this possible. Each time you redeem you make it cheaper for people to add more collateral and refill the reserves up to the target reserve ratio.',
	'Contributing reserves allows anyone to take part in the CIC after the contracts have been deployed. This increased the exchange rate and gives people an ability to support local businesses by adding liquidity to the CIC.',
	'Note that you can also convert your CIC to other CICs, current past and future.',

    ],
    color: 'success',
    content: SetupConfirm,
  },
];

export default setupContent;
