export class Job {
    public order: number;

    constructor(order: number) {
        this.order = order;
    }

    public run = () => {
        console.log(`This is a job with order ${this.order}`);
    }
}
