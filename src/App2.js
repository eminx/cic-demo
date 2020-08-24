import React, { useState, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams,
} from 'react-router-dom';
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
import constate from 'constate';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';

import theme from './config/theme';
import { AppBar, HeroSlide } from './components';
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

import Setup from './phases/setup';
import Hatch from './phases/hatch';
import Trade from './phases/trade';

function useInitials() {
  const [initials, setInitials] = useState(defaultInitials);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  return { initials, setInitial };
}

export const [InitialsProvider, useInitialsContext] = constate(useInitials);

function App() {
  const [initials, setInitials] = useState(defaultInitials);
  const [playMode, setPlayMode] = useState(false);
  const [cicExchangeInput, setCicExchangeInput] = useState(defaultCICAmount);
  const [reserveExchangeInput, setReserveExchangeInput] = useState(
    defaultResAmount
  );
  const [priceSet, setPriceSet] = useState([defaultPriceSetItem]);

  // const setInitial = (initial) => {
  //   setInitials({ ...initials, ...initial });
  // };

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

  const sellCIC = (txAmount) => {
    const { supply, cicBal, cicSales } = initials;
    if (cicBal + txAmount > supply) {
      alert('There is not enough CIC in Circulation');
      return;
    }

    const newcicSales = cicSales + txAmount;
    const newcicBal = cicBal + txAmount;
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
      setReserveExchangeInput(Math.floor(resBal));
    }
  };

  const sellReserve = (txAmount) => {
    const { resBal, resSales } = initials;
    const newresSales = resSales + txAmount;
    const newresBal = resBal + txAmount;
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
    console.log(reserveExchangeInput);
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
    setInitials({
      reserve: newReserve,
      supply: newSupply,
      trr: initials.trr,
      crr: newCRR,
      cicBal: newcicBal,
      resBal: newresBal,
      cicPurchases: initials.cicPurchases,
      cicSales: newcicSales,
      resPurchases: newresPurchases,
      resSales: initials.resSales,
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

    setInitials({
      reserve: newReserve,
      supply: newSupply,
      trr: initials.trr,
      crr: newCRR,
      cicBal: newcicBal,
      resBal: newresBal,
      cicPurchases: newcicPurchases,
      cicSales: initials.cicSales,
      resPurchases: initials.resPurchases,
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

  const slider = useRef(null);
  let location = useLocation();

  return (
    <div style={{ width: '100%' }}>
      <Grommet theme={theme}>
        <InitialsProvider>
          <Switch location={location}>
            <Route path="/setup">
              <Setup />
            </Route>

            <Route path="/setup">
              <Hatch />
            </Route>

            <Route path="/setup">
              <Trade />
            </Route>
          </Switch>
        </InitialsProvider>
      </Grommet>
    </div>
  );

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
                  <Row style={{ marginLeft: 0, marginRight: 0 }}></Row>
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

export function NavLink(props) {
  return (
    <li style={styles.navItem}>
      <Link {...props} style={{ color: 'inherit' }} />
    </li>
  );
}

function HSL() {
  let { h, s, l } = useParams();

  return <HeroSlide isColor=""></HeroSlide>;
}

function RGB() {
  let { r, g, b } = useParams();

  return (
    <div
      style={{
        ...styles.fill,
        ...styles.rgb,
        background: `rgb(${r}, ${g}, ${b})`,
      }}
    >
      rgb({r}, {g}, {b})
    </div>
  );
}

export const styles = {};

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center',
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex',
};

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px',
};

styles.hsl = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px',
};

styles.rgb = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px',
};

export default App;
