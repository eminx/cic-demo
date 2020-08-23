import React from 'react';
import { Box, Text } from 'grommet';

export default function NumberDisplay({
  align = 'end',
  color = 'dark-1',
  label,
  size = 'xxlarge',
  value,
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
      <Text size={size} color="dark-2">
        <code>{value.toFixed(2)}</code>
      </Text>
    </Box>
  );
}
