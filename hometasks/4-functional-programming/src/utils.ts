import { Account, Payment, UserConnection } from "types";
import { Row, SortType, Filter } from "./components";
import { filterData } from "./components/Filters/dataFilter";
import { searchData } from "./components/Search/dataSearcher";
import { sortData } from "./components/Sort/dataSorter";

export const getDisplayData = (
    data: Row[],
    sort: SortType,
    filters: Filter[],
    keyword: string): Row[] => {

    let dataToSort = data;
    if(filters.length || keyword) {
        const dataToSort = filterData(data, filters, keyword);
        const foundData = searchData(data, keyword);

        foundData.forEach(foundRow => {
            if(!dataToSort.some(filterRow => filterRow.username === foundRow.username)) {
                dataToSort.push(foundRow);
            }
        })
    }

    return sortData(dataToSort, sort);
}

export const compareDates = (a: Payment, b: Payment): number => new Date(b.date).getTime() - new Date(a.date).getTime();

export const getLatestPayments = (account?: Account): number => {
    if(!account?.payments?.length) return 0;

   const sortedPayments = [...account.payments].sort(compareDates);
   return sortedPayments[0].totalSum;
}

export const groupByUserID = <T extends UserConnection>(input: T[]) => {
    return input.reduce((acc, current) => ({ ...acc, [current.userID]: current }), {} as Record<string, T>);
}