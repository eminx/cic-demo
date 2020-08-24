import React, { useState } from 'react';
import { Box, Select, TextInput } from 'grommet';
import { Title, Heading, Field, Label, Control, Input } from 'bloomer';

import { useCurrencyContext } from '../../App2';
import nationalCurrenciesJSON from '../../config/national-currencies.json';

const nationalCurrencies = [];

for (let value in nationalCurrenciesJSON) {
  const label = nationalCurrenciesJSON[value];
  nationalCurrencies.push({
    label,
    value,
  });
}

export function SetupIntro({}) {
  const { reserveCurrency, setReserveCurrency } = useCurrencyContext();
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
    <Box>
      <Box alignSelf="center" gap="xlarge">
        <Box direction="row" align="center" gap="small">
          <Box basis="60%">
            <Title isSize={6}>Name your CIC</Title>
            <TextInput placeholder="Mangotonic"></TextInput>
          </Box>
          <Box basis="40%">
            <Title isSize={6}>Type initials</Title>
            <TextInput placeholder="MTC"></TextInput>
          </Box>
        </Box>

        <Box>
          <Title isSize={6}>Select National Currency for the Reserve</Title>
          <Box direction="row" align="center" gap="small">
            <Box basis="60%">
              <Select
                dropHeight="medium"
                options={currencies}
                value={reserveCurrency}
                labelKey="label"
                onChange={({ option }) => setReserveCurrency(option)}
                onSearch={handleSearch}
              />
            </Box>
            <Box basis="40%">
              <Heading
                style={{ fontSize: 28, fontFamily: `'Courier', monospace` }}
              >
                {reserveCurrency.value}
              </Heading>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
