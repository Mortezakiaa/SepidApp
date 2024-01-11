import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
// utils
import cssStyles from '@utils/cssStyles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ color: theme.palette.grey[900] }),
  zIndex: 9,
  minWidth: 200,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

// ----------------------------------------------------------------------

type propTypes = {
  data: { city: string }[];
  selectedCity: string;
  handleChange: (city: string) => void;
};

function ControlPanel({ data, selectedCity, handleChange }: propTypes) {
  return (
    <RootStyle>
      {data.map((value) => (
        <RadioGroup key={value.city} value={selectedCity} onChange={(event) => handleChange(event, value)}>
          <FormControlLabel
            value={value.city}
            label={value.city}
            control={<Radio size="small" />}
            sx={{ color: 'common.white' }}
          />
        </RadioGroup>
      ))}
    </RootStyle>
  );
}

export default memo(ControlPanel);
