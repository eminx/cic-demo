import React, { useState } from 'react';
import { Box, Select, TextInput, RangeInput } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { Title, Heading, Field, Label, Control, Input } from 'bloomer';

import { useInitialsContext } from '../../App2';
import nationalCurrenciesJSON from '../../config/national-currencies.json';
import InitialField from '../../components/InitialField';

const nationalCurrencies = [];

for (let value in nationalCurrenciesJSON) {
  const label = nationalCurrenciesJSON[value];
  nationalCurrencies.push({
    label,
    value,
  });
}

export function SetupIntro() {
  return (
    <Box>
      <Box alignSelf="center" gap="xlarge"></Box>
    </Box>
  );
}

export function SetupInitials() {
  const { initials, setInitial } = useInitialsContext();

  return (
    <Box>
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
          ></TextInput>
        </Box>
        <Box basis="40%">
          <Title isSize={6}>Type initials</Title>
          <TextInput
            value={initials.cicName.value}
            onChange={(event) =>
              setInitial({
                cicName: {
                  label: initials.cicName.label,
                  value: event.target.value,
                },
              })
            }
          ></TextInput>
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
    <Box gap="xlarge">
      <Box>
        <Title isSize={6}>Select National Currency for the Reserve</Title>
        <Box direction="row" align="center" gap="medium">
          <Box basis="60%">
            <Select
              dropHeight="medium"
              options={currencies}
              value={initials.reserveCurrency}
              labelKey="label"
              onChange={({ option }) => setInitial({ reserveCurrency: option })}
              onSearch={handleSearch}
            />
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
          Amount in Selected National Currency as Collateral Reserve
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
              step={100}
              min={0}
              max={1000000}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function SetupTRR() {
  return (
    <Box>
      <Box alignSelf="center" gap="xlarge"></Box>
    </Box>
  );
}

export function SetupConfirm() {
  return (
    <Box>
      <Box alignSelf="center" gap="xlarge"></Box>
    </Box>
  );
}
