import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import {
  Box,
  Select,
  TextInput,
  Image,
  Text,
  RangeInput,
  DataTable,
} from 'grommet';
import { Title, Heading } from 'bloomer';

import HeroSlide from '../../components/HeroSlide';
import { useInitialsContext } from '../../App2';
import nationalCurrenciesJSON from '../../config/national-currencies.json';
import setupContent from './content';
import { Subtitle } from 'bloomer/lib/elements/Subtitle';

const queryString = require('query-string');

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

export function SetupInitials() {
  const { initials, setInitial } = useInitialsContext();

  const selectIcon = (iconPath) => setInitial({ cicIconPath: iconPath });

  const { cicIconPath } = initials;

  const parsedQuery = queryString.parse(window.location.search);

  const setQuery = (value) => {
    const stringified = queryString.stringify({ ...parsedQuery, ...value });
    window.location.search = stringified;
  };

  return (
    <Box gap="large">
      <Box direction="row" align="center" gap="medium">
        <Box basis="60%">
          <Title isSize={6}>Name your CIC</Title>
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

export function SetupReserve() {
  const [showIcon, setShowIcon] = useState(true);
  const { initials, setInitial } = useInitialsContext();
  const [currencies, setCurrencies] = useState(nationalCurrencies);

  useEffect(() => {
    setTimeout(() => setShowIcon(false), 3000);
  }, []);

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
        <Box width="xsmall" animation="slideRight">
          <Image src="/icons/setup/intro/noun_currency_3159331.svg" />
        </Box>
        <Box
          width="large"
          gap="medium"
          animation="slideLeft"
          pad={{ left: 'medium' }}
        >
          <Box>
            <Title isSize={6}>Select National Currency for the Reserve</Title>
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

      <Box
        direction="row"
        align="end"
        justify="between"
        margin={{ top: 'medium' }}
      >
        <Box width="xsmall" animation="slideRight">
          <Image src="/icons/setup/intro/noun_Value_2651524.svg" />
        </Box>
        <Box width="large" animation="slideLeft" pad={{ left: 'medium' }}>
          <Title isSize={6}>
            Amount of CIC tokens to be issued and supplied
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
                  setInitial({ supply: Number(value) })
                }
                style={inputStyle}
              />
              <Heading
                style={{ fontSize: 28, fontFamily: `'Courier', monospace` }}
              >
                {initials.cicName.value}
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
      value: ((trr * supply) / reserve).toFixed(2),
    },
    {
      value: '=',
      size: 'xxsmall',
    },
    {
      label: 'TRR',
      size: 'small',
      value: trr,
    },
    {
      value: '*',
      size: 'xxsmall',
    },
    {
      label: `${cicName.value} supplied`,
      size: 'small',
      value: supply,
    },
    {
      value: '/',
      size: 'xxsmall',
    },
    {
      label: `${reserveCurrency.value} reserve`,
      size: 'small',
      value: reserve,
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
            step={0.05}
            min={0.1}
            max={0.9}
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
        <Box width="medium" pad="medium" animation="slideRight">
          <Image src="/icons/setup/intro/noun_Graph_2155901.svg" />
        </Box>
        <Box width="medium" pad="medium" animation="slideLeft">
          <Image src="/icons/setup/intro/noun_Value_2651524.svg" />
        </Box>
        <Box
          width="medium"
          pad="medium"
          animation={{ type: 'slideLeft', delay: 300 }}
        >
          <Image src="/icons/setup/intro/noun_currency_3159331.svg" />
        </Box>
      </Box>
    </Box>
  );
}

export function SetupConfirm() {
  const { initials, setInitial } = useInitialsContext();
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

const confirmationSheet = (initials) => {
  return [
    {
      label: 'Reserve Currency:',
      value:
        initials.reserveCurrency.value + '|' + initials.reserveCurrency.label,
    },
    {
      label: 'Tokens to be Issued:',
      value: initials.supply.toString() + ' ' + initials.cicName.value,
    },
    {
      label: 'Reserve Amount:',
      value: initials.reserve.toString() + ' ' + initials.reserveCurrency.value,
    },
    {
      label: 'Target Reserve Ratio:',
      value: (initials.trr * 100).toFixed(0).toString() + '%',
    },
    {
      label: 'Start Exchange Rate:',
      value: ((initials.trr * initials.supply) / initials.reserve).toFixed(2),
    },
    {
      label: 'Type of Currency:',
      value: 'CIC',
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
