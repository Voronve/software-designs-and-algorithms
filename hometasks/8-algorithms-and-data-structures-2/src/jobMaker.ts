import { Job } from './job.js';

export function makeJob(): Job {
    const rundomNumber = Math.floor(Math.random() * 10);
    return new Job(rundomNumber);
}

export function makeJobsArr(quantity: number): Job[] {
    const jobsArr: Job[] = [];

    for(let i = 0; i < quantity; i++) {
        jobsArr.push(makeJob());
    }

    return jobsArr;
}