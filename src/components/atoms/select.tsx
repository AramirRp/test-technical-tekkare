import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@mui/material';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
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