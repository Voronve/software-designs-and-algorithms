import { Row } from '../../components/Table/Table';

export const searchData = (data: Row[], keyword?: string): Row[] => {
    if(!keyword) return [];
    const lowerKeyWord = keyword.toLowerCase();

    const foundData = data.filter(({name, username, country}) => {

        return [name, username, country].some(current => current.toLowerCase().includes(lowerKeyWord));
    });

    return foundData;
}