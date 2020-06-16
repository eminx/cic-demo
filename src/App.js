import React, { useState } from 'react';
import { Button, Box, Heading, Image, Grommet, Text } from 'grommet';
import { NumberInput } from 'grommet-controls';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
} from 'recharts';
import { Atm, Money } from 'grommet-icons';

import theme from './config/theme';
import { AppBar, InitialsUI } from './components';
import {
  getNewSupplyCashIn,
  getNewReserveCashOut,
  getPrice,
  defaultInitials,
  defaultPriceSetItem,
  defaultAmount,
} from './config';

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [playMode, setPlayMode] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const cashIn = (amount) => {
    const { reserve, supply, trr } = initials;
    const newReserve = reserve + amount;
    const newSupply = getNewSupplyCashIn(reserve, supply, trr, amount);
    setInitials({ reserve: newReserve, supply: newSupply, trr: initials.trr });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newReserve, newSupply, trr),
        step: priceSet.length,
      },
    ]);
  };

  const cashOut = (amount) => {
    const { reserve, supply, trr } = initials;
    const newReserve = getNewReserveCashOut(reserve, supply, trr, amount);
    const newSupply = supply - amount;
    setInitials({ reserve: newReserve, supply: newSupply, trr: initials.trr });
    setPriceSet([
      ...priceSet,
      {
        price: getPrice(newReserve, newSupply, initials.trr),
        step: priceSet.length,
      },
    ]);
  };

  const changePlayMode = () => {
    const { reserve, supply, trr } = initials;
    if (playMode) {
      setPlayMode(false);
      setInitials(defaultInitials);
      setPriceSet([defaultPriceSetItem]);
      setAmount(defaultAmount);
    } else {
      setPriceSet([
        {
          price: getPrice(reserve, supply, trr),
          step: 0,
        },
      ]);
      setPlayMode(true);
    }
  };

  const initialsUIProps = {
    initials,
    setInitial,
    playMode,
  };

  const latestPrice = priceSet[priceSet.length - 1].price;

  return (
    <Grommet theme={theme}>
      <Box background="light-1" height="100%">
        <AppBar direction="row">
          <Image
            width="180px"
            src="https://static.wixstatic.com/media/ce30dd_833dabd658664e039a2b4504f4993a91~mv2.png/v1/fill/w_292,h_80,al_c,q_85,usm_0.66_1.00_0.01/ce30dd_833dabd658664e039a2b4504f4993a91~mv2.webp"
          />
          <Box>
            <Heading level={2} textAlign="center">
              CIC Bonding Curve Demo
            </Heading>
            <Text>CIC = Community Inclusion Currency</Text>
          </Box>
          <Box width="180px" height="10px" />
        </AppBar>
        <Box width="100%" pad="medium" direction="row" justify="center">
          <Box
            width={playMode ? 'medium' : 'large'}
            animation={playMode ? 'slideLeft' : 'fadeIn'}
          >
            <InitialsUI {...initialsUIProps} />
            <Button
              primary={!playMode}
              label={playMode ? 'Reset' : 'Start'}
              onClick={() => changePlayMode()}
            />
          </Box>

          {playMode && (
            <Box width="70%" pad="medium" animation="zoomIn">
              <Box
                direction="row"
                width="100%"
                height="60px"
                gap="small"
                justify="around"
                align="center"
              >
                <Box direction="row" align="center" gap="small">
                  <Box width="small" align="center" pad="xsmall">
                    <NumberInput
                      size="xlarge"
                      value={amount.toString()}
                      decimals={0}
                      step={5}
                      min={1}
                      max={1000}
                      onChange={({ target: { value } }) =>
                        setAmount(Number(value))
                      }
                    />
                  </Box>
                  <Box gap="xsmall">
                    <Button
                      onClick={() => cashIn(amount)}
                      color="dark-1"
                      icon={<Money />}
                      label="CASH IN"
                      size="small"
                    />
                    <Button
                      onClick={() => cashOut(amount)}
                      color="dark-1"
                      icon={<Atm />}
                      label="CASH OUT"
                      size="small"
                    />
                  </Box>
                </Box>

                <Box align="end">
                  <Text>Current Price:</Text>
                  <Text size="xxlarge">
                    <code>{latestPrice}</code>
                  </Text>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  width="100%"
                  height={400}
                  data={priceSet}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="1 3" />
                  <XAxis dataKey="step">
                    <Label
                      value="conversions"
                      offset={0}
                      position="insideBottomRight"
                    />
                  </XAxis>
                  <YAxis>
                    <Label value="price" offset={0} position="insideTopLeft" />
                  </YAxis>
                  <Tooltip />
                  <Bar fill="#bbde8a" dataKey="price" barSize={20} />
                  <Line
                    // type="monotone"
                    dataKey="price"
                    stroke="#db2e9c"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
