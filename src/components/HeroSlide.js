import React from 'react';
import { Hero, HeroBody, Container, Button, Title, Subtitle } from 'bloomer';

export default function HeroSlide({
  title,
  isColor,
  subtitle,
  children,
  goNext = null,
  ...otherProps
}) {
  return (
    <Hero
      isFullHeight
      isBold
      isColor={isColor}
      isPaddingless={false}
      goNext
      {...otherProps}
    >
      <HeroBody>
        <Container>
          {title && <Title isSize={2}>{title}</Title>}
          {subtitle && <Subtitle isSize={4}> {subtitle}</Subtitle>}

          {children}

          {goNext && (
            <div style={{ paddingTop: 24 }}>
              <Button
                className="is-rounded"
                isPulled="right"
                isOutlined
                onClick={goNext}
              >
                Next
              </Button>
            </div>
          )}
        </Container>
      </HeroBody>
    </Hero>
  );
}
