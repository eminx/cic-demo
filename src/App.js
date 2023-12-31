import React, { useState } from 'react';
import {
  Anchor,
  Paragraph,
  Button,
  Box,
  Image,
  Grommet,
  Main,
  Text,
  Footer,
} from 'grommet';
import { NumberInput } from 'grommet-controls';
import {
  ResponsiveContainer,
  ComposedChart,
  //Bar,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Area,
  //AreaChart,
} from 'recharts';
import {
  Atm,
  Money,
  Cafeteria,
  Tools,
  Bike,
  Basket,
  Book,
  Grow,
} from 'grommet-icons';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';

import theme from './config/theme';
import {
  AppBar,
  InitialsUI,
  PlayMonitor,
  NumberDisplay,
  TextDisplay,
} from './components';
import {
  getNewSupplyCashIn,
  getNewReserveCashOut,
  getPrice,
  getInvPrice,
  getCRR,
  defaultInitials,
  defaultCICAmount,
  defaultResAmount,
  defaultPriceSetItem,
} from './config';

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [playMode, setPlayMode] = useState(false);
  const [cicExchangeInput, setCicExchangeInput] = useState(defaultCICAmount);
  const [reserveExchangeInput, setReserveExchangeInput] = useState(defaultResAmount);
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const getRESTradeBalance = () => {
    const { resPurchases, resSales } = initials;
    const tb = resSales - resPurchases;
    return tb;
  };
  const getCICTradeBalance = () => {
    const { cicPurchases, cicSales } = initials;
    const tb = cicSales - cicPurchases;
    return tb;
  };

  const buyCIC = (txAmount) => {
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

  const sellCIC = (txAmount) => {
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

  const buyReserve = (txAmount) => {
    const { resBal, resPurchases } = initials;
    if (txAmount > resBal) {
      alert('Your National Currency balance is too low!');
      return;
    }
    const newresPurchases = resPurchases + txAmount;
    const newresBal = resBal - txAmount;
    setInitial({
      resBal: newresBal,
      resPurchases: newresPurchases,
    });
    if (reserveExchangeInput > resBal) {
      setReserveExchangeInput(Math.floor(resBal));
    }
  };

  const sellReserve = (txAmount) => {
    const { resBal, resSales } = initials;
    const newresSales = resSales + txAmount;
    const newresBal = resBal + txAmount;
    setInitial({
      resBal: newresBal,
      resSales: newresSales,
    });
    if (reserveExchangeInput < Math.min(Math.floor(newresBal), 1000)) {
      setReserveExchangeInput(Math.min(Math.floor(newresBal), 1000));
    }
  };

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
    if (reserveExchangeInput > resBal) {
      alert('Not enough National Currency');
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
    if (reserveExchangeInput > newresBal) {
      setReserveExchangeInput(Math.floor(newresBal));
    }
    if (cicExchangeInput < Math.min(newcicBal, 1000)) {
      setCicExchangeInput(Math.min(Math.floor(newcicBal), 1000));
    }
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
    if (cicExchangeInput > cicBal) {
      alert('There is not sufficient cicBal');
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
    if (cicExchangeInput > newcicBal) {
      setCicExchangeInput(Math.floor(newcicBal));
    }
    if (cicExchangeInput > newSupply) {
      setCicExchangeInput(Math.floor(newSupply * 0.9999));
    }
    if (reserveExchangeInput < Math.min(Math.floor(newresBal), 1000)) {
      setReserveExchangeInput(Math.min(Math.floor(newresBal), 1000));
    }
  };

  const changePlayMode = () => {
    const { reserve, supply, trr } = initials;
    if (playMode) {
      setPlayMode(false);
      setInitials(defaultInitials);
      setPriceSet([defaultPriceSetItem]);
      setCicExchangeInput(defaultCICAmount);
      setReserveExchangeInput(defaultResAmount);
    } else {
      setPriceSet([
        {
          cic: supply,
          res: reserve,
          trr: trr,
          crr: getCRR(reserve, supply).toFixed(3),
          price: getPrice(reserve, supply, trr).toFixed(3),
          step: 0,
        },
      ]);
      setPlayMode(true);
    }
  };

  // const reservePrice = priceSet[priceSet.length - 1].price;
  //const cicPrice = (1 / reservePrice).toFixed(2);

  const priceSetWithCicPrices = priceSet.map((item) => ({
    ...item,
    cicPrice: (1 / item.price).toFixed(3),
    priceDifference: (1 / item.price - item.price).toFixed(3),
  }));

  return (
    <Grommet theme={theme}>
      <ScreenClassRender
        render={(screenClass) => {
          const large = ['xxl', 'xl', 'lg'].includes(screenClass);
          return (
            <Box background="light-1" height="100%" width="100%">
              <Container fluid style={{ width: '100%', padding: 0 }}>
                <AppBar direction="row">
                  <Row
                    justify="center"
                    style={{ width: '100%' }}
                    align="center"
                  >
                    <Col lg={3}>
                      <Image
                        width="180px"
                        src="https://mikroklima-landingpages.s3.eu-central-1.amazonaws.com/cocoso-landingpage/grassrootseconomics-logo.png"
                      />
                    </Col>
                    <Col lg={6}>
                      <Box pad="small">
                        <Text size="large" weight="bold" textAlign="center">
                          Community Inclusion Currency (CIC)
                        </Text>
                        <Text size="small">Calculator</Text>
                      </Box>
                    </Col>
                    <Col lg={3}>
                      <Box width="180px" height="10px" />
                    </Col>
                  </Row>
                </AppBar>
                <Main style={{ minHeight: '100vh' }}>
                  <Row style={{ marginLeft: 0, marginRight: 0 }}>
                    <Col lg={playMode ? 2.5 : 12}>
                      <Box
                        width={playMode ? 'small' : 'large'}
                        style={{ margin: '0 auto' }}
                        animation={playMode ? 'slideLeft' : 'fadeIn'}
                        pad={{ bottom: 'xlarge' }}
                      >
                        {playMode ? (
                          <PlayMonitor initials={initials} />
                        ) : (
                          <InitialsUI
                            initials={initials}
                            setInitial={setInitial}
                            large={large}
                          />
                        )}

                        <Box pad={{ vertical: 'medium' }} justify="between">
                          {/*playMode && (
                            <Button label="Reset" onClick={() => resetAll()} />
                          )*/}
                          <Button
                            primary={!playMode}
                            label={playMode ? 'Restart' : 'Start'}
                            onClick={() => changePlayMode()}
                          />
                        </Box>
                      </Box>
                    </Col>

                    {playMode && (
                      <Col lg={9.5}>
                        <Box
                          animation="zoomIn"
                          pad={{ top: 'medium', bottom: 'medium' }}
                        >
                          <Row>
                            <Col md={3}>
                              <Box align="start" pad="xsmall" gap="small">
                                <TextDisplay
                                  inline
                                  label="Buy CIC-committed goods and services"
                                  color="brand"
                                  size="small"
                                />

                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => buyCIC(50)}
                                    color="brand"
                                    icon={<Basket />}
                                    label="Buy 50"
                                    size="small"
                                  />
                                  <Button
                                    onClick={() => buyCIC(250)}
                                    color="brand"
                                    icon={<Tools />}
                                    label="Buy 250"
                                    size="small"
                                  />
                                </Box>

                                <TextDisplay
                                  inline
                                  label="Sell CIC-committed goods and services"
                                  color="brand"
                                  size="small"
                                />

                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => sellCIC(300)}
                                    color="brand"
                                    icon={<Cafeteria />}
                                    label="Sell 300"
                                    size="small"
                                  />
                                  <Button
                                    onClick={() => sellCIC(500)}
                                    color="brand"
                                    icon={<Grow />}
                                    label="Sell 500"
                                    size="small"
                                  />
                                </Box>
                                <NumberDisplay
                                  inline
                                  value={initials.cicBal}
                                  label="My CIC: "
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

                                <Box
                                  pad={{ top: 'medium', bottom: 'large' }}
                                  gap="small"
                                >
                                  <NumberInput
                                    size="small"
                                    width="small"
                                    value={cicExchangeInput.toString()}
                                    decimals={0}
                                    step={100}
                                    min={0}
                                    max={Math.floor(
                                      Math.min(
                                        initials.cicBal,
                                        initials.supply * 0.999
                                      )
                                    )}
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
                                    label="Recieve National Currency: "
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
                                    label="@Rate: "
                                    color="brand"
                                    size="small"
                                  />
                                </Box>
                              </Box>
                            </Col>

                            <Col md={3}>
                              <Box align="start" pad="xsmall" gap="small">
                                <TextDisplay
                                  inline
                                  label="Buy with National Currency"
                                  color="complementary"
                                  size="small"
                                />

                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => buyReserve(100)}
                                    color="complementary"
                                    icon={<Book />}
                                    label="Buy 100"
                                    size="small"
                                  />
                                  <Button
                                    onClick={() => buyReserve(500)}
                                    color="complementary"
                                    icon={<Bike />}
                                    label="Buy 500"
                                    size="small"
                                  />
                                </Box>

                                <TextDisplay
                                  inline
                                  label="Sell with National Currency"
                                  color="complementary"
                                  size="small"
                                />

                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <Button
                                    onClick={() => sellReserve(300)}
                                    color="complementary"
                                    icon={<Cafeteria />}
                                    label="Sell 300"
                                    size="small"
                                  />
                                  <Button
                                    onClick={() => sellReserve(500)}
                                    color="complementary"
                                    icon={<Grow />}
                                    label="Sell 500"
                                    size="small"
                                  />
                                </Box>

                                <NumberDisplay
                                  inline
                                  value={initials.resBal}
                                  label="My National Currency: "
                                  align="start"
                                  color="complementary"
                                  size="small"
                                />
                                <Box
                                  direction="row"
                                  align="center"
                                  gap="xsmall"
                                >
                                  <NumberDisplay
                                    inline
                                    value={initials.resPurchases}
                                    label="Bought: "
                                    color="complementary"
                                    align="smart"
                                    size="small"
                                  />

                                  <NumberDisplay
                                    inline
                                    value={initials.resSales}
                                    label="Sold: "
                                    color="complementary"
                                    align="start"
                                    size="small"
                                  />
                                </Box>
                                <NumberDisplay
                                  inline
                                  value={getRESTradeBalance()}
                                  label="Trade Balance: "
                                  color="complementary"
                                  align="start"
                                  size="small"
                                />

                                <Box
                                  pad={{ top: 'medium', bottom: 'large' }}
                                  gap="small"
                                >
                                  <NumberInput
                                    size="small"
                                    width="small"
                                    value={reserveExchangeInput.toString()}
                                    decimals={0}
                                    step={100}
                                    min={0}
                                    max={Math.floor(initials.resBal)}
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
                                    label="Create CIC : "
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
                                    label="@Rate: "
                                    color="complementary"
                                    size="small"
                                    align="end"
                                  />
                                </Box>
                              </Box>
                            </Col>
                            <Col lg={6}>
                              <ResponsiveContainer height={200}>
                                <ComposedChart
                                  // width="100%"
                                  height={200}
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
                              <ResponsiveContainer height={200}>
                                <ComposedChart
                                  // width="100%"
                                  height={200}
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

                                  <XAxis dataKey="step">
                                    <Label
                                      value="conversions"
                                      offset={0}
                                      position="insideBottomRight"
                                    />
                                  </XAxis>
                                  <Tooltip />
                                  <Legend />
                                  {/*<Bar
                                      name="Reserve Ratio"
                                      stackId="a"                     
                                      fill="complementary"
                                      dataKey="crr"
                                      barSize={15}
                                    />
                                  <Line
                                    name="Exchange Rate"
                                    type="natural"
                                    dataKey="price"
                                    stroke={theme.global.colors.brand}
                                    strokeWidth={2}
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
                                  <Area
                                    name="Current Reserve Ratio"
                                    type="natural"
                                    dataKey="crr"
                                    stroke={theme.global.colors.complementary}
                                    strokeWidth={4}
                                  />
                                  <Line
                                    name="Target Reserve Ratio"
                                    type="natural"
                                    dataKey="trr"
                                    stroke={theme.global.colors.black}
                                    strokeWidth={3}
                                  />
                                </ComposedChart>
                              </ResponsiveContainer>
                            </Col>
                          </Row>
                        </Box>
                      </Col>
                    )}
                  </Row>
                </Main>

                <Footer
                  background="light-2"
                  direction="row"
                  width="100%"
                  justify="center"
                >
                  <Box width="medium" pad="medium">
                    <Paragraph size="small" textAlign="center">
                      <Anchor
                        target="_blank"
                        href="https://gitlab.com/grassrootseconomics/cic-bonding-curve-demo"
                      >
                        <code>Source Code</code>
                      </Anchor>
                    </Paragraph>
                  </Box>
                </Footer>
              </Container>
            </Box>
          );
        }}
      />
    </Grommet>
  );
}

export default App;
