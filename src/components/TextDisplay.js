import React from 'react';
import { Box, Text } from 'grommet';

export default function TextDisplay({
  align = 'end',
  color = 'dark-1',
  label,
  size = 'xxlarge',
  alignLabelRight,
  inline,
  ...otherProps
}) {
  return (
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
}
