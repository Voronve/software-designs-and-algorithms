import { useState, FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Row } from '../Table/Table';

import styles from './Filters.module.scss';

export enum Filter{
  zeroPosts = 'Without posts',
  manyPosts = 'More than 100 posts'
}

interface FiltersProps {
  value?: Filter[];
  onClick?: (filters: Filter[]) => void;
}

export const MATCHERS: Record<Filter, (row: Row) =>boolean> = {
  [Filter.zeroPosts]: ( data: Row) => !data.posts,
  [Filter.manyPosts]: ( data: Row) => data.posts > 100
}



export const Filters: FC<FiltersProps> = props => {
  const onChange = (filter: Filter) => {
    let updatedFilters: Filter[];

    if (props.value.includes(filter)) {
      updatedFilters = props.value.filter(activeFilter => activeFilter !== filter);
    } else {
      updatedFilters = [...props.value, filter];
    }
    props.onClick(updatedFilters);
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {Object.keys(matchers).map( (filter: Filter) => (
          <li
            value={filter}
            key={filter}
            onClick={() => onChange(filter)}
          >
            <Checkbox
              checked={props.value.includes(filter)}
              value={filter}
              size="small"
              color="primary"
              onChange={() => onChange(filter)}
            />{' '}
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
};
