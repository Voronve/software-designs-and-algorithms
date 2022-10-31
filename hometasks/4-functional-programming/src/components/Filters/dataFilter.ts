import { Filter, matchers } from 'src/components';
import { Row } from '../Table/Table';

export const filterData = (data: Row[], filters: Filter[]): Row[] => {
    if(!filters.length) return [];
    let filteredData: Row[] = [];
    for( const filter of filters ) filteredData = filteredData.concat(data.filter( matchers[filter] ));
    
    return filteredData;
}