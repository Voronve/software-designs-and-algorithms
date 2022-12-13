import { JobRunner } from './jobRunner.js';
import { makeJobsArr } from './jobMaker.js';

const jobArr = makeJobsArr(10);

const jobRunner = new JobRunner(jobArr);

jobRunner.buildMaxHeap();
jobRunner.increaseKey(9, 10);
const maxJobCopy = jobRunner.maximum();

console.log('This is copied max job:');
maxJobCopy?.run();
console.log('----------------');
const maxJob = jobRunner.extractMax();
console.log('This is max job:');
maxJob?.run();
console.log('----------------');
jobRunner.insert(20);
jobRunner.execute();