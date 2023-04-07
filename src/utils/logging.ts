import * as debug from 'debug';

export enum LoggingNamespaces {
    AppGeneralLog = 'vc:general',
}

export function createLogService(logNamespace: LoggingNamespaces) {
    const trace = debug(logNamespace);

    // eslint-disable-next-line no-console
    trace.log = console.log.bind(console);
    return trace;
}
