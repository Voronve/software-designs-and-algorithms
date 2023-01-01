import { Image, User, Account, Payment } from '../../types';
import { Row } from '../components/Table/Table';
import { getLatestPayments, groupByUserID } from '../utils';

export const convertUserData = (users: User[] = []) => {
    return (accounts: Account[] = []) => {
        return (images: Image[] = []): Row[] => {

            const userImages = groupByUserID(images);
            const userAccounts = groupByUserID(accounts);

            return users.map( user => {
                const { name, username, country, userID } = user;
                const avatar = userImages[userID].url;

                const account = userAccounts[userID];
                let posts = 0;
                let lastPayments = 0;
                posts = account?.posts ?? 0;
                lastPayments = getLatestPayments(account);
                

                return {
                    name: name,
                    username,
                    country,
                    avatar,
                    posts,
                    lastPayments
                }
            });
        }
    }
}