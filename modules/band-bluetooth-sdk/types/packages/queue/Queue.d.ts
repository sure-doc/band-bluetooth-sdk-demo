import { TaskExecuter, TaskOptions } from './Task';
export interface QueueConstructorParameters {
    concurrent: number;
    waitTimeout?: number;
    runTimeout?: number;
}
export declare class Queue {
    concurrent: number;
    waitTimeout?: number;
    runTimeout?: number;
    private task$;
    private subscription;
    constructor({ concurrent, waitTimeout, runTimeout }: QueueConstructorParameters);
    runTask<Result>(executer: TaskExecuter<Result>, options?: Omit<TaskOptions<Result>, 'executer'>): Promise<Result>;
    destroy(): void;
}
