import { FC } from 'react';
import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Image, User, Account } from '../types';
import { Table, Filters, Filter,  Sort, SortType, Search, Row } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';
import { convertUserData } from './dataConverter/dataConverter';
import { filterData } from './components/Filters/dataFilter';
import { sortData } from './components/Sort/dataSorter';
import { searchData } from './components/Search/dataSearcher';
import styles from './App.module.scss';

export const App: FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [ sort, setSort ] = useState<SortType>(undefined);
  const [ keyword, setKeyword ] = useState<string>('');
  let filteredData: Row[] = [];
  let sortedData: Row[] = [];
  let foundData: Row[] = [];

  useEffect(() => {
    // fetching data from API
    Promise.all([
      getImages(),
      getUsers(),
      getAccounts(),
    ]).then(([images, users, accounts]: [Image[], User[], Account[]]) => {
      
      setData(convertUserData(users)(accounts)(images));
    });
  }, []);

  if( !filters.length && !keyword ) {
    sortedData = sortData(data, sort);
  } else {
    filteredData = filterData(data, filters);
    foundData = searchData(data, keyword);

    foundData.forEach(foundRow => {
      if(!filteredData.some(filterRow => filterRow.username === foundRow.username)) {
        filteredData.push(foundRow);
      }
    })
    sortedData = sortData(filteredData, sort);
  }
  
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters value={filters} onClick={setFilters} />
            <Sort value={sort} onClick={setSort}/>
          </div>
          <Search value={keyword} onClick={setKeyword}/>
        </div>
        <Table rows={sortedData} />
      </div>
    </StyledEngineProvider>
  );
};
