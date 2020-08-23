import React from 'react';
import { Box, FormField, RangeInput } from 'grommet';
import { NumberInput } from 'grommet-controls';

export default function InitialField({
  name,
  value,
  label,
  onChange,
  large,
  ...otherProps
}) {
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
}
