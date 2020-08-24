import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Box, Image } from 'grommet';
import {
  Hero,
  HeroBody,
  HeroHeader,
  HeroFooter,
  Container,
  Button,
  Title,
  Subtitle,
  Columns,
  Column,
  Tabs,
  Tab,
  TabLink,
  TabList,
  Nav,
  NavItem,
  NavLeft,
  NavRight,
  NavCenter,
  Icon,
} from 'bloomer';

export default function HeroSlide({
  item,
  children,
  goNext = null,
  goPrev = null,
  navmenu,
  content,
  ...otherProps
}) {
  let location = useLocation();
  let history = useHistory();

  if (!item) {
    return null;
  }

  const LeftContent = item && item.leftContent;
  const Content = item && item.content;

  return (
    <Hero
      isColor={'light'}
      isFullHeight
      isBold
      isPaddingless={false}
      {...otherProps}
    >
      <HeroHeader>
        <Box direction="row" pad="small">
          {/* <Image
            width="180px"
            src="https://mikroklima-landingpages.s3.eu-central-1.amazonaws.com/cocoso-landingpage/grassrootseconomics-logo.png"
          /> */}
        </Box>
      </HeroHeader>
      <HeroBody
        style={{
          alignItems: 'stretch',
        }}
      >
        <Container style={{ alignItems: 'stretch' }}>
          <Box justify="between" width="100%" height="100%">
            <Box></Box>
            <Columns isCentered>
              <Column isSize={{ mobile: 12, default: 6 }}>
                <Box width="medium">
                  {item.title && (
                    <Title isSize={2} isSpaced>
                      {item.title}
                    </Title>
                  )}
                  {item.subtitle && (
                    <Subtitle isSize={5} isSpaced>
                      {' '}
                      {item.subtitle}
                    </Subtitle>
                  )}
                  {LeftContent && <LeftContent />}
                </Box>
              </Column>
              <Column isSize={{ mobile: 12, default: 6 }}>
                <Box>{Content && <Content />}</Box>
              </Column>
            </Columns>
            <Box direction="row" justify="between">
              <Box>
                <Link to={goPrev}>
                  <Button isSize="medium">Previous</Button>
                </Link>
              </Box>

              <Box>
                <Link to={goNext}>
                  <Button isSize="medium">Next</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeroBody>

      <HeroFooter>
        <Tabs isBoxed isFullWidth>
          <Container>
            <TabList>
              {navmenu.map((item) => (
                <Tab
                  key={item.path}
                  isActive={item.path === location.pathname}
                  onClick={() => history.push(item.path)}
                >
                  <TabLink>{item.title}</TabLink>
                </Tab>
              ))}
            </TabList>
          </Container>
        </Tabs>
      </HeroFooter>
    </Hero>
  );
}
