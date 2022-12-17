import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class Inventory {
    private items: Item[] = [];

    public addItem(Item: Item): void {
        this.items.push(Item);
    }

    public sort(): void;
    public sort(comparator: ItemComparator): void;
    public sort(comparator?: ItemComparator): void {
        const compare = comparator 
            ? comparator.compare
            : (a: Item, b: Item) => a.compareTo(b);

        this.items.sort(compare);
    }

    public toString(): string {
        return this.items.join(', ');
    }
}