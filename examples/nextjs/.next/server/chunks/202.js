"use strict";
exports.id = 202;
exports.ids = [202];
exports.modules = {

/***/ 1883:
/***/ ((module) => {



var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 3202:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DG": () => (/* binding */ fetchSigner),
/* harmony export */   "VH": () => (/* binding */ getProvider)
/* harmony export */ });
/* unused harmony exports RpcError, ProviderRpcError, AddChainError, ChainDoesNotSupportMulticallError, ChainMismatchError, ChainNotConfiguredError, ConnectorAlreadyConnectedError, ConnectorNotFoundError, ContractMethodDoesNotExistError, ContractMethodNoResultError, ContractMethodRevertedError, ContractResultDecodeError, ProviderChainsNotFound, ResourceUnavailableError, SwitchChainError, SwitchChainNotSupportedError, UserRejectedRequestError, configureChains, debounce, deepEqual, deserialize, minimizeContractInterface, normalizeChainId, parseContractResult, serialize, Connector, InjectedConnector, noopStorage, createStorage, Client, createClient, getClient, connect, disconnect, erc20ABI, erc721ABI, erc4626ABI, units, fetchToken, getContract, prepareWriteContract, getWebSocketProvider, watchProvider, watchWebSocketProvider, multicall, readContract, readContracts, watchContractEvent, fetchBlockNumber, watchBlockNumber, watchMulticall, watchReadContract, watchReadContracts, fetchTransaction, fetchEnsAddress, fetchEnsAvatar, fetchEnsName, fetchEnsResolver, prepareSendTransaction, sendTransaction, fetchFeeData, waitForTransaction, writeContract, fetchBalance, getAccount, getNetwork, signMessage, signTypedData, switchNetwork, watchAccount, watchNetwork, watchSigner */
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1982);
/* harmony import */ var ethers_lib_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8721);
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1883);



// src/client.ts



// src/connectors/injected.ts



// src/utils/configureChains.ts

function configureChains(defaultChains, providers3, {
  minQuorum = 1,
  pollingInterval = 4e3,
  targetQuorum = 1,
  stallTimeout
} = {}) {
  if (!defaultChains.length)
    throw new Error("must have at least one chain");
  if (targetQuorum < minQuorum)
    throw new Error("quorum cannot be lower than minQuorum");
  let chains = [];
  const providers_ = {};
  const webSocketProviders_ = {};
  for (const chain of defaultChains) {
    let configExists = false;
    for (const provider of providers3) {
      const apiConfig = provider(chain);
      if (!apiConfig)
        continue;
      configExists = true;
      if (!chains.some(({ id }) => id === chain.id)) {
        chains = [...chains, apiConfig.chain];
      }
      providers_[chain.id] = [
        ...providers_[chain.id] || [],
        apiConfig.provider
      ];
      if (apiConfig.webSocketProvider) {
        webSocketProviders_[chain.id] = [
          ...webSocketProviders_[chain.id] || [],
          apiConfig.webSocketProvider
        ];
      }
    }
    if (!configExists) {
      throw new Error(
        [
          `Could not find valid provider configuration for chain "${chain.name}".
`,
          "You may need to add `jsonRpcProvider` to `configureChains` with the chain's RPC URLs.",
          "Read more: https://wagmi.sh/react/providers/jsonRpc"
        ].join("\n")
      );
    }
  }
  return {
    chains,
    provider: ({ chainId }) => {
      const activeChain = chains.find((x) => x.id === chainId) ?? defaultChains[0];
      const chainProviders = providers_[activeChain.id];
      if (!chainProviders || !chainProviders[0])
        throw new Error(`No providers configured for chain "${activeChain.id}"`);
      let provider;
      if (chainProviders.length === 1) {
        provider = chainProviders[0]();
      } else {
        provider = fallbackProvider(targetQuorum, minQuorum, chainProviders, {
          stallTimeout
        });
      }
      if (activeChain.id === 42220) {
        provider.formatter.formats.block = {
          ...provider.formatter.formats.block,
          difficulty: () => 0,
          gasLimit: () => 0
        };
      }
      return Object.assign(provider, {
        chains,
        pollingInterval
      });
    },
    webSocketProvider: ({ chainId }) => {
      const activeChain = chains.find((x) => x.id === chainId) ?? defaultChains[0];
      const chainWebSocketProviders = webSocketProviders_[activeChain.id];
      if (!chainWebSocketProviders)
        return void 0;
      const provider = chainWebSocketProviders[0]?.();
      if (provider && activeChain.id === 42220) {
        provider.formatter.formats.block = {
          ...provider.formatter.formats.block,
          difficulty: () => 0,
          gasLimit: () => 0
        };
      }
      return Object.assign(provider || {}, {
        chains
      });
    }
  };
}
function fallbackProvider(targetQuorum, minQuorum, providers_, { stallTimeout }) {
  try {
    return new providers.FallbackProvider(
      providers_.map((chainProvider, index) => {
        const provider = chainProvider();
        return {
          provider,
          priority: provider.priority ?? index,
          stallTimeout: provider.stallTimeout ?? stallTimeout,
          weight: provider.weight
        };
      }),
      targetQuorum
    );
  } catch (error) {
    if (error?.message?.includes(
      "quorum will always fail; larger than total weight"
    )) {
      if (targetQuorum === minQuorum)
        throw error;
      return fallbackProvider(targetQuorum - 1, minQuorum, providers_, {
        stallTimeout
      });
    }
    throw error;
  }
}

// src/utils/assertActiveChain.ts
function assertActiveChain({
  chainId,
  signer
}) {
  const { chain: activeChain, chains } = getNetwork();
  const activeChainId = activeChain?.id;
  if (activeChainId && chainId !== activeChainId) {
    throw new ChainMismatchError({
      activeChain: chains.find((x) => x.id === activeChainId)?.name ?? `Chain ${activeChainId}`,
      targetChain: chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`
    });
  }
  if (signer) {
    const signerChainId = signer.provider?.network?.chainId;
    if (signerChainId && chainId !== signerChainId) {
      const connector = getClient().connector;
      throw new ChainNotConfiguredError({
        chainId,
        connectorId: connector?.id ?? "unknown"
      });
    }
  }
}

// src/utils/debounce.ts
function debounce(fn, waitTime = 0) {
  let timeout;
  return function(...args) {
    if (!waitTime)
      return fn(...args);
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      fn(...args);
    }, waitTime);
  };
}

// src/utils/deepEqual.ts
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor)
      return false;
    let length;
    let i;
    if (Array.isArray(a) && Array.isArray(b)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!deepEqual(a[i], b[i]))
          return false;
      return true;
    }
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key && !deepEqual(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}

// src/utils/deserialize.ts

var findAndReplace = (cacheRef, {
  find,
  replace
}) => {
  if (cacheRef && find(cacheRef)) {
    return replace(cacheRef);
  }
  if (typeof cacheRef !== "object") {
    return cacheRef;
  }
  if (Array.isArray(cacheRef)) {
    return cacheRef.map((item) => findAndReplace(item, { find, replace }));
  }
  if (cacheRef instanceof Object) {
    return Object.entries(cacheRef).reduce(
      (curr, [key, value]) => ({
        ...curr,
        [key]: findAndReplace(value, { find, replace })
      }),
      {}
    );
  }
  return cacheRef;
};
function deserialize(cachedString) {
  const cache = JSON.parse(cachedString);
  const deserializedCacheWithBigNumbers = findAndReplace(cache, {
    find: (data) => data.type === "BigNumber",
    replace: (data) => BigNumber.from(data.hex)
  });
  return deserializedCacheWithBigNumbers;
}

// src/utils/normalizeFunctionName.ts


function normalizeFunctionName({
  contract,
  functionName,
  args = []
}) {
  if (functionName in contract.functions)
    return functionName;
  const argsLength = args?.length ?? 0;
  const overloadFunctions = Object.keys(contract.functions).filter((x) => x.startsWith(`${functionName}(`)).map((x) => ({ name: x, fragment: FunctionFragment.fromString(x) })).filter((x) => argsLength === x.fragment.inputs.length);
  for (const overloadFunction of overloadFunctions) {
    const matched = args.every((arg, index) => {
      const abiParameter = overloadFunction.fragment.inputs[index];
      return isArgOfType(arg, abiParameter);
    });
    if (matched)
      return overloadFunction.name;
  }
  return functionName;
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return isAddress(arg);
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every(
          (component, index) => {
            return isArgOfType(
              Object.values(arg)[index],
              component
            );
          }
        );
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
        abiParameterType
      ))
        return argType === "number" || argType === "bigint" || BigNumber2.isBigNumber(arg);
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every(
          (x) => isArgOfType(x, {
            ...abiParameter,
            type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
          })
        );
      }
      return false;
    }
  }
}

// src/utils/getInjectedName.ts
function getInjectedName(ethereum) {
  if (!ethereum)
    return "Injected";
  const getName = (provider) => {
    if (provider.isAvalanche)
      return "Core Wallet";
    if (provider.isBitKeep)
      return "BitKeep";
    if (provider.isBraveWallet)
      return "Brave Wallet";
    if (provider.isCoinbaseWallet)
      return "Coinbase Wallet";
    if (provider.isExodus)
      return "Exodus";
    if (provider.isFrame)
      return "Frame";
    if (provider.isKuCoinWallet)
      return "KuCoin Wallet";
    if (provider.isMathWallet)
      return "MathWallet";
    if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet)
      return "1inch Wallet";
    if (provider.isOpera)
      return "Opera";
    if (provider.isPhantom)
      return "Phantom";
    if (provider.isPortal)
      return "Ripio Portal";
    if (provider.isTally)
      return "Tally";
    if (provider.isTokenPocket)
      return "TokenPocket";
    if (provider.isTokenary)
      return "Tokenary";
    if (provider.isTrust || provider.isTrustWallet)
      return "Trust Wallet";
    if (provider.isMetaMask)
      return "MetaMask";
  };
  if (ethereum.providers?.length) {
    const nameSet = /* @__PURE__ */ new Set();
    let unknownCount = 1;
    for (const provider of ethereum.providers) {
      let name = getName(provider);
      if (!name) {
        name = `Unknown Wallet #${unknownCount}`;
        unknownCount += 1;
      }
      nameSet.add(name);
    }
    const names = [...nameSet];
    if (names.length)
      return names;
    return names[0] ?? "Injected";
  }
  return getName(ethereum) ?? "Injected";
}

// src/utils/logger.ts
function logWarn(message) {
  getClient()?.config.logger?.warn?.(message);
}

// src/utils/minimizeContractInterface.ts


function minimizeContractInterface(config) {
  try {
    const minimizedAbi = config.abi.filter(
      (x) => x.type === "function" && x.name === config.functionName
    );
    if (minimizedAbi.length === 0)
      throw new Error("Invalid ABI");
    return minimizedAbi;
  } catch (error) {
    const abi = Contract.getInterface(config.abi).format(
      FormatTypes.full
    );
    const minimizedInterface = Array.isArray(abi) ? abi : [abi];
    return minimizedInterface.filter((i) => i.includes(config.functionName));
  }
}

// src/utils/normalizeChainId.ts
function normalizeChainId(chainId) {
  if (typeof chainId === "string")
    return Number.parseInt(
      chainId,
      chainId.trim().substring(0, 2) === "0x" ? 16 : 10
    );
  if (typeof chainId === "bigint")
    return Number(chainId);
  return chainId;
}

// src/utils/parseContractResult.ts

function isPlainArray(value) {
  return Array.isArray(value) && Object.keys(value).length === value.length;
}
function parseContractResult({
  abi,
  data,
  functionName
}) {
  if (data && isPlainArray(data)) {
    const iface = Contract2.getInterface(abi);
    const fragment = iface.getFunction(functionName);
    const isTuple = (fragment.outputs?.length || 0) > 1;
    const data_ = isTuple ? data : [data];
    const encodedResult = iface.encodeFunctionResult(functionName, data_);
    const decodedResult = iface.decodeFunctionResult(
      functionName,
      encodedResult
    );
    return isTuple ? decodedResult : decodedResult[0];
  }
  return data;
}

// src/utils/serialize.ts
function getReferenceKey(keys, cutoff) {
  return keys.slice(0, cutoff).join(".") || ".";
}
function getCutoff(array, value) {
  const { length } = array;
  for (let index = 0; index < length; ++index) {
    if (array[index] === value) {
      return index + 1;
    }
  }
  return 0;
}
function createReplacer(replacer, circularReplacer) {
  const hasReplacer = typeof replacer === "function";
  const hasCircularReplacer = typeof circularReplacer === "function";
  const cache = [];
  const keys = [];
  return function replace(key, value) {
    if (typeof value === "object") {
      if (cache.length) {
        const thisCutoff = getCutoff(cache, this);
        if (thisCutoff === 0) {
          cache[cache.length] = this;
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }
        keys[keys.length] = key;
        const valueCutoff = getCutoff(cache, value);
        if (valueCutoff !== 0) {
          return hasCircularReplacer ? circularReplacer.call(
            this,
            key,
            value,
            getReferenceKey(keys, valueCutoff)
          ) : `[ref=${getReferenceKey(keys, valueCutoff)}]`;
        }
      } else {
        cache[0] = value;
        keys[0] = key;
      }
    }
    return hasReplacer ? replacer.call(this, key, value) : value;
  };
}
function serialize(value, replacer, indent, circularReplacer) {
  return JSON.stringify(
    value,
    createReplacer(replacer, circularReplacer),
    indent ?? void 0
  );
}

// src/connectors/base.ts

var Connector = class extends (/* unused pure expression or super */ null && (EventEmitter)) {
  constructor({
    chains = [mainnet, goerli],
    options
  }) {
    super();
    this.chains = chains;
    this.options = options;
  }
  getBlockExplorerUrls(chain) {
    const { default: blockExplorer, ...blockExplorers } = chain.blockExplorers ?? {};
    if (blockExplorer)
      return [
        blockExplorer.url,
        ...Object.values(blockExplorers).map((x) => x.url)
      ];
  }
  isChainUnsupported(chainId) {
    return !this.chains.some((x) => x.id === chainId);
  }
};

// src/connectors/injected.ts
var _provider, _switchingChains;
var InjectedConnector = class extends (/* unused pure expression or super */ null && (Connector)) {
  constructor({
    chains,
    options: options_
  } = {}) {
    const options = {
      shimDisconnect: true,
      shimChainChangedDisconnect: true,
      getProvider: () => typeof window !== "undefined" ? window.ethereum : void 0,
      ...options_
    };
    super({ chains, options });
    __privateAdd(this, _provider, void 0);
    __privateAdd(this, _switchingChains, void 0);
    this.shimDisconnectKey = "injected.shimDisconnect";
    this.onAccountsChanged = (accounts) => {
      if (accounts.length === 0)
        this.emit("disconnect");
      else
        this.emit("change", {
          account: getAddress(accounts[0])
        });
    };
    this.onChainChanged = (chainId) => {
      const id = normalizeChainId(chainId);
      const unsupported = this.isChainUnsupported(id);
      this.emit("change", { chain: { id, unsupported } });
    };
    this.onDisconnect = () => {
      if (this.options.shimChainChangedDisconnect && __privateGet(this, _switchingChains)) {
        __privateSet(this, _switchingChains, false);
        return;
      }
      this.emit("disconnect");
      if (this.options.shimDisconnect)
        getClient().storage?.removeItem(this.shimDisconnectKey);
    };
    const provider = options.getProvider();
    if (typeof options.name === "string")
      this.name = options.name;
    else if (provider) {
      const detectedName = getInjectedName(provider);
      if (options.name)
        this.name = options.name(detectedName);
      else {
        if (typeof detectedName === "string")
          this.name = detectedName;
        else
          this.name = detectedName[0];
      }
    } else
      this.name = "Injected";
    this.id = "injected";
    this.ready = !!provider;
  }
  async connect({ chainId } = {}) {
    try {
      const provider = await this.getProvider();
      if (!provider)
        throw new ConnectorNotFoundError();
      if (provider.on) {
        provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
        provider.on("disconnect", this.onDisconnect);
      }
      this.emit("message", { type: "connecting" });
      const accounts = await provider.request({
        method: "eth_requestAccounts"
      });
      const account = getAddress(accounts[0]);
      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }
      if (this.options.shimDisconnect)
        getClient().storage?.setItem(this.shimDisconnectKey, true);
      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error);
      if (error.code === -32002)
        throw new ResourceUnavailableError(error);
      throw error;
    }
  }
  async disconnect() {
    const provider = await this.getProvider();
    if (!provider?.removeListener)
      return;
    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect);
    if (this.options.shimDisconnect)
      getClient().storage?.removeItem(this.shimDisconnectKey);
  }
  async getAccount() {
    const provider = await this.getProvider();
    if (!provider)
      throw new ConnectorNotFoundError();
    const accounts = await provider.request({
      method: "eth_accounts"
    });
    return getAddress(accounts[0]);
  }
  async getChainId() {
    const provider = await this.getProvider();
    if (!provider)
      throw new ConnectorNotFoundError();
    return provider.request({ method: "eth_chainId" }).then(normalizeChainId);
  }
  async getProvider() {
    const provider = this.options.getProvider();
    if (provider)
      __privateSet(this, _provider, provider);
    return __privateGet(this, _provider);
  }
  async getSigner({ chainId } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount()
    ]);
    return new providers2.Web3Provider(
      provider,
      chainId
    ).getSigner(account);
  }
  async isAuthorized() {
    try {
      if (this.options.shimDisconnect && !getClient().storage?.getItem(this.shimDisconnectKey))
        return false;
      const provider = await this.getProvider();
      if (!provider)
        throw new ConnectorNotFoundError();
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }
  async switchChain(chainId) {
    if (this.options.shimChainChangedDisconnect)
      __privateSet(this, _switchingChains, true);
    const provider = await this.getProvider();
    if (!provider)
      throw new ConnectorNotFoundError();
    const id = hexValue(chainId);
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: id }]
      });
      return this.chains.find((x) => x.id === chainId) ?? {
        id: chainId,
        name: `Chain ${id}`,
        network: `${id}`,
        nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
        rpcUrls: { default: { http: [""] } }
      };
    } catch (error) {
      const chain = this.chains.find((x) => x.id === chainId);
      if (!chain)
        throw new ChainNotConfiguredError({ chainId, connectorId: this.id });
      if (error.code === 4902 || error?.data?.originalError?.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [
                  chain.rpcUrls.public?.http[0] ?? chain.rpcUrls.default.http[0] ?? ""
                ],
                blockExplorerUrls: this.getBlockExplorerUrls(chain)
              }
            ]
          });
          return chain;
        } catch (addError) {
          if (this.isUserRejectedRequestError(addError))
            throw new UserRejectedRequestError(error);
          throw new AddChainError();
        }
      }
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error);
      throw new SwitchChainError(error);
    }
  }
  async watchAsset({
    address,
    decimals = 18,
    image,
    symbol
  }) {
    const provider = await this.getProvider();
    if (!provider)
      throw new ConnectorNotFoundError();
    return provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address,
          decimals,
          image,
          symbol
        }
      }
    });
  }
  isUserRejectedRequestError(error) {
    return error.code === 4001;
  }
};
_provider = new WeakMap();
_switchingChains = new WeakMap();

// src/storage.ts
var noopStorage = {
  getItem: (_key) => "",
  setItem: (_key, _value) => null,
  removeItem: (_key) => null
};
function createStorage({
  deserialize: deserialize2 = deserialize,
  key: prefix = "wagmi",
  serialize: serialize2 = serialize,
  storage
}) {
  return {
    ...storage,
    getItem: (key, defaultState = null) => {
      const value = storage.getItem(`${prefix}.${key}`);
      try {
        return value ? deserialize2(value) : defaultState;
      } catch (error) {
        console.warn(error);
        return defaultState;
      }
    },
    setItem: (key, value) => {
      if (value === null) {
        storage.removeItem(`${prefix}.${key}`);
      } else {
        try {
          storage.setItem(`${prefix}.${key}`, serialize2(value));
        } catch (err) {
          console.error(err);
        }
      }
    },
    removeItem: (key) => storage.removeItem(`${prefix}.${key}`)
  };
}

// src/client.ts
var storeKey = "store";
var _isAutoConnecting, _lastUsedConnector, _addEffects, addEffects_fn;
var Client = class {
  constructor({
    autoConnect = false,
    connectors = [new InjectedConnector()],
    provider,
    storage = createStorage({
      storage: typeof window !== "undefined" ? window.localStorage : noopStorage
    }),
    logger = {
      warn: console.warn
    },
    webSocketProvider
  }) {
    __privateAdd(this, _addEffects);
    this.providers = /* @__PURE__ */ new Map();
    this.webSocketProviders = /* @__PURE__ */ new Map();
    __privateAdd(this, _isAutoConnecting, void 0);
    __privateAdd(this, _lastUsedConnector, void 0);
    this.config = {
      autoConnect,
      connectors,
      logger,
      provider,
      storage,
      webSocketProvider
    };
    let status = "disconnected";
    let chainId;
    if (autoConnect) {
      try {
        const rawState = storage.getItem(storeKey);
        const data = rawState?.state?.data;
        status = data?.account ? "reconnecting" : "connecting";
        chainId = data?.chain?.id;
      } catch (_error) {
      }
    }
    this.store = create(
      subscribeWithSelector(
        persist(
          () => ({
            connectors: typeof connectors === "function" ? connectors() : connectors,
            provider: this.getProvider({ chainId }),
            status,
            webSocketProvider: this.getWebSocketProvider({ chainId })
          }),
          {
            deserialize: (state) => state,
            name: storeKey,
            getStorage: () => storage,
            partialize: (state) => ({
              ...autoConnect && {
                data: {
                  account: state?.data?.account,
                  chain: state?.data?.chain
                }
              },
              chains: state?.chains
            }),
            serialize: (state) => state,
            version: 2
          }
        )
      )
    );
    this.storage = storage;
    __privateSet(this, _lastUsedConnector, storage?.getItem("wallet"));
    __privateMethod(this, _addEffects, addEffects_fn).call(this);
    if (autoConnect && typeof window !== "undefined")
      setTimeout(async () => await this.autoConnect(), 0);
  }
  get chains() {
    return this.store.getState().chains;
  }
  get connectors() {
    return this.store.getState().connectors;
  }
  get connector() {
    return this.store.getState().connector;
  }
  get data() {
    return this.store.getState().data;
  }
  get error() {
    return this.store.getState().error;
  }
  get lastUsedChainId() {
    return this.data?.chain?.id;
  }
  get provider() {
    return this.store.getState().provider;
  }
  get status() {
    return this.store.getState().status;
  }
  get subscribe() {
    return this.store.subscribe;
  }
  get webSocketProvider() {
    return this.store.getState().webSocketProvider;
  }
  setState(updater) {
    const newState = typeof updater === "function" ? updater(this.store.getState()) : updater;
    this.store.setState(newState, true);
  }
  clearState() {
    this.setState((x) => ({
      ...x,
      chains: void 0,
      connector: void 0,
      data: void 0,
      error: void 0,
      status: "disconnected"
    }));
  }
  async destroy() {
    if (this.connector)
      await this.connector.disconnect?.();
    __privateSet(this, _isAutoConnecting, false);
    this.clearState();
    this.store.destroy();
  }
  async autoConnect() {
    if (__privateGet(this, _isAutoConnecting))
      return;
    __privateSet(this, _isAutoConnecting, true);
    this.setState((x) => ({
      ...x,
      status: x.data?.account ? "reconnecting" : "connecting"
    }));
    const sorted = __privateGet(this, _lastUsedConnector) ? [...this.connectors].sort(
      (x) => x.id === __privateGet(this, _lastUsedConnector) ? -1 : 1
    ) : this.connectors;
    let connected = false;
    for (const connector of sorted) {
      if (!connector.ready || !connector.isAuthorized)
        continue;
      const isAuthorized = await connector.isAuthorized();
      if (!isAuthorized)
        continue;
      const data = await connector.connect();
      this.setState((x) => ({
        ...x,
        connector,
        chains: connector?.chains,
        data,
        status: "connected"
      }));
      connected = true;
      break;
    }
    if (!connected)
      this.setState((x) => ({
        ...x,
        data: void 0,
        status: "disconnected"
      }));
    __privateSet(this, _isAutoConnecting, false);
    return this.data;
  }
  getProvider({ bust, chainId } = {}) {
    let provider_ = this.providers.get(chainId ?? -1);
    if (provider_ && !bust)
      return provider_;
    const { provider } = this.config;
    provider_ = typeof provider === "function" ? provider({ chainId }) : provider;
    this.providers.set(chainId ?? -1, provider_);
    return provider_;
  }
  getWebSocketProvider({
    bust,
    chainId
  } = {}) {
    let webSocketProvider_ = this.webSocketProviders.get(chainId ?? -1);
    if (webSocketProvider_ && !bust)
      return webSocketProvider_;
    const { webSocketProvider } = this.config;
    webSocketProvider_ = typeof webSocketProvider === "function" ? webSocketProvider({ chainId }) : webSocketProvider;
    if (webSocketProvider_)
      this.webSocketProviders.set(chainId ?? -1, webSocketProvider_);
    return webSocketProvider_;
  }
  setLastUsedConnector(lastUsedConnector = null) {
    this.storage?.setItem("wallet", lastUsedConnector);
  }
};
_isAutoConnecting = new WeakMap();
_lastUsedConnector = new WeakMap();
_addEffects = new WeakSet();
addEffects_fn = function() {
  const onChange = (data) => {
    this.setState((x) => ({
      ...x,
      data: { ...x.data, ...data }
    }));
  };
  const onDisconnect = () => {
    this.clearState();
  };
  const onError = (error) => {
    this.setState((x) => ({ ...x, error }));
  };
  this.store.subscribe(
    ({ connector }) => connector,
    (connector, prevConnector) => {
      prevConnector?.off?.("change", onChange);
      prevConnector?.off?.("disconnect", onDisconnect);
      prevConnector?.off?.("error", onError);
      if (!connector)
        return;
      connector.on?.("change", onChange);
      connector.on?.("disconnect", onDisconnect);
      connector.on?.("error", onError);
    }
  );
  const { provider, webSocketProvider } = this.config;
  const subscribeProvider = typeof provider === "function";
  const subscribeWebSocketProvider = typeof webSocketProvider === "function";
  if (subscribeProvider || subscribeWebSocketProvider)
    this.store.subscribe(
      ({ data }) => data?.chain?.id,
      (chainId) => {
        this.setState((x) => ({
          ...x,
          provider: this.getProvider({ bust: true, chainId }),
          webSocketProvider: this.getWebSocketProvider({
            bust: true,
            chainId
          })
        }));
      }
    );
};
var client;
function createClient(config) {
  const client_ = new Client(config);
  client = client_;
  return client_;
}
function getClient() {
  if (!client) {
    throw new Error(
      "No wagmi client found. Ensure you have set up a client: https://wagmi.sh/react/client"
    );
  }
  return client;
}

// src/actions/accounts/connect.ts
async function connect({
  chainId,
  connector
}) {
  const client2 = getClient();
  const activeConnector = client2.connector;
  if (activeConnector && connector.id === activeConnector.id)
    throw new ConnectorAlreadyConnectedError();
  try {
    client2.setState((x) => ({ ...x, status: "connecting" }));
    const data = await connector.connect({ chainId });
    client2.setLastUsedConnector(connector.id);
    client2.setState((x) => ({
      ...x,
      connector,
      chains: connector?.chains,
      data,
      status: "connected"
    }));
    client2.storage.setItem("connected", true);
    return { ...data, connector };
  } catch (err) {
    client2.setState((x) => {
      return {
        ...x,
        status: x.connector ? "connected" : "disconnected"
      };
    });
    throw err;
  }
}

// src/actions/accounts/disconnect.ts
async function disconnect() {
  const client2 = getClient();
  if (client2.connector)
    await client2.connector.disconnect();
  client2.clearState();
  client2.storage.removeItem("connected");
}

// src/actions/accounts/fetchBalance.ts


// src/constants/abis.ts
var erc20ABI = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];
var erc20ABI_bytes32 = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
];
var erc721ABI = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: true,
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        name: "approved",
        type: "bool"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "payable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "getApproved",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "isApprovedForAll",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "operator",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "ownerOf",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "owner",
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "payable",
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "id",
        type: "uint256"
      },
      {
        name: "data",
        type: "bytes"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "setApprovalForAll",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "operator",
        type: "address"
      },
      {
        name: "approved",
        type: "bool"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "tokenByIndex",
    stateMutability: "view",
    inputs: [
      {
        name: "index",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "tokenByIndex",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "index",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "payable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "tokeId",
        type: "uint256"
      }
    ],
    outputs: []
  }
];
var multicallABI = [
  {
    inputs: [
      {
        components: [
          {
            name: "target",
            type: "address"
          },
          {
            name: "allowFailure",
            type: "bool"
          },
          {
            name: "callData",
            type: "bytes"
          }
        ],
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          {
            name: "success",
            type: "bool"
          },
          {
            name: "returnData",
            type: "bytes"
          }
        ],
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
var erc4626ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        name: "receiver",
        type: "address"
      },
      {
        indexed: false,
        name: "assets",
        type: "uint256"
      },
      {
        indexed: false,
        name: "shares",
        type: "uint256"
      }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        name: "receiver",
        type: "address"
      },
      {
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        name: "assets",
        type: "uint256"
      },
      {
        indexed: false,
        name: "shares",
        type: "uint256"
      }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        name: "assetTokenAddress",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "convertToAssets",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "convertToShares",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      }
    ],
    name: "deposit",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "caller",
        type: "address"
      }
    ],
    name: "maxDeposit",
    outputs: [
      {
        name: "maxAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "caller",
        type: "address"
      }
    ],
    name: "maxMint",
    outputs: [
      {
        name: "maxShares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "maxRedeem",
    outputs: [
      {
        name: "maxShares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "maxWithdraw",
    outputs: [
      {
        name: "maxAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      }
    ],
    name: "mint",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "previewDeposit",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "previewMint",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "previewRedeem",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "previewWithdraw",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      },
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "redeem",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [
      {
        name: "totalManagedAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "to",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      },
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "withdraw",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/constants/units.ts
var units = (/* unused pure expression or super */ null && ([
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
]));

// src/actions/contracts/fetchToken.ts

async function fetchToken({
  address,
  chainId,
  formatUnits: units2 = "ether"
}) {
  async function fetchToken_({ abi }) {
    const erc20Config = { address, abi, chainId };
    const [decimals, name, symbol, totalSupply] = await readContracts({
      allowFailure: false,
      contracts: [
        { ...erc20Config, functionName: "decimals" },
        { ...erc20Config, functionName: "name" },
        { ...erc20Config, functionName: "symbol" },
        { ...erc20Config, functionName: "totalSupply" }
      ]
    });
    return {
      address,
      decimals,
      name,
      symbol,
      totalSupply: {
        formatted: formatUnits(totalSupply, units2),
        value: totalSupply
      }
    };
  }
  try {
    return await fetchToken_({ abi: erc20ABI });
  } catch (err) {
    if (err instanceof ContractResultDecodeError) {
      const { name, symbol, ...rest } = await fetchToken_({
        abi: erc20ABI_bytes32
      });
      return {
        name: parseBytes32String(name),
        symbol: parseBytes32String(symbol),
        ...rest
      };
    }
    throw err;
  }
}

// src/actions/contracts/getContract.ts

function getContract({
  address,
  abi,
  signerOrProvider
}) {
  return new EthersContract(
    address,
    abi,
    signerOrProvider
  );
}

// src/actions/contracts/prepareWriteContract.ts
async function prepareWriteContract({
  abi,
  address,
  args,
  chainId,
  functionName,
  overrides,
  signer: signer_
}) {
  const signer = signer_ ?? await fetchSigner({ chainId });
  if (!signer)
    throw new ConnectorNotFoundError();
  if (chainId)
    assertActiveChain({ chainId, signer });
  const contract = getContract({
    address,
    abi,
    signerOrProvider: signer
  });
  const normalizedFunctionName = normalizeFunctionName({
    contract,
    functionName,
    args
  });
  const populateTransactionFn = contract.populateTransaction[normalizedFunctionName];
  if (!populateTransactionFn)
    throw new ContractMethodDoesNotExistError({
      address,
      functionName: normalizedFunctionName
    });
  const params = [...args ?? [], ...overrides ? [overrides] : []];
  const unsignedTransaction = await populateTransactionFn(
    ...params
  );
  const gasLimit = unsignedTransaction.gasLimit || await signer.estimateGas(unsignedTransaction);
  const minimizedAbi = minimizeContractInterface({
    abi,
    functionName
  });
  return {
    abi: minimizedAbi,
    address,
    chainId,
    functionName,
    mode: "prepared",
    request: {
      ...unsignedTransaction,
      gasLimit
    }
  };
}

// src/actions/providers/getProvider.ts
function getProvider({
  chainId
} = {}) {
  const client2 = getClient();
  if (chainId)
    return client2.getProvider({ chainId }) || client2.provider;
  return client2.provider;
}

// src/actions/providers/getWebSocketProvider.ts
function getWebSocketProvider({
  chainId
} = {}) {
  const client2 = getClient();
  if (chainId)
    return client2.getWebSocketProvider({ chainId }) || client2.webSocketProvider;
  return client2.webSocketProvider;
}

// src/actions/providers/watchProvider.ts
function watchProvider(args, callback) {
  const client2 = getClient();
  const handleChange = async () => callback(getProvider(args));
  const unsubscribe = client2.subscribe(({ provider }) => provider, handleChange);
  return unsubscribe;
}

// src/actions/providers/watchWebSocketProvider.ts
function watchWebSocketProvider(args, callback) {
  const client2 = getClient();
  const handleChange = async () => callback(getWebSocketProvider(args));
  const unsubscribe = client2.subscribe(
    ({ webSocketProvider }) => webSocketProvider,
    handleChange
  );
  return unsubscribe;
}

// src/actions/contracts/multicall.ts
async function multicall({
  allowFailure = true,
  chainId,
  contracts,
  overrides
}) {
  const provider = getProvider({ chainId });
  if (!provider.chains)
    throw new ProviderChainsNotFound();
  const chain = provider.chains.find((chain2) => chain2.id === chainId) || provider.chains[0];
  if (!chain)
    throw new ProviderChainsNotFound();
  if (!chain?.contracts?.multicall3)
    throw new ChainDoesNotSupportMulticallError({ chain });
  if (typeof overrides?.blockTag === "number" && overrides?.blockTag < (chain.contracts.multicall3.blockCreated ?? 0))
    throw new ChainDoesNotSupportMulticallError({
      blockNumber: overrides?.blockTag,
      chain
    });
  const multicallContract = getContract({
    address: chain.contracts.multicall3.address,
    abi: multicallABI,
    signerOrProvider: provider
  });
  const calls = contracts.map(
    ({ address, abi, functionName, ...config }) => {
      const { args } = config || {};
      const contract = getContract({ address, abi });
      const params2 = args ?? [];
      const normalizedFunctionName = normalizeFunctionName({
        contract,
        functionName,
        args
      });
      try {
        const contractFunction = contract[normalizedFunctionName];
        if (!contractFunction)
          logWarn(
            `"${normalizedFunctionName}" is not in the interface for contract "${address}"`
          );
        const callData = contract.interface.encodeFunctionData(
          normalizedFunctionName,
          params2
        );
        return {
          target: address,
          allowFailure,
          callData
        };
      } catch (err) {
        if (!allowFailure)
          throw err;
        return {
          target: address,
          allowFailure,
          callData: "0x"
        };
      }
    }
  );
  const params = [...[calls], ...overrides ? [overrides] : []];
  const results = await multicallContract.aggregate3(
    ...params
  );
  return results.map(({ returnData, success }, i) => {
    const { address, abi, args, functionName } = contracts[i];
    const contract = getContract({
      address,
      abi
    });
    const normalizedFunctionName = normalizeFunctionName({
      contract,
      functionName,
      args
    });
    if (!success) {
      let error;
      try {
        contract.interface.decodeFunctionResult(
          normalizedFunctionName,
          returnData
        );
      } catch (err) {
        error = new ContractMethodRevertedError({
          address,
          args,
          chainId: chain.id,
          functionName: normalizedFunctionName,
          errorMessage: err.message
        });
        if (!allowFailure)
          throw error;
        logWarn(error.message);
      }
      return null;
    }
    if (returnData === "0x") {
      const error = new ContractMethodNoResultError({
        address,
        args,
        chainId: chain.id,
        functionName: normalizedFunctionName
      });
      if (!allowFailure)
        throw error;
      logWarn(error.message);
      return null;
    }
    try {
      const result = contract.interface.decodeFunctionResult(
        normalizedFunctionName,
        returnData
      );
      return Array.isArray(result) && result.length === 1 ? result[0] : result;
    } catch (err) {
      const error = new ContractResultDecodeError({
        address,
        args,
        chainId: chain.id,
        functionName: normalizedFunctionName,
        errorMessage: err.message
      });
      if (!allowFailure)
        throw error;
      logWarn(error.message);
      return null;
    }
  });
}

// src/actions/contracts/readContract.ts
async function readContract({
  address,
  args,
  chainId,
  abi,
  functionName,
  overrides
}) {
  const provider = getProvider({ chainId });
  const contract = getContract({
    address,
    abi,
    signerOrProvider: provider
  });
  const normalizedFunctionName = normalizeFunctionName({
    contract,
    functionName,
    args
  });
  const contractFunction = contract[normalizedFunctionName];
  if (!contractFunction)
    throw new ContractMethodDoesNotExistError({
      address,
      functionName: normalizedFunctionName
    });
  const params = [...args ?? [], ...overrides ? [overrides] : []];
  return contractFunction?.(...params);
}

// src/actions/contracts/readContracts.ts
async function readContracts({
  allowFailure = true,
  contracts,
  overrides
}) {
  try {
    const provider = getProvider();
    const contractsByChainId = contracts.reduce((contracts2, contract, index) => {
      const chainId = contract.chainId ?? provider.network.chainId;
      return {
        ...contracts2,
        [chainId]: [...contracts2[chainId] || [], { contract, index }]
      };
    }, {});
    const promises = () => Object.entries(contractsByChainId).map(
      ([chainId, contracts2]) => multicall({
        allowFailure,
        chainId: parseInt(chainId),
        contracts: contracts2.map(({ contract }) => contract),
        overrides
      })
    );
    let multicallResults;
    if (allowFailure) {
      multicallResults = (await Promise.allSettled(promises())).map((result) => {
        if (result.status === "fulfilled")
          return result.value;
        if (result.reason instanceof ChainDoesNotSupportMulticallError) {
          logWarn(result.reason.message);
          throw result.reason;
        }
        return null;
      }).flat();
    } else {
      multicallResults = (await Promise.all(promises())).flat();
    }
    const resultIndexes = Object.values(contractsByChainId).map((contracts2) => contracts2.map(({ index }) => index)).flat();
    return multicallResults.reduce((results, result, index) => {
      if (results)
        results[resultIndexes[index]] = result;
      return results;
    }, []);
  } catch (err) {
    if (err instanceof ContractResultDecodeError)
      throw err;
    if (err instanceof ContractMethodNoResultError)
      throw err;
    if (err instanceof ContractMethodRevertedError)
      throw err;
    const promises = () => contracts.map(
      (contract) => readContract({ ...contract, overrides })
    );
    if (allowFailure)
      return (await Promise.allSettled(promises())).map((result, i) => {
        if (result.status === "fulfilled")
          return result.value;
        const { address, args, chainId, functionName } = contracts[i];
        const error = new ContractMethodRevertedError({
          address,
          functionName,
          chainId: chainId ?? 1,
          args,
          errorMessage: result.reason
        });
        logWarn(error.message);
        return null;
      });
    return await Promise.all(promises());
  }
}

// src/actions/contracts/watchContractEvent.ts

function watchContractEvent({
  address,
  abi,
  chainId,
  eventName,
  once
}, callback) {
  const handler = (...event) => callback(...event);
  let contract;
  const watchEvent = async () => {
    if (contract)
      contract?.off(eventName, handler);
    const signerOrProvider = getWebSocketProvider({ chainId }) || getProvider({ chainId });
    contract = getContract({
      address,
      abi,
      signerOrProvider
    });
    if (once)
      contract.once(eventName, handler);
    else
      contract.on(eventName, handler);
  };
  watchEvent();
  const client2 = getClient();
  const unsubscribe = client2.subscribe(
    ({ provider, webSocketProvider }) => ({
      provider,
      webSocketProvider
    }),
    watchEvent,
    { equalityFn: shallow }
  );
  return () => {
    contract?.off(eventName, handler);
    unsubscribe();
  };
}

// src/actions/network-status/watchBlockNumber.ts


// src/actions/network-status/fetchBlockNumber.ts
async function fetchBlockNumber({
  chainId
} = {}) {
  const provider = getProvider({ chainId });
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
}

// src/actions/network-status/watchBlockNumber.ts
function watchBlockNumber(args, callback) {
  const debouncedCallback = debounce(callback, 1);
  let previousProvider;
  const createListener = (provider) => {
    if (previousProvider) {
      previousProvider?.off("block", debouncedCallback);
    }
    provider.on("block", debouncedCallback);
    previousProvider = provider;
  };
  const provider_ = getWebSocketProvider({ chainId: args.chainId }) ?? getProvider({ chainId: args.chainId });
  if (args.listen)
    createListener(provider_);
  let active = true;
  const client2 = getClient();
  const unsubscribe = client2.subscribe(
    ({ provider, webSocketProvider }) => ({ provider, webSocketProvider }),
    async ({ provider, webSocketProvider }) => {
      const provider_2 = webSocketProvider ?? provider;
      if (args.listen && !args.chainId && provider_2) {
        createListener(provider_2);
      }
      const blockNumber = await fetchBlockNumber({ chainId: args.chainId });
      if (!active)
        return;
      callback(blockNumber);
    },
    {
      equalityFn: shallow2
    }
  );
  return () => {
    active = false;
    unsubscribe();
    provider_?.off("block", debouncedCallback);
    previousProvider?.off("block", debouncedCallback);
  };
}

// src/actions/contracts/watchMulticall.ts
function watchMulticall(config, callback) {
  const client2 = getClient();
  const handleChange = async () => callback(await multicall(config));
  const unwatch = config.listenToBlock ? watchBlockNumber({ listen: true }, handleChange) : void 0;
  const unsubscribe = client2.subscribe(({ provider }) => provider, handleChange);
  return () => {
    unsubscribe();
    unwatch?.();
  };
}

// src/actions/contracts/watchReadContract.ts
function watchReadContract(config, callback) {
  const client2 = getClient();
  const handleChange = async () => callback(await readContract(config));
  const unwatch = config.listenToBlock ? watchBlockNumber({ listen: true }, handleChange) : void 0;
  const unsubscribe = client2.subscribe(({ provider }) => provider, handleChange);
  return () => {
    unsubscribe();
    unwatch?.();
  };
}

// src/actions/contracts/watchReadContracts.ts
function watchReadContracts(config, callback) {
  const client2 = getClient();
  const handleChange = async () => callback(await readContracts(config));
  const unwatch = config.listenToBlock ? watchBlockNumber({ listen: true }, handleChange) : void 0;
  const unsubscribe = client2.subscribe(({ provider }) => provider, handleChange);
  return () => {
    unsubscribe();
    unwatch?.();
  };
}

// src/actions/transactions/fetchTransaction.ts
async function fetchTransaction({
  chainId,
  hash
}) {
  const provider = getProvider({ chainId });
  return provider.getTransaction(hash);
}

// src/actions/transactions/prepareSendTransaction.ts


// src/actions/ens/fetchEnsAddress.ts

async function fetchEnsAddress({
  chainId,
  name
}) {
  const provider = getProvider({ chainId });
  const address = await provider.resolveName(name);
  try {
    return address ? getAddress2(address) : null;
  } catch (_error) {
    return null;
  }
}

// src/actions/ens/fetchEnsAvatar.ts
async function fetchEnsAvatar({
  address,
  chainId
}) {
  const provider = getProvider({ chainId });
  const avatar = await provider.getAvatar(address);
  return avatar;
}

// src/actions/ens/fetchEnsName.ts

async function fetchEnsName({
  address,
  chainId
}) {
  const provider = getProvider({ chainId });
  return provider.lookupAddress(getAddress3(address));
}

// src/actions/ens/fetchEnsResolver.ts
async function fetchEnsResolver({
  chainId,
  name
}) {
  const provider = getProvider({ chainId });
  const resolver = await provider.getResolver(name);
  return resolver;
}

// src/actions/transactions/prepareSendTransaction.ts
async function prepareSendTransaction({
  chainId,
  request,
  signer: signer_
}) {
  const signer = signer_ ?? await fetchSigner({ chainId });
  if (!signer)
    throw new ConnectorNotFoundError();
  if (chainId)
    assertActiveChain({ chainId, signer });
  const [to, gasLimit] = await Promise.all([
    isAddress2(request.to) ? Promise.resolve(request.to) : fetchEnsAddress({ name: request.to }),
    request.gasLimit ? Promise.resolve(request.gasLimit) : signer.estimateGas(request)
  ]);
  if (!to)
    throw new Error("Could not resolve ENS name");
  return {
    ...chainId ? { chainId } : {},
    request: { ...request, gasLimit, to },
    mode: "prepared"
  };
}

// src/actions/transactions/sendTransaction.ts
async function sendTransaction({
  chainId,
  mode,
  request
}) {
  const signer = await fetchSigner();
  if (!signer)
    throw new ConnectorNotFoundError();
  if (mode === "prepared") {
    if (!request.gasLimit)
      throw new Error("`gasLimit` is required");
    if (!request.to)
      throw new Error("`to` is required");
  }
  if (chainId)
    assertActiveChain({ chainId, signer });
  try {
    const uncheckedSigner = signer.connectUnchecked?.();
    const { hash, wait } = await (uncheckedSigner ?? signer).sendTransaction(
      request
    );
    return { hash, wait };
  } catch (error) {
    if (error.code === 4001)
      throw new UserRejectedRequestError(error);
    throw error;
  }
}

// src/actions/transactions/waitForTransaction.ts


// src/actions/network-status/fetchFeeData.ts

async function fetchFeeData({
  chainId,
  formatUnits: units2 = "wei"
} = {}) {
  const provider = getProvider({ chainId });
  const feeData = await provider.getFeeData();
  const formatted = {
    gasPrice: feeData.gasPrice ? formatUnits2(feeData.gasPrice, units2) : null,
    maxFeePerGas: feeData.maxFeePerGas ? formatUnits2(feeData.maxFeePerGas, units2) : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? formatUnits2(feeData.maxPriorityFeePerGas, units2) : null
  };
  return { ...feeData, formatted };
}

// src/actions/transactions/waitForTransaction.ts
async function waitForTransaction({
  chainId,
  confirmations = 1,
  hash,
  onSpeedUp,
  timeout = 0
}) {
  const provider = getProvider({ chainId });
  const [blockNumber, transaction] = await Promise.all([
    fetchBlockNumber(),
    fetchTransaction({ hash })
  ]);
  let replaceable = null;
  if (confirmations !== 0 && transaction?.to) {
    replaceable = {
      data: transaction.data,
      from: transaction.from,
      nonce: transaction.nonce,
      startBlock: blockNumber,
      to: transaction.to,
      value: transaction.value
    };
  }
  try {
    const receipt = await provider._waitForTransaction(
      hash,
      confirmations,
      timeout,
      replaceable
    );
    if (receipt.status === 0) {
      const code = await provider.call(receipt, receipt.blockNumber);
      const reason = toUtf8String(`0x${code.substring(138)}`);
      throw new Error(reason);
    }
    return receipt;
  } catch (err) {
    if (err?.reason === "repriced") {
      onSpeedUp?.(err.replacement);
      return waitForTransaction({
        hash: err.replacement?.hash,
        confirmations,
        timeout
      });
    }
    throw err;
  }
}

// src/actions/contracts/writeContract.ts
async function writeContract({
  address,
  args,
  chainId,
  abi,
  functionName,
  mode,
  overrides,
  request: request_
}) {
  const signer = await fetchSigner();
  if (!signer)
    throw new ConnectorNotFoundError();
  if (chainId)
    assertActiveChain({ chainId, signer });
  if (mode === "prepared") {
    if (!request_)
      throw new Error("`request` is required");
  }
  const request = mode === "recklesslyUnprepared" ? (await prepareWriteContract({
    address,
    args,
    chainId,
    abi,
    functionName,
    overrides
  })).request : request_;
  const transaction = await sendTransaction({
    request,
    mode: "prepared"
  });
  return transaction;
}

// src/actions/accounts/fetchBalance.ts
async function fetchBalance({
  address,
  chainId,
  formatUnits: unit,
  token
}) {
  const client2 = getClient();
  const provider = getProvider({ chainId });
  if (token) {
    const fetchContractBalance = async ({ abi }) => {
      const erc20Config = { abi, address: token, chainId };
      const [value2, decimals, symbol] = await readContracts({
        allowFailure: false,
        contracts: [
          {
            ...erc20Config,
            functionName: "balanceOf",
            args: [address]
          },
          { ...erc20Config, functionName: "decimals" },
          { ...erc20Config, functionName: "symbol" }
        ]
      });
      return {
        decimals,
        formatted: formatUnits3(value2 ?? "0", unit ?? decimals),
        symbol,
        value: value2
      };
    };
    try {
      return await fetchContractBalance({ abi: erc20ABI });
    } catch (err) {
      if (err instanceof ContractResultDecodeError) {
        const { symbol, ...rest } = await fetchContractBalance({
          abi: erc20ABI_bytes32
        });
        return {
          symbol: parseBytes32String2(symbol),
          ...rest
        };
      }
      throw err;
    }
  }
  const chains = [...client2.provider.chains || [], ...client2.chains ?? []];
  const value = await provider.getBalance(address);
  const chain = chains.find((x) => x.id === provider.network.chainId);
  return {
    decimals: chain?.nativeCurrency.decimals ?? 18,
    formatted: formatUnits3(value ?? "0", unit ?? "ether"),
    symbol: chain?.nativeCurrency.symbol ?? "ETH",
    value
  };
}

// src/actions/accounts/fetchSigner.ts
async function fetchSigner({
  chainId
} = {}) {
  const client2 = getClient();
  const signer = await client2.connector?.getSigner?.({ chainId }) || null;
  return signer;
}

// src/actions/accounts/getAccount.ts
function getAccount() {
  const { data, connector, status } = getClient();
  switch (status) {
    case "connected":
      return {
        address: data?.account,
        connector,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
        status
      };
    case "reconnecting":
      return {
        address: data?.account,
        connector,
        isConnected: !!data?.account,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status
      };
    case "connecting":
      return {
        address: void 0,
        connector: void 0,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false,
        status
      };
    case "disconnected":
      return {
        address: void 0,
        connector: void 0,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status
      };
  }
}

// src/actions/accounts/getNetwork.ts
function getNetwork() {
  const client2 = getClient();
  const chainId = client2.data?.chain?.id;
  const activeChains = client2.chains ?? [];
  const activeChain = [...client2.provider.chains || [], ...activeChains].find(
    (x) => x.id === chainId
  ) ?? {
    id: chainId,
    name: `Chain ${chainId}`,
    network: `${chainId}`,
    nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
    rpcUrls: {
      default: { http: [""] }
    }
  };
  return {
    chain: chainId ? {
      ...activeChain,
      ...client2.data?.chain,
      id: chainId
    } : void 0,
    chains: activeChains
  };
}

// src/actions/accounts/signMessage.ts
async function signMessage(args) {
  try {
    const signer = await fetchSigner();
    if (!signer)
      throw new ConnectorNotFoundError();
    return await signer.signMessage(
      args.message
    );
  } catch (error) {
    if (error.code === 4001)
      throw new UserRejectedRequestError(error);
    throw error;
  }
}

// src/actions/accounts/signTypedData.ts
async function signTypedData({
  domain,
  types,
  value
}) {
  const signer = await fetchSigner();
  if (!signer)
    throw new ConnectorNotFoundError();
  const { chainId: chainId_ } = domain;
  const chainId = chainId_ ? normalizeChainId(chainId_) : void 0;
  if (chainId)
    assertActiveChain({ chainId, signer });
  const types_ = Object.entries(types).filter(([key]) => key !== "EIP712Domain").reduce((types2, [key, attributes]) => {
    types2[key] = attributes.filter((attr) => attr.type !== "EIP712Domain");
    return types2;
  }, {});
  return signer._signTypedData(domain, types_, value);
}

// src/actions/accounts/switchNetwork.ts
async function switchNetwork({
  chainId
}) {
  const { connector } = getClient();
  if (!connector)
    throw new ConnectorNotFoundError();
  if (!connector.switchChain)
    throw new SwitchChainNotSupportedError({
      connector
    });
  return connector.switchChain(chainId);
}

// src/actions/accounts/watchAccount.ts

function watchAccount(callback, { selector = (x) => x } = {}) {
  const client2 = getClient();
  const handleChange = () => callback(getAccount());
  const unsubscribe = client2.subscribe(
    ({ data, connector, status }) => selector({
      address: data?.account,
      connector,
      status
    }),
    handleChange,
    {
      equalityFn: shallow3
    }
  );
  return unsubscribe;
}

// src/actions/accounts/watchNetwork.ts

function watchNetwork(callback, { selector = (x) => x } = {}) {
  const client2 = getClient();
  const handleChange = () => callback(getNetwork());
  const unsubscribe = client2.subscribe(
    ({ data, chains }) => selector({ chainId: data?.chain?.id, chains }),
    handleChange,
    {
      equalityFn: shallow4
    }
  );
  return unsubscribe;
}

// src/actions/accounts/watchSigner.ts

function watchSigner({ chainId }, callback) {
  const client2 = getClient();
  const handleChange = async () => {
    const signer = await fetchSigner({ chainId });
    if (!getClient().connector)
      return callback(null);
    return callback(signer);
  };
  const unsubscribe = client2.subscribe(
    ({ data, connector }) => ({
      account: data?.account,
      chainId: data?.chain?.id,
      connector
    }),
    handleChange,
    {
      equalityFn: shallow5
    }
  );
  return unsubscribe;
}

// src/errors.ts
var RpcError = class extends Error {
  constructor(message, options) {
    const { cause, code, data } = options;
    if (!Number.isInteger(code))
      throw new Error('"code" must be an integer.');
    if (!message || typeof message !== "string")
      throw new Error('"message" must be a nonempty string.');
    super(message);
    this.cause = cause;
    this.code = code;
    this.data = data;
  }
};
var ProviderRpcError = class extends (/* unused pure expression or super */ null && (RpcError)) {
  constructor(message, options) {
    const { cause, code, data } = options;
    if (!(Number.isInteger(code) && code >= 1e3 && code <= 4999))
      throw new Error(
        '"code" must be an integer such that: 1000 <= code <= 4999'
      );
    super(message, { cause, code, data });
  }
};
var AddChainError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "AddChainError";
    this.message = "Error adding chain";
  }
};
var ChainDoesNotSupportMulticallError = class extends Error {
  constructor({ blockNumber, chain }) {
    super(
      `Chain "${chain.name}" does not support multicall${blockNumber ? ` on block ${blockNumber}` : ""}.`
    );
    this.name = "ChainDoesNotSupportMulticall";
  }
};
var ChainMismatchError = class extends Error {
  constructor({
    activeChain,
    targetChain
  }) {
    super(
      `Chain mismatch: Expected "${targetChain}", received "${activeChain}".`
    );
    this.name = "ChainMismatchError";
  }
};
var ChainNotConfiguredError = class extends Error {
  constructor({
    chainId,
    connectorId
  }) {
    super(`Chain "${chainId}" not configured for connector "${connectorId}".`);
    this.name = "ChainNotConfigured";
  }
};
var ConnectorAlreadyConnectedError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ConnectorAlreadyConnectedError";
    this.message = "Connector already connected";
  }
};
var ConnectorNotFoundError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ConnectorNotFoundError";
    this.message = "Connector not found";
  }
};
var ContractMethodDoesNotExistError = class extends Error {
  constructor({
    address,
    chainId,
    functionName
  }) {
    const { chains, network } = getProvider();
    const chain = chains?.find(({ id }) => id === (chainId || network.chainId));
    const blockExplorer = chain?.blockExplorers?.default;
    super(
      [
        `Function "${functionName}" on contract "${address}" does not exist.`,
        ...blockExplorer ? [
          "",
          `${blockExplorer?.name}: ${blockExplorer?.url}/address/${address}#readContract`
        ] : []
      ].join("\n")
    );
    this.name = "ContractMethodDoesNotExistError";
  }
};
var ContractMethodNoResultError = class extends Error {
  constructor({
    address,
    args,
    chainId,
    functionName
  }) {
    super(
      [
        "Contract read returned an empty response. This could be due to any of the following:",
        `- The contract does not have the function "${functionName}",`,
        "- The parameters passed to the contract function may be invalid, or",
        "- The address is not a contract.",
        "",
        `Config:`,
        JSON.stringify(
          {
            address,
            abi: "...",
            functionName,
            chainId,
            args
          },
          null,
          2
        )
      ].join("\n")
    );
    this.name = "ContractMethodNoResultError";
  }
};
var ContractMethodRevertedError = class extends Error {
  constructor({
    address,
    args,
    chainId,
    functionName,
    errorMessage
  }) {
    super(
      [
        "Contract method reverted with an error.",
        "",
        `Config:`,
        JSON.stringify(
          {
            address,
            abi: "...",
            functionName,
            chainId,
            args
          },
          null,
          2
        ),
        "",
        `Details: ${errorMessage}`
      ].join("\n")
    );
    this.name = "ContractMethodRevertedError";
  }
};
var ContractResultDecodeError = class extends Error {
  constructor({
    address,
    args,
    chainId,
    functionName,
    errorMessage
  }) {
    super(
      [
        "Failed to decode contract function result.",
        "",
        `Config:`,
        JSON.stringify(
          {
            address,
            abi: "...",
            functionName,
            chainId,
            args
          },
          null,
          2
        ),
        "",
        `Details: ${errorMessage}`
      ].join("\n")
    );
    this.name = "ContractResultDecodeError";
  }
};
var ProviderChainsNotFound = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ProviderChainsNotFound";
    this.message = [
      "No chains were found on the wagmi provider. Some functions that require a chain may not work.",
      "",
      "It is recommended to add a list of chains to the provider in `createClient`.",
      "",
      "Example:",
      "",
      "```",
      "import { getDefaultProvider } from 'ethers'",
      "import { chain, createClient } from 'wagmi'",
      "",
      "createClient({",
      "  provider: Object.assign(getDefaultProvider(), { chains: [chain.mainnet] })",
      "})",
      "```"
    ].join("\n");
  }
};
var ResourceUnavailableError = class extends (/* unused pure expression or super */ null && (RpcError)) {
  constructor(cause) {
    super("Resource unavailable", { cause, code: -32002 });
    this.name = "ResourceUnavailable";
  }
};
var SwitchChainError = class extends (/* unused pure expression or super */ null && (ProviderRpcError)) {
  constructor(cause) {
    super("Error switching chain", { cause, code: 4902 });
    this.name = "SwitchChainError";
  }
};
var SwitchChainNotSupportedError = class extends Error {
  constructor({ connector }) {
    super(`"${connector.name}" does not support programmatic chain switching.`);
    this.name = "SwitchChainNotSupportedError";
  }
};
var UserRejectedRequestError = class extends (/* unused pure expression or super */ null && (ProviderRpcError)) {
  constructor(cause) {
    super("User rejected request", { cause, code: 4001 });
    this.name = "UserRejectedRequestError";
  }
};




/***/ })

};
;