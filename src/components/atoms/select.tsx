import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@mui/material';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel>{label}</InputLabel>
    <MuiSelect
      value={value}
      label={label}
      onChange={(e) => onChange(e.target.value as string)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      ))}
    </MuiSelect>
  </FormControl>
);

// Make sure to export the Select component as default
export default Select;