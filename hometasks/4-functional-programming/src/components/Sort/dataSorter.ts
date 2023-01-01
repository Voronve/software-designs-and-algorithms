import { SortType } from 'src/components';
import { Row } from '../../components/Table/Table';

const SORTERS = {
    asc: (a: Row, b: Row) => a.lastPayments - b.lastPayments,
    desc: (a: Row, b: Row) => b.lastPayments - a.lastPayments
}

export const sortData = (data: Row[], sortType?: SortType): Row[] => {
    const sorter = SORTERS[sortType];

    return [...data].sort(sorter);
}