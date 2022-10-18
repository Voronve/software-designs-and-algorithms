import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class Inventory {
    private Items: Item[] = [];

    public addItem(Item: Item): void {
        this.Items.push(Item);
    }

    public sort(): void;
    public sort(comparator: ItemComparator): void;
    public sort(comparator?: ItemComparator): void {
        if(comparator) {
            this.Items.sort(comparator.compare);
        } else {
            this.Items.sort((first, second) => first.compareTo(second));
        }  
    }

    public toString(): string {
        return this.Items.join(', ');
    }
}