import React from 'react';
import { Box } from 'grommet';
import { NumberDisplay } from 'grommet-controls';
import InitialField from './InitialField';

export default function InitialsUI({ initials, setInitial, large }) {
  const { reserve, supply, trr, corr, commitments } = initials;

  return (
    <Box size="large">
      <InitialField
        name="commitments"
        label="Commitments in goods or services to be sold for CIC valued in national currency"
        value={commitments}
        onChange={(value) =>
          setInitial({
            commitments: value,
            comBal: setInitComBal(value),
            supply: Math.min(Math.round(reserve * (1 / trr)), value * corr),
            cicBal: setInitCICBal(
              Math.min(Math.round(reserve * (1 / trr)), value * corr)
            ),
          })
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
          setInitial({
            reserve: value,
            resBal: setInitResBal(value),
            supply: Math.min(Math.round(value * (1 / trr)), commitments * corr),
            cicBal: setInitCICBal(
              Math.min(Math.round(value * (1 / trr)), commitments * corr)
            ),
          })
        }
        step={100}
        min={0}
        max={1000000}
        large={large}
      />
      <Box
        direction="row"
        align="center"
        justify="center"
        gap="medium"
        pad="medium"
      >
        <NumberDisplay
          value={supply}
          label="Supply of CIC tokens Created: min(collateral/TRR,commitments)"
          color="dark-1"
          align="start"
        />
      </Box>
      <Box
        direction="row"
        align="center"
        justify="center"
        gap="medium"
        pad="medium"
      >
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
          onChange={(value) =>
            setInitial({
              trr: value,
              supply: Math.min(
                Math.round(reserve * (1 / value)),
                commitments * corr
              ),
              cicBal: setInitCICBal(
                Math.min(Math.round(reserve * (1 / value)), commitments * corr)
              ),
            })
          }
          step={0.05}
          min={0.01}
          max={1.1}
          decimals={2}
          large={large}
        />
      </Box>
    </Box>
  );
}
