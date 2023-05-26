import { Observable } from 'rxjs';
export type TaskExecuter<Result> = () => Promise<Result>;
export interface TaskOptions<Result> {
    executer: TaskExecuter<Result>;
    waitTimeout?: number;
    runTimeout?: number;
}
export declare class Task<Result> {
    waitTimeout?: number;
    runTimeout?: number;
    createdTs: number;
    executer: TaskExecuter<Result>;
    isStart: boolean;
    isWaitTimeout: boolean;
    result$: Observable<Result>;
    private start$;
    constructor({ executer, waitTimeout, runTimeout }: TaskOptions<Result>);
    start(): Observable<Result>;
    private genWaitTimeoutObservable;
    private genExecuteObservable;
    private genWaitTimeoutError;
}
