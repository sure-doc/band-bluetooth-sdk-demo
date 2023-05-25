import { TaskExecuter } from '@my/queue';
export declare function requestInQueue<Result>(mac: string, executer: TaskExecuter<Result>): Promise<Result>;
