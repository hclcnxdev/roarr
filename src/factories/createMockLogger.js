// @flow

import type {
  LoggerType,
  MessageContextType,
  MessageEventHandlerType,
  TranslateMessageFunctionType,
} from '../types';
import {
  logLevels,
} from '../constants';

const createMockLogger = (onMessage: MessageEventHandlerType, parentContext?: MessageContextType): LoggerType => {
  // eslint-disable-next-line id-length, unicorn/prevent-abbreviations, no-unused-vars
  const log = (a, b, c, d, e, f, g, h, i, k) => {
    //
  };

  // eslint-disable-next-line no-unused-vars
  log.child = (context: TranslateMessageFunctionType | MessageContextType): LoggerType => {
    return createMockLogger(onMessage, parentContext);
  };

  log.getContext = (): MessageContextType => {
    return {};
  };

  for (const logLevel of Object.keys(logLevels)) {
    // eslint-disable-next-line id-length, unicorn/prevent-abbreviations
    log[logLevel] = (a, b, c, d, e, f, g, h, i, k) => {
      return log.child({
        logLevel: logLevels[logLevel],
      })(a, b, c, d, e, f, g, h, i, k);
    };
  }

  // @see https://github.com/facebook/flow/issues/6705
  // $FlowFixMe
  return log;
};

export default createMockLogger;
