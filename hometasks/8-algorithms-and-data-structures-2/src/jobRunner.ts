import { Job } from './job.js';

export class JobRunner {
    private readonly jobsArr: Job[]
    private heapSize: number;

    constructor(jobsArr: Job[]) {
        this.jobsArr = jobsArr;
        this.heapSize = jobsArr.length;  
    }

    private left(index: number): number {

        return index * 2;
    }

    private right(index: number): number {

        return index * 2 + 1;
    }

    private parent(index: number) {

        return Math.floor(index / 2);
    }

    private maxHeapify(index: number): void {
        const left = this.left(index);
        const right = this.right(index);
        let largest = index;
        if(left <= this.heapSize && this.jobsArr[left - 1].order > this.jobsArr[index - 1].order) {
            largest = left;
        }

        if(right <= this.heapSize && this.jobsArr[right - 1].order > this.jobsArr[largest - 1].order) {
            largest = right;
        }
        
        if(largest != index) {
            [this.jobsArr[index - 1], this.jobsArr[largest - 1]] = [this.jobsArr[largest - 1], this.jobsArr[index - 1]];
            this.maxHeapify(largest);
        }

    }

    public buildMaxHeap(): void {
        let index = Math.floor(this.jobsArr.length / 2);

        while(index >= 1) {
            this.maxHeapify(index);
            index--;
        }
    }

    public execute(): void {
        while(this.jobsArr.length) {
            const currentJob = this.extractMax();
            currentJob?.run();
        }
    }

    public maximum(): Job {
        return this.jobsArr[0];
    }

    public extractMax(): Job | undefined {
        [this.jobsArr[0], this.jobsArr[this.heapSize - 1]] = [this.jobsArr[this.heapSize - 1], this.jobsArr[0]];
        this.heapSize--;
        const maxJob = this.jobsArr.pop();
        this.maxHeapify(1);

        return maxJob;
    }

    public increaseKey( index: number, key: number ) {
        if(key < this.jobsArr[index - 1].order) {
            throw new Error('New key is smaller than a current key');
        }

        this.jobsArr[index - 1].order = key;
        
        while(index > 1 && this.jobsArr[this.parent(index) - 1].order < this.jobsArr[index - 1].order) {
            [this.jobsArr[index - 1], this.jobsArr[this.parent(index) - 1]] = [this.jobsArr[this.parent(index) - 1], this.jobsArr[index - 1]]
            index = this.parent(index);
        }
    }

    public insert( key: number ) {
        this.heapSize++;
        this.jobsArr.push(new Job(0));
        this.increaseKey(this.heapSize, key);
    }
}