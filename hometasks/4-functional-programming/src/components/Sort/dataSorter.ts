import { SortType } from 'src/components';
import { Row } from '../../components/Table/Table';

export const sortData = (data: Row[], sortType?: SortType): Row[] => {
    if(!sortType) return data;
    let sortedData: Row[];
    switch(sortType) {
        case SortType.asc: 
            sortedData = [...data].sort((a, b) => a.lastPayments - b.lastPayments);
            break;
        case SortType.desc:
            sortedData = [...data].sort((a, b) => b.lastPayments - a.lastPayments);
    }
    
    return sortedData;
}