import React from 'react';
import { Box } from 'grommet';
import { NumberDisplay } from 'grommet-controls';

export default function PlayMonitor({ initials }) {
  const { reserve, supply } = initials;
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
}
