import { Filter, MATCHERS } from 'src/components';
import { Row } from '../Table/Table';

const isNameMatch = (keyword: string, row:Row) => {
    const search = keyword.toLowerCase();
    const { name, username, country } = row;
 
    return [name, username, country].some(source => source.toLowerCase().includes(search));
 }

export const filterData = (data: Row[], filters: Filter[], keyword: string): Row[] => {
    const matchers = filters.map(filter => MATCHERS[filter]);

    if(keyword) { 
        matchers.push((row: Row) => isNameMatch(keyword, row));
    }

    if(!matchers.length) return data;

    return data.filter(row => matchers.some(isMatch => isMatch(row)));
}