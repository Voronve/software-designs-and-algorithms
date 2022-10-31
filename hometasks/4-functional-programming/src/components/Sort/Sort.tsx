import { FC } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import styles from './Sort.module.scss';

export enum SortType{
  asc = 'asc',
  desc = 'desc'
}

interface SortProps {
  value?: SortType;
  onClick?: (sort: SortType) => void;
}

export const Sort: FC<SortProps> = props => {
  const handleChange = (value: SortType) => {
    if(props.value !== value) props.onClick(value);
  };

  return (
    <FormControl className={styles.control} component="fieldset">
      <FormLabel className={styles.label}>Sort by payments</FormLabel>
      <RadioGroup
        className={styles.group}
        aria-label="sorting"
        name="radio-buttons-group"
        onChange={e => handleChange(e.target.value as SortType)}
      >
        <FormControlLabel value={SortType.desc} control={<Radio />} label={SortType.desc} />
        <FormControlLabel value={SortType.asc} control={<Radio />} label={SortType.asc} />
      </RadioGroup>
    </FormControl>
  );
};
