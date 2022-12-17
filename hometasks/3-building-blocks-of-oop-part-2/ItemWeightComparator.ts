import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class ItemWeightComparator implements ItemComparator {
    public compare(first: Item, second: Item) {
        const difference = first.getWeight - second.getWeight;
        return difference || first.compareTo(second);
    }
}
