import { Image, User, Account, Payment } from '../../types';
import { Row } from '../components/Table/Table';

export const convertUserData = (users: User[] = []) => {
    return (accounts: Account[] = []) => {
        return (images: Image[] = []): Row[] => {

            const accMap: Map<string, {posts: number, payments: Payment[]}> = new Map();
            const imgMap: Map<string, string> = new Map();
            accounts.map( account => accMap.set(
                account.userID,
                {posts: account.posts, payments: account.payments }));
            images.map( image => imgMap.set(image.userID, image.url));

            return users.map( user => {
                const account = accMap.get(user.userID);
                let posts = 0;
                let lastPayments = 0;
                if (account) {
                    posts = account?.posts ?? 0;
                    lastPayments = account.payments.length ? 
                        [...account.payments].sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].totalSum : 0
                }

                return {
                    name: user.name,
                    username: user.username,
                    country: user.country,
                    avatar: imgMap.get(user.userID),
                    posts,
                    lastPayments
                }
            });
        }
    }
}