import React from 'react';
import { Box } from 'grommet';

export default function AppBar(props) {
  return (
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
}
