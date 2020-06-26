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
  const [reserveExchangeInput, setReserveExchangeInput] = useState(
    defaultResAmount
  );
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  const buyCIC = () => {
    const { cicBal, cicPurchases } = initials;
    const newcicPurchases = cicPurchases + cicExchangeInput;
    const newcicBal = cicBal - cicExchangeInput;
    setInitials({
      reserve: initials.reserve,
      supply: initials.supply,
      trr: initials.trr,
      crr: initials.crr,
      cicBal: newcicBal,
      resBal: initials.resBal,
      cicPurchases: newcicPurchases,
      cicSales: initials.cicSales,
      resPurchases: initials.resPurchases,
      resSales: initials.resSales,
    });
    if (cicExchangeInput > newcicBal) {
      setCicExchangeInput(newcicBal);
    }
  };

  const sellCIC = () => {
    const { supply, cicBal, cicSales } = initials;
    if (cicBal + cicExchangeInput > supply) {
      alert('There is not enough Supply');
      return;
    }

    const newcicSales = cicSales + cicExchangeInput;
    const newcicBal = cicBal + cicExchangeInput;
    setInitials({
      reserve: initials.reserve,
      supply: initials.supply,
      trr: initials.trr,
      crr: initials.crr,
      cicBal: newcicBal,
      resBal: initials.resBal,
      cicPurchases: initials.cicPurchases,
      cicSales: newcicSales,
      resPurchases: initials.resPurchases,
      resSales: initials.resSales,
    });
  };

  const buyReserve = () => {
    const { resBal, resPurchases } = initials;
    const newresPurchases = resPurchases + reserveExchangeInput;
    const newresBal = resBal - reserveExchangeInput;
    setInitials({
      reserve: initials.reserve,
      supply: initials.supply,
      trr: initials.trr,
      crr: initials.crr,
      cicBal: initials.cicBal,
      resBal: newresBal,
      cicPurchases: initials.cicPurchases,
      cicSales: initials.cicSales,
      resPurchases: newresPurchases,
      resSales: initials.resSales,
    });
    if (reserveExchangeInput > resBal) {
      setReserveExchangeInput(resBal);
    }
  };

  const sellReserve = () => {
    const { resBal, resSales } = initials;
    const newresSales = resSales + reserveExchangeInput;
    const newresBal = resBal + reserveExchangeInput;
    setInitials({
      reserve: initials.reserve,
      supply: initials.supply,
      trr: initials.trr,
      crr: initials.crr,
      cicBal: initials.cicBal,
      resBal: newresBal,
      cicPurchases: initials.cicPurchases,
      cicSales: initials.cicSales,
      resPurchases: initials.resPurchases,
      resSales: newresSales,
    });
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
    const { reserve, supply, trr, cicBal, resBal } = initials;
    if (reserveExchangeInput < 0) {
      return;
    }
    if (reserveExchangeInput > resBal) {
      alert('There is not sufficient Reserve');
      return;
    }
    const newReserve = reserve + reserveExchangeInput;
    const addedSupply = getNewSupplyCashIn(
      reserve,
      supply,
      trr,
      reserveExchangeInput
    );
    const newSupply = supply + addedSupply;
    const newCRR = newReserve / newSupply;
    const newcicBal = cicBal + addedSupply;
    const newresBal = Math.round(resBal - reserveExchangeInput);
    setInitials({
      reserve: newReserve,
      supply: newSupply,
      trr: initials.trr,
      crr: newCRR,
      cicBal: newcicBal,
      resBal: newresBal,
      cicPurchases: initials.cicPurchases,
      cicSales: initials.cicSales,
      resPurchases: initials.resPurchases,
      resSales: initials.resSales,
    });
    setPriceSet([
      ...priceSet,
      {
        cic: newSupply,
        res: newReserve,
        trr: trr,
        crr: getCRR(newReserve, newSupply).toFixed(2),
        price: getPrice(newReserve, newSupply, trr).toFixed(2),
        step: priceSet.length,
      },
    ]);
    if (reserveExchangeInput > newresBal) {
      setReserveExchangeInput(newresBal);
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
    const { reserve, supply, trr, cicBal, resBal } = initials;
    console.log(cicExchangeInput);
    const addedReserve = getNewReserveCashOut(
      reserve,
      supply,
      trr,
      cicExchangeInput
    );
    const newReserve = reserve + addedReserve;
    const newSupply = supply - cicExchangeInput;
    const newCRR = newReserve / newSupply;
    const newcicBal = Math.round(cicBal - cicExchangeInput);
    const newresBal = resBal - addedReserve;

    setInitials({
      reserve: newReserve,
      supply: newSupply,
      trr: initials.trr,
      crr: newCRR,
      cicBal: newcicBal,
      resBal: newresBal,
      cicPurchases: initials.cicPurchases,
      cicSales: initials.cicSales,
      resPurchases: initials.resPurchases,
      resSales: initials.resSales,
    });
    setPriceSet([
      ...priceSet,
      {
        cic: newSupply,
        res: newReserve,
        trr: trr,
        crr: getCRR(newReserve, newSupply).toFixed(2),

        //trr: trr,
        //crr: getCRR(newReserve, newSupply),
        price: getPrice(newReserve, newSupply, initials.trr).toFixed(2),
        step: priceSet.length,
      },
    ]);
    if (cicExchangeInput > newcicBal) {
      setCicExchangeInput(newcicBal);
    }
    if (cicExchangeInput > newSupply) {
      setCicExchangeInput(newSupply * 0.9999);
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
          crr: getCRR(reserve, supply).toFixed(2),

          //trr: trr,
          //crr: getCRR(reserve, supply),
          price: getPrice(reserve, supply, trr).toFixed(2),
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
    cicPrice: (1 / item.price).toFixed(2),
    priceDifference: (1 / item.price - item.price).toFixed(2),
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
                        <Text size="small">Demo & Play</Text>
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
                                  label="Use CIC"
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
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => buyCIC(250)}
                                    color="brand"
                                    icon={<Tools />}
                                    label="Buy 250"
                                    size="xsmall"
                                  />
                                </Box>

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
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => sellCIC(500)}
                                    color="brand"
                                    icon={<Grow />}
                                    label="Sell 500"
                                    size="xsmall"
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
                                    max={Math.min(
                                      initials.cicBal,
                                      initials.supply * 0.999
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
                                    size="xsmall"
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
                                  label="Use National Currency"
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
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => buyReserve(500)}
                                    color="complementary"
                                    icon={<Bike />}
                                    label="Buy 500"
                                    size="xsmall"
                                  />
                                </Box>
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
                                    size="xsmall"
                                  />
                                  <Button
                                    onClick={() => sellReserve(500)}
                                    color="complementary"
                                    icon={<Grow />}
                                    label="Sell 500"
                                    size="xsmall"
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
                                    max={initials.resBal}
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
                                    size="xsmall"
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
