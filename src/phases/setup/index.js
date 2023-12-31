import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, useLocation } from 'react-router-dom';
import {
  Box,
  Select,
  TextInput,
  Button,
  Image,
  Text,
  RangeInput,
  DataTable,
} from 'grommet';
import { NumberInput } from 'grommet-controls';
import {
  Atm,
  Money,
  Cafeteria,
  Tools,
  Basket,
  Grow,
} from 'grommet-icons';
import {
  ResponsiveContainer,
  ComposedChart,
  //Bar,
  Legend,
  Line,
  CartesianGrid,
  YAxis,
  Label,
  Tooltip,
} from 'recharts';
import theme from '../../config/theme';
import { Title, Heading } from 'bloomer';

import HeroSlide from '../../components/HeroSlide';
import { useInitialsContext } from '../../App2';
import nationalCurrenciesJSON from '../../config/national-currencies.json';
import setupContent from './content';

import {
  NumberDisplay,
  TextDisplay,
} from '../../components';
import {
  getNewSupplyCashIn,
  getNewReserveCashOut,
  getPrice,
  getInvPrice,
  getCRR,
  defaultCICAmount,
  defaultResAmount,
  defaultPriceSetItem,
} from '../../config';


// const queryString = require('query-string');

const nationalCurrencies = [];

const inputStyle = {
  backgroundColor: '#fff',
  borderRadius: 4,
  color: '#363636',
};

for (let value in nationalCurrenciesJSON) {
  const label = nationalCurrenciesJSON[value];
  nationalCurrencies.push({
    label,
    value,
  });
}

export default function Setup() {
  let location = useLocation();

  return (
    <div>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch location={location}>
            {setupContent.map((item, index) => (
              <Route
                key={item.title}
                path={item.path}
                children={
                  <HeroSlide
                    item={item}
                    goNext={
                      setupContent[index + 1] && setupContent[index + 1].path
                    }
                    goPrev={
                      setupContent[index - 1] && setupContent[index - 1].path
                    }
                    navmenu={setupContent}
                  ></HeroSlide>
                }
              />
            ))}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      {/* <Redirect to="/setup/intro" /> */}
    </div>
  );
}

export function SetupIntro() {
  return (
    <Box animation="zoomIn" height="medium">
      <Image
        fit="cover"
        alignSelf="end"
        src="/images/annie-spratt-4IbvGn9z9p4-unsplash.jpg"
      />
    </Box>
  );
}

const coinIcons = [
  'noun_coin_2704606.svg',
  'noun_coin_2704607.svg',
  'noun_coin_2704608.svg',
  'noun_coin_2704609.svg',
  'noun_coin_2704610.svg',
  'noun_coin_2704615.svg',
  'noun_coin_2704633.svg',
  'noun_coin_2704660.svg',
  'noun_coin_2704669.svg',
  'noun_coin_2704681.svg',
  'noun_coin_2704695.svg',
  'noun_coin_2704714.svg',
];

export function SetupPurpose() {
  const { initials, setInitial } = useInitialsContext();

  const selectIcon = (iconPath) => setInitial({ cicIconPath: iconPath });

  const { cicIconPath } = initials;

  // const parsedQuery = queryString.parse(window.location.search);

  // const setQuery = (value) => {
  //   const stringified = queryString.stringify({ ...parsedQuery, ...value });
  //   window.location.search = stringified;
  // };

  return (
    <Box gap="large">
      <Box direction="row" align="center" gap="medium">
        <Box basis="60%">
          <Title isSize={6}>Name your Community Inclusion Currency</Title>
          <TextInput
            value={initials.cicName.label}
            onChange={(event) =>
              setInitial({
                cicName: {
                  label: event.target.value,
                  value: initials.cicName.value,
                },
              })
            }
            style={inputStyle}
          />
        </Box>
        <Box basis="40%">
          <Title isSize={6}>Type initials</Title>
          <TextInput
            value={initials.cicName.value}
            onChange={(event) =>
              setInitial({
                cicName: {
                  label: initials.cicName.label,
                  value: event.target.value.toUpperCase(),
                },
              })
            }
            style={inputStyle}
          />
        </Box>
      </Box>
      <Box>
        <Title isSize={6}>Select an Icon</Title>
        <Box direction="row" wrap justify="center">
          {coinIcons.map((iconPath) => (
            <Box
              key={iconPath}
              animation="jiggle"
              width="80px"
              height="80px"
              overflow="hidden"
              onClick={() => selectIcon(iconPath)}
              basis="25%"
              hoverIndicator="light-3"
              pad="small"
              border={cicIconPath === iconPath ? 'dark-1' : { size: '0px' }}
              background={cicIconPath === iconPath ? 'white' : 'none'}
            >
              <Image
                src={`/icons/setup/initials/${iconPath}`}
                fill
                fit="contain"
              />
            </Box>
          ))}
        </Box>
        <Text
          size="xsmall"
          color="dark-3"
          textAlign="center"
          margin={{ top: 'small' }}
        >
          coin icons by iconcheese from the Noun Project
        </Text>
	  </Box>
	  </Box>
	  
  );
}


export function SetupInitials() {
  const { initials, setInitial } = useInitialsContext();

  // const parsedQuery = queryString.parse(window.location.search);

  // const setQuery = (value) => {
  //   const stringified = queryString.stringify({ ...parsedQuery, ...value });
  //   window.location.search = stringified;
  // };

  return (
    <Box gap="large">
      <Box direction="row" align="center" gap="medium">

      <Box
        direction="row"
        align="end"
        justify="between"
        margin={{ top: 'medium' }}
      >
        <Box
          width="xsmall"
          animation="slideRight"
          margin={{ bottom: 'medium' }}
        >
          <Image src="/icons/setup/intro/noun_Value_2651524.svg" />
        </Box>
        <Box width="large" animation="slideLeft" pad={{ left: 'medium' }}>
          <Title isSize={6}>
            Total value of commitments toward community purpose and projects
          </Title>
          <Box width="medium">
            <Box
              margin={{ bottom: 'small' }}
              direction="row"
              gap="medium"
              align="center"
            >
              <TextInput
                size="large"
                value={initials.supply.toString()}
                onChange={({ target: { value } }) =>
                  Number.isInteger(Number(value)) &&
			  setInitial({ supply: Number(value), cicBal: Number(value) })
                }
                style={inputStyle}
              />
              <Heading
                style={{ fontSize: 28, fontFamily: `'Courier', monospace` }}
              >
                {initials.reserveCurrency.value}
              </Heading>
            </Box>
            <Box>
              <RangeInput
                value={initials.supply}
                onChange={({ target: { value } }) =>
                  setInitial({ supply: Number(value) })
                }
                step={1000}
                min={0}
                max={1000000}
          />
	            <Title isSize={6}>
          Amount of CIC tokens to be issued and distributed to the community:
          </Title>
                                  <NumberDisplay
                                    inline
                                    value={initials.supply}
                                    label={" "+initials.cicName.value+":"}
                                    color="brand"
                                    size="small"
                                  />

            </Box>
          </Box>
        </Box>
      </Box>
	  </Box>
	  	  </Box>
	  
  );
}


export function SetupReserve() {
  const { initials, setInitial } = useInitialsContext();
  const [currencies, setCurrencies] = useState(nationalCurrencies);

  const handleSearch = (searchText) => {
    const regexp = new RegExp(searchText, 'i');
    const filteredCurrencies = nationalCurrencies.filter((currency) =>
      currency.label.match(regexp)
    );
    setCurrencies(filteredCurrencies);
  };

  if (!currencies) {
    return null;
  }

  return (
    <Box gap="medium">
      <Box direction="row" align="end" justify="between">
        <Box
          width="xsmall"
          animation="slideRight"
          margin={{ bottom: 'medium' }}
        >
          <Image src="/icons/setup/intro/noun_currency_3159331.svg" />
        </Box>
        <Box
          width="large"
          gap="medium"
          animation="slideLeft"
          pad={{ left: 'medium' }}
        >
          <Box>
            <Title isSize={6}>Select your national currency for the reserve</Title>
            <Box
              direction="row"
              align="center"
              gap="medium"
              pad={{ bottom: 'small' }}
            >
              <Box basis="60%">
                {initials.reserveCurrency && (
                  <Select
                    background="white"
                    dropHeight="medium"
                    options={currencies}
                    value={initials.reserveCurrency}
                    labelKey="label"
                    onChange={({ option }) =>
                      setInitial({ reserveCurrency: option })
                    }
                    onSearch={handleSearch}
                    style={inputStyle}
                  />
                )}
              </Box>
              <Box basis="40%">
                <Heading
                  style={{ fontSize: 28, fontFamily: `'Courier', monospace` }}
                >
                  {initials.reserveCurrency.value}
                </Heading>
              </Box>
            </Box>
          </Box>
          <Box>
            <Title isSize={6}>
              Amount in National Currency as Collateral Reserve
            </Title>
            <Box width="medium">
              <Box
                margin={{ bottom: 'small' }}
                direction="row"
                gap="medium"
                align="center"
              >
                <TextInput
                  size="large"
                  value={initials.reserve.toString()}
                  onChange={({ target: { value } }) =>
                    Number.isInteger(Number(value)) &&
                    setInitial({ reserve: Number(value) })
                  }
                  style={inputStyle}
                />
                <Heading
                  style={{ fontSize: 28, fontFamily: `'Courier', monospace` }}
                >
                  {initials.reserveCurrency.value}
                </Heading>
              </Box>
              <Box>
                <RangeInput
                  value={initials.reserve}
                  onChange={({ target: { value } }) =>
                    setInitial({ reserve: Number(value) })
                  }
                  step={1000}
                  min={0}
                  max={1000000}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function SetupTRR() {
  const { initials, setInitial } = useInitialsContext();

  const { trr, reserve, supply, reserveCurrency, cicName } = initials;

  const exchangeGrid = [
    {
      label: 'Exchange Rate',
      primary: true,
      size: 'small',
      value: (reserve/(trr * supply) ).toFixed(2),
    },
    {
      value: '=',
      size: 'xxsmall',
    },
    {
      label: `${reserveCurrency.value} reserve`,
      size: 'small',
      value: reserve,
    },
      {
      value: '/',
      size: 'xxsmall',
    },
    {
      label: `${cicName.value} supply`,
      size: 'small',
      value: supply,
    },

    {
      value: '*',
      size: 'xxsmall',
    },

      {
      label: 'TRR',
      size: 'small',
      value: trr,
    },

  ];

  return (
    <Box gap="medium">
      <Box gap="large" align="center" pad={{ top: 'large' }}>
        <Box width="small" alignSelf="center">
          <Heading
            style={{
              fontSize: 36,
              fontFamily: `'Courier', monospace`,
              textAlign: 'center',
            }}
          >
            {(initials.trr * 100).toFixed(0)} {' %'}
          </Heading>
        </Box>
        <Box width="small" alignSelf="center">
          <RangeInput
            value={initials.trr}
            onChange={({ target: { value } }) =>
              setInitial({ trr: Number(value).toFixed(2) })
            }
            step={0.005}
            min={0.01}
            max={1.0}
          />
        </Box>
      </Box>

      <Box direction="row" align="center">
        {exchangeGrid.map((item) => (
          <Box key={item.label} pad="xsmall" width={item.size}>
            <Box>
              <Text
                weight={item.primary ? 'bold' : 'normal'}
                style={{ fontFamily: "'Courier', monospace" }}
                textAlign="center"
                size="xlarge"
              >
                {item.value}
              </Text>
            </Box>
            {item.label && (
              <Box>
                <Text
                  weight={item.primary ? 'bold' : 'normal'}
                  style={{ fontFamily: "'Courier', monospace" }}
                  textAlign="center"
                  size="small"
                >
                  {item.label}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box direction="row" alignSelf="center">
        <Box
          width="medium"
          pad="medium"
          animation={{ type: 'slideRight', delay: 300 }}
        >
          <Image src="/icons/setup/intro/noun_Value_2281190.svg" />
          </Box>
	          <Box
          width="medium"
          pad="medium"
          animation={{ type: 'slideLeft', delay: 300 }}
        >
          <Image src="/icons/setup/intro/noun_currency_3159331.svg" />
        </Box>
        <Box width="medium" pad="medium" animation="slideLeft">
          <Image src="/icons/setup/intro/noun_Value_2651524.svg" />
        </Box>

        <Box width="medium" pad="medium" animation="slideRight">
          <Image src="/icons/setup/intro/noun_Graph_2155901.svg" />
        </Box>
      </Box>
    </Box>
  );
}

export function SetupConfirm() {
  const { initials } = useInitialsContext();
  const tableData = confirmationSheet(initials);

  const cellStyle = {
    fontSize: 18,
    fontFamily: "'Courier', monospace",
  };

  if (!initials.cicIconPath) {
    initials.cicIconPath = 'noun_coin_2704615.svg';
  }

  return (
    <Box
      gap="medium"
      background="white"
      pad="medium"
      animation={{ type: 'slideDown' }}
    >
      <Box alignSelf="center" direction="row" gap="small" align="center">
        <Box width="xsmall">
          <Image
            src={`/icons/setup/initials/${initials.cicIconPath}`}
            fill
            fit="contain"
          />
        </Box>
        <Box width="medium">
          <MonoText>
            {initials.cicName.value} {' | '}
            {initials.cicName.label}
          </MonoText>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={[
            {
              property: 'label',
              render: (datum) => <span style={cellStyle}>{datum.label}</span>,
            },
            {
              property: 'value',
              render: (datum) => (
                <span style={cellStyle}>
                  <b>{datum.value}</b>
                </span>
              ),
              primary: true,
            },
          ]}
          data={tableData}
        />
      </Box>
    </Box>
  );
}

export function SetupLocalTrade() {
    const { initials,setInitial } = useInitialsContext();
  const tableData = statsSheet(initials);
  const [cicExchangeInput, setCicExchangeInput] = useState(defaultCICAmount);
    
  const cellStyle = {
    fontSize: 18,
    fontFamily: "'Courier', monospace",
  };

  if (!initials.cicIconPath) {
    initials.cicIconPath = 'noun_coin_2704615.svg';
  }


    const buyCIC = (txAmount, initials, setInitial) => {

    const { cicBal, cicPurchases } = initials;
    if (txAmount > cicBal) {
      alert('Your CIC balance is too low!');
      return;
    }

    const newcicPurchases = cicPurchases + txAmount;
    const newcicBal = cicBal - txAmount;
    setInitial({
      cicBal: newcicBal,
      cicPurchases: newcicPurchases,
    });

    if (cicExchangeInput > newcicBal) {
      setCicExchangeInput(newcicBal);
    }
  };

  const sellCIC = (txAmount, initials, setInitial) => {

    const { supply, cicBal, cicSales } = initials;
    if (cicBal + txAmount > supply) {
      alert('There is not enough CIC in Circulation');
      return;
    }

    const newcicSales = cicSales + txAmount;
    const newcicBal = cicBal + txAmount;
    setInitial({
      cicBal: newcicBal,
      cicSales: newcicSales,
    });

    if (cicExchangeInput < Math.min(newcicBal, 1000)) {
      setCicExchangeInput(Math.min(Math.floor(newcicBal), 1000));
    }
  };

  const getCICTradeBalance = () => {
    const { cicPurchases, cicSales } = initials;
    const tb = cicSales - cicPurchases;
    return tb;
  };


    
  return (
    <Box
      gap="medium"
      background="white"
      pad="medium"
      animation={{ type: 'slideDown' }}
    >
      <Box alignSelf="center" direction="row" gap="small" align="center">
        <Box width="xsmall">
          <Image
            src={`/icons/setup/initials/${initials.cicIconPath}`}
            fill
            fit="contain"
          />
        </Box>
        <Box width="medium">
          <MonoText>
            {initials.cicName.value} {' | '}
            {initials.cicName.label}
          </MonoText>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={[
            {
              property: 'label',
              render: (datum) => <span style={cellStyle}>{datum.label}</span>,
            },
            {
              property: 'value',
              render: (datum) => (
                <span style={cellStyle}>
                  <b>{datum.value}</b>
                </span>
              ),
              primary: true,
            },
          ]}
          data={tableData}
        />
	  </Box>
                              <Box align="start" pad="xsmall" gap="small">
                                <TextDisplay
                                  inline
      label={"Buy "+initials.cicName.value+" committed goods and services or support local projects."}
                                  color="brand"
                                  size="small"
                                />
                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
      onClick={() => buyCIC(50,initials,setInitial)}
                                    color="brand"
                                    icon={<Basket />}
                                    label="Buy 50"
                                    size="small"
                                  />
                                  <Button
                                    onClick={() => buyCIC(250,initials,setInitial)}
                                    color="brand"
                                    icon={<Tools />}
                                    label="Buy 250"
                                    size="small"
                                  />
                                </Box>

                                      <TextDisplay
                                  inline
                                  label={"Sell your "+initials.cicName.value+" committed goods and services or work for a community project"}
                                  color="brand"
                                  size="small"
                                />

                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
      onClick={() => sellCIC(300,initials,setInitial)}
                                    color="brand"
                                    icon={<Cafeteria />}
                                    label="Sell 300"
                                    size="small"
                                  />
                                  <Button
                                    onClick={() => sellCIC(500,initials,setInitial)}
                                    color="brand"
                                    icon={<Grow />}
                                    label="Sell 500"
                                    size="small"
                                  />
                                </Box>
                                <NumberDisplay
                                  inline
                                  value={initials.cicBal}
                                  label={"My "+initials.cicName.value+" balance:"}
                                  color="brand"
                                  align="start"
                                  size="small"
                                />

                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <NumberDisplay
                                    inline
                                    value={initials.cicPurchases}
                                    label="Bought: "
                                    color="brand"
                                    align="start"
                                    size="small"
                                  />
                                  <NumberDisplay
                                    inline
                                    value={initials.cicSales}
                                    label="Sold: "
                                    color="brand"
                                    align="start"
                                    size="small"
                                  />
                                </Box>
                                <NumberDisplay
                                  inline
                                  value={getCICTradeBalance()}
                                  label="Trade Balance: "
                                  color="brand"
                                  align="start"
                                  size="small"
                                />
</Box>
      
      
    </Box>
  );
}


export function SetupConvert() {
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);
  const [reserveExchangeInput, setReserveExchangeInput] = useState(defaultResAmount);
  const { initials,setInitial } = useInitialsContext();
  const tableData = statsSheet(initials);
  const [cicExchangeInput, setCicExchangeInput] = useState(defaultCICAmount);
    
  const cellStyle = {
    fontSize: 18,
    fontFamily: "'Courier', monospace",
  };

  if (!initials.cicIconPath) {
    initials.cicIconPath = 'noun_coin_2704615.svg';
  }

  const priceSetWithCicPrices = priceSet.map((item) => ({
    ...item,
    cicPrice: (1 / item.price).toFixed(3),
    priceDifference: (1 / item.price - item.price).toFixed(3),
  }));

    
  const getCashIn = () => {
    const { reserve, supply, trr } = initials;
    const addedSupply = getNewSupplyCashIn(
      reserve,
      supply,
      trr,
      reserveExchangeInput
    );
    return addedSupply;
  };

  const cashIn = () => {
    const {
      reserve,
      supply,
      trr,
      cicBal,
      resBal,
      resPurchases,
      cicSales,
    } = initials;
    if (reserveExchangeInput < 0) {
      return;
    }
    const newReserve = reserve + reserveExchangeInput;
    const addedSupply = getNewSupplyCashIn(
      reserve,
      supply,
      trr,
      reserveExchangeInput
    );

    const newcicSales = cicSales + addedSupply;
    const newresPurchases = resPurchases + reserveExchangeInput;

    const newSupply = supply + addedSupply;
    const newCRR = newReserve / newSupply;
    const newcicBal = cicBal + addedSupply;
    const newresBal = resBal - reserveExchangeInput; //Math.round(resBal - reserveExchangeInput);
    setInitial({
      reserve: newReserve,
      supply: newSupply,
      crr: newCRR,
      cicBal: newcicBal,
      resBal: newresBal,
      cicSales: newcicSales,
      resPurchases: newresPurchases,
    });
    setPriceSet([
      ...priceSet,
      {
        cic: newSupply,
        res: newReserve,
        trr: trr,
        crr: getCRR(newReserve, newSupply).toFixed(3),
        price: getPrice(newReserve, newSupply, trr).toFixed(3),
        step: priceSet.length,
      },
    ]);
  };


    
      const getCashOut = () => {
    const { reserve, supply, trr } = initials;
    const addedReserve =
      -1 * getNewReserveCashOut(reserve, supply, trr, cicExchangeInput);
    if (addedReserve < 0) {
      return 0;
    }
    return addedReserve;
  };

  const cashOut = () => {

      const {
      reserve,
      supply,
      trr,
      cicBal,
      resBal,
      cicPurchases,
      resSales,
    } = initials;
    console.log(cicExchangeInput);
    if (cicExchangeInput >= supply) {
      alert('There must remain some CIC in circulation');
      return;
    }

    const addedReserve = getNewReserveCashOut(
      reserve,
      supply,
      trr,
      cicExchangeInput
    );
      
    const newresSales = resSales - addedReserve;
    const newcicPurchases = cicPurchases + cicExchangeInput;
    const newReserve = reserve + addedReserve;
    const newSupply = supply - cicExchangeInput;
    const newCRR = newReserve / newSupply;
    const newcicBal = cicBal - cicExchangeInput;
    const newresBal = resBal - addedReserve;

    setInitial({
      reserve: newReserve,
      supply: newSupply,
      crr: newCRR,
      cicBal: newcicBal,
      resBal: newresBal,
      cicPurchases: newcicPurchases,
      resSales: newresSales,
    });
    setPriceSet([
      ...priceSet,
      {
        cic: newSupply,
        res: newReserve,
        trr: trr,
        crr: getCRR(newReserve, newSupply).toFixed(3),
        price: getPrice(newReserve, newSupply, initials.trr).toFixed(3),
        step: priceSet.length,
      },
    ]);
    if (cicExchangeInput > newSupply) {
      setCicExchangeInput(Math.floor(newSupply * 0.9999));
    }
  };


    
  return (
    <Box
      gap="medium"
      background="white"
      pad="medium"
      animation={{ type: 'slideDown' }}
    >
      <Box>
        <DataTable
          columns={[
            {
              property: 'label',
              render: (datum) => <span style={cellStyle}>{datum.label}</span>,
            },
            {
              property: 'value',
              render: (datum) => (
                <span style={cellStyle}>
                  <b>{datum.value}</b>
                </span>
              ),
              primary: true,
            },
          ]}
          data={tableData}
        />
	  </Box>

      	  <ResponsiveContainer height={100}>
                                <ComposedChart
                                  // width="100%"
                                  height={100}
                                  data={priceSetWithCicPrices}
                                  margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="1 3" />
                                  <YAxis>
                                    <Label
                                      value=""
                                      offset={0}
                                      position="insideTopLeft"
                                    />
                                  </YAxis>

                                  <Tooltip />
                                  <Legend />
                                  {/*<Bar
                                      name="Reserve Ratio"
                                      stackId="a"                     
                                      fill="complementary"
                                      dataKey="crr"
                                      barSize={15}
                                    />

                                  <Area
                                    name="National Currency Reserve"
                                    type="natural"
                                    dataKey="res"
	                 	    stackID="1"
                                    stroke={theme.global.colors.complementary}
                                    strokeWidth={2}
                                  />
                                  <Area
                                    name="Total CIC Supply"
                                    type="natural"
                                    dataKey="cic"
	                 	    stackID="1"
                                    stroke={theme.global.colors.brand}
                                    strokeWidth={2}
                                  />
				   */}
                                  <Line
                                    name="Exchange Rate"
                                    type="natural"
                                    dataKey="price"
                                    stroke={theme.global.colors.brand}
                                    strokeWidth={2}
                                  />
                                </ComposedChart>
                              </ResponsiveContainer>


                                <Box
                                  pad={{ top: 'xsmall', bottom: 'xsmall' }}
                                  gap="xsmall"
                                >
                                  <NumberInput
                                    size="small"
                                    width="small"
                                    value={cicExchangeInput.toString()}
                                    decimals={0}
                                    step={100}
                                    min={0}
                                    max={
                                        initials.supply * 0.999
                                      }
                                    onChange={({ target: { value } }) =>
                                      setCicExchangeInput(Number(value))
                                    }
                                    onInput={() => null}
                                  />
                                  <Button
                                    primary
                                    onClick={() => cashOut()}
                                    color="brand"
                                    icon={<Atm />}
                                    label="Redeem CIC"
                                    size="small"
                                    disabled={cicExchangeInput <= 0}
                                  />
                                  <NumberDisplay
                                    inline
                                    value={getCashOut()}
                                    label={"Recieve "+initials.reserveCurrency.value+": "}
                                    color="complementary"
                                    size="small"
                                  />

                                  <NumberDisplay
                                    inline
                                    value={getPrice(
                                      initials.reserve,
                                      initials.supply,
                                      initials.trr
                                    )}
                                    label={"Exchange Rate to "+initials.reserveCurrency.value+":"}
                                    color="brand"
                                    size="small"
                                  />
                                </Box>


      
                                <Box
                                  pad={{ top: 'xsmall', bottom: 'xsmall' }}
                                  gap="xsmall"
                                >
                                  <NumberInput
                                    size="small"
                                    width="small"
                                    value={reserveExchangeInput.toString()}
                                    decimals={0}
                                    step={100}
                                    min={0}
                                    max={10000000000000}
                                    onChange={({ target: { value } }) =>
                                      setReserveExchangeInput(Number(value))
                                    }
                                    onInput={() => null}
                                  />

                                  <Button
                                    primary
                                    onClick={() => cashIn()}
                                    color="complementary"
                                    icon={<Money color="white" />}
                                    label="Contribute Reserve"
                                    size="small"
                                    style={{ color: 'white' }}
                                    disabled={reserveExchangeInput <= 0}
                                  />
                                  <NumberDisplay
                                    inline
                                     value={getCashIn()}
                                     label={"Create more "+ initials.cicName.value+":"}
                                    size="small"
                                    color="brand"
                                  />

                                  <NumberDisplay
                                    inline
                                    value={getInvPrice(
                                      initials.reserve,
                                      initials.supply,
                                      initials.trr
                                    )}
                                      label={"(Inverse) Exchange Rate to "+ initials.cicName.value+":"}
                                    color="complementary"
                                    size="small"
                                    align="end"
                                  />
          </Box>
                              </Box>

  );
}



const confirmationSheet = (initials) => {
  return [
    {
      label: 'Reserve Currency:',
      value:
        initials.reserveCurrency.value + '|' + initials.reserveCurrency.label,
    },
    {
      label: 'CIC Tokens to be Issued:',
	value: initials.supply.toFixed(2).toString() + ' ' + initials.cicName.value,
    },
    {
      label: 'Reserve Amount:',
	value: initials.reserve.toFixed(2).toString() + ' ' + initials.reserveCurrency.value,
    },
    {
      label: 'Target Reserve Ratio:',
      value: (initials.trr * 100).toFixed(0).toString() + '%',
    },
    {
      label: 'Start Exchange Rate:',
	value: (initials.reserve/(initials.trr * initials.supply) ).toFixed(2),
    },
  ];
};


const statsSheet = (initials) => {
  return [
    {
      label: 'Total CIC Tokens in Circulation:',
	value: initials.supply.toFixed(2).toString() + ' ' + initials.cicName.value,
    },
    {
      label: 'Reserve Amount:',
	value: initials.reserve.toFixed(2).toString() + ' ' + initials.reserveCurrency.value,
    },
  ];
};

function MonoText({ children }) {
  const style = {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: "'Courier', monospace",
  };

  return <Heading style={style}>{children} </Heading>;
}

