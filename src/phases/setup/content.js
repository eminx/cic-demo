import {
  SetupIntro,
  SetupPurpose,
  SetupInitials,
  SetupReserve,
  SetupLocalTrade,
  SetupConvert,
  SetupTRR,
  SetupConfirm,
} from './';

const setupContent = [
  {
    path: '/setup/intro',
    title: 'Intro',
    info: [
      'Community Inclusion Currencies (CICs) enable communities to collectivley plan for the future by developing and supporting community projects and markets with their own currencies.',
      'This introduction will explore the fundamental concepts that together compose CIC and help you and your community to design your own. Purpose & Projects, Commitments, Collateral, Target Reserve Ratio, Trade and Conversion.',
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
	'Give your currency a name (both long & short (25 & 5 characters)) that represents your purpose.',
	'What is the overarching goal of this CIC and specifically what needs to be done in your community? What do you need a budget for?',
	'As with all group processes, listening and patience are important to enable all voices to be heard. This process is iterative, your community will go back and refine these concepts before launching a CIC.',
	'Setting a time period to develop your CIC and reach your goals as a community is also important, as well as defining how the CIC will be used in projects. What will the demand for this CIC be in each project?',
	'This step can also be contructed as a typical social enterprise business plan which incorporates community ownership and support.',
    ],
    color: 'warning',
    content: SetupPurpose,
  },

  {
    path: '/setup/reserves',
    title: 'Reserve',
    info: [
	'How much national currency can your community dedicate to these projects as a reserve?',
	'A reserve is a way of adding collateral to your commitments and allowing community members holding your CIC to redeem them for National Currency.',
	'Note that these reserves will be bonded to your CIC token such that only CIC holders can remove reserve, but anyone can add to it.',

    ],
    color: 'info',
    content: SetupReserve,
  },

  {
    path: '/setup/commitments',
    title: 'Commitment',
    info: [
	'Because national currency is often scarce, your project budgets can also included committed goods and services.',
	'People may only be able to commit to offering their time, goods and services.',
	'As a community how many of you are ready to contribute toward those projects and goals?',
	'Value your wealth in care, time, efforts and resources in national currency.',
	'The total amount of commitments will be the supply of CIC tokens you create. These CIC will be divided among the community based on individual commitments and choosen projects.',

    ],
    color: 'warning',
    content: SetupInitials,
  },

    {
    path: '/setup/trr',
    title: 'TRR',
    info: [
	'Because a community often does not have enough national currency to 100% collateralize their commitments, communities can set a goal of what a full collateral reserve is using a Target Reserve Ratio (TRR)',
	'The TRR is a fixed number that sets the target ratio of collateral to CIC supply that gives you an exchange price of 1:1 with the National Currency in reserve.',
	'The exchange rate to national currency will be dynamically changed each time someone adds or removes collateral. The lower the TRR the faster the exchange rate will change.',
	'You can modify the starting exchange rate by setting the TRR here.'

    ],
    color: 'info',
    content: SetupTRR,
  },
  {
    path: '/setup/confirm',
    title: 'Confirm & Deploy',
    info: [
      'Check and verify how many CICs will be issued in relation to the amount in reserve. Once parameters are confirmed and contract is deployed, these CIC will be distributed to community members and projects and trade can begin to build thriving projects and markets around them!',
    ],
    color: 'success',
    content: SetupConfirm,
  },
  {
    path: '/setup/trade',
    title: 'Local Trade',
    info: [
	'Your CIC contract has been created and the tokens have been distributed to community members and designated accounts for your projects.',
	'See your (example) balance here and some of your options for local spending on committed goods and services as well as community designated projects, like a community garden',
	'You can also earn more CIC by selling your goods or services to others or working on community projects.',
	'The more you trade locally the more you are sharing your resources toward common goals!',

    ],
    color: 'success',
    content: SetupLocalTrade,
  },
  {
    path: '/setup/convert',
    title: 'Conversion',
    info: [
	'Redemption of CICs for national currency is possible with underlying reserves. Each time you redeem you, make it cheaper for people to add more collateral and refill the reserves.',
	'The amount of national currency withdrawn when you redeemed CIC from the group reserve is given by an equation called a bonding curve:',
	'Reserve Withdrawn = Current Reserve *(((1 - CIC_Redeemed / CIC Supply ))^(1/ TRR )-1)',

		'Contributing reserves allows anyone to create more CIC. This increases the exchange rate and supports local businesses and projects.',
	'The amount of CIC created based on a contribution in national currency is given by the inverse of the equations above.',

		'Note that you can also convert your CIC to other CICs, current past and future.',
    ],
    color: 'success',
    content: SetupConvert,
  },
];

export default setupContent;
