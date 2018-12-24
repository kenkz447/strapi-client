import EventEmitter from 'eventemitter3';

export const FETCH_START = 'FETCH_START_EVENT';
export const FETCH_SUCCESS = 'FETCH_SUCESS_EVENT';
export const FETCH_FAIL = 'FETCH_FAIL_EVENT';

export const eventEmitter = new EventEmitter();