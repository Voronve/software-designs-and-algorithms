import { Row } from '../../components/Table/Table';

export const searchData = (data: Row[], keyword?: string): Row[] => {
    if(!keyword) return [];
    const lowerKeyWord = keyword.toLowerCase();
    const foundData = data.filter(row =>
        row.name.toLowerCase().includes(lowerKeyWord) ||
        row.username.toLowerCase().includes(lowerKeyWord) ||
        row.country.toLowerCase().includes(lowerKeyWord));

    return foundData;
}