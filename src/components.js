import React from 'react';
import { Box, Text, FormField, RangeInput } from 'grommet';
import { NumberInput } from 'grommet-controls';
import { setInitCICBal, setInitResBal, setInitComBal, getPrice, getCRR } from './config';

const AppBar = (props) => (
  <Box
    tag="header"
    align="center"
    justify="between"
    background="light-2"
    pad={{ left: 'small', right: 'small' }}
    style={{ zIndex: '1', textAlign: 'center' }}
    {...props}
  />
);

const InitialsUI = ({ initials, setInitial, large }) => {
    const { reserve, supply, trr, corr, commitments} = initials;

  return (
    <Box size="large">
      <InitialField
        name="commitments"
        label="Commitments in goods or services to be sold for CIC valued in national currency"
        value={commitments}
        onChange={(value) =>
		  setInitial({ commitments: value, comBal: setInitComBal(value), supply: Math.min(Math.round(reserve*(1/trr)),value*corr), cicBal: setInitCICBal(Math.min(Math.round(reserve*(1/trr)),value*corr)) })
        }
        step={100}
        min={0}
        max={1000000}
        large={large}
      />

      <InitialField
        name="reserve"
        label="Collateral contributed valued in national currency"
        value={reserve}
        onChange={(value) =>
		  setInitial({ reserve: value, resBal: setInitResBal(value), supply: Math.min(Math.round(value*(1/trr)),commitments*corr), cicBal: setInitCICBal(Math.min(Math.round(value*(1/trr)),commitments*corr))  })
        }
        step={100}
        min={0}
        max={1000000}
        large={large}
	  />
      <Box direction="row" align="center" justify="center" gap="medium" pad="medium">
        <NumberDisplay
          value={supply}
          label="Supply of CIC tokens Created: min(collateral/TRR,commitments)"
          color="dark-1"
          align="start"
          />
	  </Box>
	  <Box direction="row" align="center" justify="center" gap="medium" pad="medium">
	  <NumberDisplay
          value={getCRR(reserve, supply)}
          label="Collateral to CIC Ratio"
          color="dark-1"
          align="start"
          />

        <NumberDisplay
          value={getPrice(reserve, supply, trr)}
          label="Starting CIC -> Collateral Exchange Rate: P=Collateral/(TRR*Supply)"
          color="dark-1"
          align="start"
          />
	  </Box>
	  {/*
	  <InitialField
        name="supply"
        label="Create CIC tokens"
        value={supply}
        onChange={(value) =>
		  setInitial({ supply: value, cicBal: setInitCICBal(value)})
        }
        step={100}
        min={0}
      max={Math.min(Math.round(reserve*(1/trr)),commitments)}
        large={large}
      />
	   */}
          <Box direction="row" justify="center" gap="medium" pad="small">
	  {/*
	  <InitialField
       name="corr"
        label="Required Commitment to CIC Ratio"
        value={corr}
      onChange={(value) => setInitial({ corr: value, supply: Math.min(Math.round(reserve*(1/trr)),commitments*value), cicBal: setInitCICBal(Math.min(Math.round(reserve*(1/trr)),commitments*value))  })}
      onInput={() => null}
        step={0.05}
        min={0.01}
        max={2.1}
        decimals={2}
        large={large}
      />
	   */}
	  <InitialField
        name="trr"
      label="Target Collateral to CIC Ratio (TRR)"
        value={trr}
      onChange={(value) => setInitial({ trr: value ,supply: Math.min(Math.round(reserve*(1/value)),commitments*corr), cicBal: setInitCICBal(Math.min(Math.round(reserve*(1/value)),commitments*corr))})}
        step={0.05}
        min={0.01}
        max={1.1}
        decimals={2}
        large={large}
	  />


      </Box>


    </Box>
  );
};

const PlayMonitor = ({ initials }) => {
    const { reserve, supply} = initials;
  return (
    <Box size="small" gap="medium" pad="medium">
      <NumberDisplay
        value={reserve}
        label="National Currency Reserve"
        color="complementary"
        align="start"
      />

      <NumberDisplay
        value={supply}
        label="Total CIC Supply"
        color="brand"
        align="start"
      />
      {/*

      <NumberDisplay
        value={getCRR(reserve, supply)}
        label="Current Reserve Ratio"
        color="complementary"
        align="start"
      />

      <NumberDisplay
        value={trr}
        label="Target Reserve Ratio"
        color="dark-3"
        align="start"
      />
     */}
    </Box>
  );
};

const InitialField = ({
  name,
  value,
  label,
  onChange,
  large,
  ...otherProps
}) => {
  return (
    <FormField name={name} label={label} margin={{ bottom: 'medium' }}>
      <Box direction="row" align="center">
        <Box basis="100%" margin={{ right: 'small' }}>
          <NumberInput
            size="large"
            value={value.toString()}
            decimals={0}
            onChange={({ target: { value } }) => onChange(Number(value))}
            {...otherProps}
            onInput={() => null}
          />
        </Box>
        {large && (
          <Box basis="100%">
            <RangeInput
              value={value}
              onChange={({ target: { value } }) => onChange(Number(value))}
              {...otherProps}
            />
          </Box>
        )}
      </Box>
    </FormField>
  );
};

const NumberDisplay = ({
  align = 'end',
  color = 'dark-1',
  label,
  size = 'xxlarge',
  value,
  alignLabelRight,
  inline,
  ...otherProps
}) => (
  <Box direction={inline ? 'row' : 'column'} {...otherProps}>
    {label && (
      <Text
        size="small"
        color={color}
        style={{
          textAlign: alignLabelRight ? 'right' : 'left',
          paddingRight: 4,
        }}
      >
        {label}{' '}
      </Text>
    )}
    <Text size={size} color="dark-2">
      <code>{value.toFixed(2)}</code>
    </Text>
  </Box>
);

const TextDisplay = ({
  align = 'end',
  color = 'dark-1',
  label,
  size = 'xxlarge',
  alignLabelRight,
  inline,
  ...otherProps
}) => (
  <Box direction={inline ? 'row' : 'column'} {...otherProps}>
    {label && (
      <Text
        size="small"
        color={color}
        style={{
          textAlign: alignLabelRight ? 'right' : 'left',
          paddingRight: 4,
        }}
      >
        {label}{' '}
      </Text>
    )}
  </Box>
);

export {
  AppBar,
  InitialField,
  InitialsUI,
  PlayMonitor,
  NumberDisplay,
  TextDisplay,
};
