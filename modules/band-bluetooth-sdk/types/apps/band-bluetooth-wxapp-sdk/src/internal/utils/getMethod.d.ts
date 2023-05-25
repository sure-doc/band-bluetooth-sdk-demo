export declare function getMethod<Obj, Method extends Function>(getObj: () => Obj, getMethod: (obj: Obj) => Method): Method;
