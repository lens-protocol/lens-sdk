(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9973:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var example_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3480);
/* harmony import */ var example_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(example_shared__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lens_protocol_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4245);
/* harmony import */ var _lens_protocol_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6747);
/* harmony import */ var _lens_protocol_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3683);
/* harmony import */ var _lens_protocol_react_web__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2943);
/* harmony import */ var _lens_protocol_wagmi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1662);
/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8998);
/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7697);
/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8577);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_2__, wagmi_chains__WEBPACK_IMPORTED_MODULE_3__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_4__]);
([wagmi__WEBPACK_IMPORTED_MODULE_2__, wagmi_chains__WEBPACK_IMPORTED_MODULE_3__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const { provider , webSocketProvider  } = (0,wagmi__WEBPACK_IMPORTED_MODULE_2__.configureChains)([
    wagmi_chains__WEBPACK_IMPORTED_MODULE_3__.polygon,
    wagmi_chains__WEBPACK_IMPORTED_MODULE_3__.optimism
], [
    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_4__.publicProvider)()
]);
const client = (0,wagmi__WEBPACK_IMPORTED_MODULE_2__.createClient)({
    autoConnect: true,
    provider,
    webSocketProvider
});
const lensConfig = {
    bindings: (0,_lens_protocol_wagmi__WEBPACK_IMPORTED_MODULE_5__/* .bindings */ .R)(),
    environment: _lens_protocol_react__WEBPACK_IMPORTED_MODULE_6__/* .staging */ .o,
    sources: [
        _lens_protocol_react__WEBPACK_IMPORTED_MODULE_7__/* .sources.lenster */ .Y.lenster,
        _lens_protocol_react__WEBPACK_IMPORTED_MODULE_7__/* .sources.orb */ .Y.orb,
        "any-other-app-id"
    ],
    storage: (0,_lens_protocol_react_web__WEBPACK_IMPORTED_MODULE_8__/* .localStorage */ .X)()
};
function App({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(wagmi__WEBPACK_IMPORTED_MODULE_2__.WagmiConfig, {
        client: client,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_lens_protocol_react__WEBPACK_IMPORTED_MODULE_9__/* .LensProvider */ .y, {
            config: lensConfig,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3480:
/***/ (() => {



/***/ }),

/***/ 1982:
/***/ ((module) => {

"use strict";
module.exports = require("ethers");

/***/ }),

/***/ 8721:
/***/ ((module) => {

"use strict";
module.exports = require("ethers/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 8998:
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ 7697:
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ }),

/***/ 8577:
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/providers/public");;

/***/ }),

/***/ 3683:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "y": () => (/* binding */ LensProvider)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ../../packages/shared-kernel/dist/esm/ts-helpers/invariant.js
var invariant = __webpack_require__(1604);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ../../packages/domain/dist/esm/use-cases/lifecycle/Bootstrap.js + 1 modules
var Bootstrap = __webpack_require__(9149);
// EXTERNAL MODULE: ../../packages/react/dist/esm/wallet/adapters/ActiveWalletPresenter.js
var ActiveWalletPresenter = __webpack_require__(9924);
// EXTERNAL MODULE: ../../packages/react/dist/esm/lifecycle/adapters/ApplicationPresenter.js
var ApplicationPresenter = __webpack_require__(7646);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/lifecycle/adapters/useBootstrapController.js




function useBootstrapController({ activeWallet, activeProfile, credentialsFactory, credentialsGateway, logoutPresenter, transactionQueue, }) {
    return (0,external_react_.useCallback)(() => {
        const activeWalletPresenter = new ActiveWalletPresenter/* ActiveWalletPresenter */.xt();
        const applicationPresenter = new ApplicationPresenter/* ApplicationPresenter */.q3();
        const bootstrap = new Bootstrap/* Bootstrap */.z(activeWallet, credentialsGateway, credentialsFactory, activeWalletPresenter, applicationPresenter, logoutPresenter, activeProfile, transactionQueue);
        void bootstrap.start();
    }, [
        activeWallet,
        activeProfile,
        credentialsFactory,
        credentialsGateway,
        logoutPresenter,
        transactionQueue,
    ]);
}

// EXTERNAL MODULE: ../../packages/react/dist/esm/shared.js + 64 modules
var shared = __webpack_require__(6861);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/LensProvider.js





// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() { }
function LensProvider({ children, ...props }) {
    const initialProps = (0,external_react_.useRef)(props).current;
    const [sharedDependencies] = (0,external_react_.useState)(() => (0,shared/* createSharedDependencies */.Bb)(props.config, {
        onLogout: props.onLogout ?? noop,
        onError: props.onError ?? noop,
    }));
    (0,external_react_.useEffect)(() => {
        (0,invariant/* invariant */.k)(initialProps.config === props.config, 'LensProvider: config cannot be changed');
        (0,invariant/* invariant */.k)(initialProps.onLogout === props.onLogout, 'LensProvider: onLogout cannot be changed');
        (0,invariant/* invariant */.k)(initialProps.onError === props.onError, 'LensProvider: onError cannot be changed');
    }, [initialProps, props]);
    const start = useBootstrapController(sharedDependencies);
    (0,external_react_.useEffect)(() => {
        start();
    }, [start]);
    return (jsx_runtime_.jsx(shared/* SharedDependenciesProvider */._J, { dependencies: sharedDependencies, children: children }));
}


/***/ }),

/***/ 4245:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "o": () => (/* binding */ staging)
});

// UNUSED EXPORTS: production

// EXTERNAL MODULE: ../../packages/shared-kernel/dist/esm/crypto/ChainType.js
var ChainType = __webpack_require__(3151);
// EXTERNAL MODULE: ../../packages/shared-kernel/dist/esm/crypto/Asset.js
var Asset = __webpack_require__(7530);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/chains.js

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3',
    blockExplorer: 'https://etherscan.io/',
    nativeCurrency: (0,Asset/* ether */.Xx)(),
};
const goerli = {
    chainId: 5,
    name: 'Goerli',
    rpcUrl: 'https://goerli.infura.io/v3',
    blockExplorer: 'https://goerli.etherscan.io/',
    nativeCurrency: (0,Asset/* ether */.Xx)(),
};
const polygon = {
    chainId: 137,
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com/',
    blockExplorer: 'https://polygonscan.com/',
    nativeCurrency: (0,Asset/* matic */.B$)(),
};
const mumbai = {
    chainId: 80001,
    name: 'Polygon Testnet Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
    blockExplorer: 'https://mumbai.polygonscan.com/',
    nativeCurrency: (0,Asset/* matic */.B$)(),
};

;// CONCATENATED MODULE: ../../packages/react/dist/esm/environments.js


const production = {
    backend: 'https://api.lens.dev',
    chains: {
        [ChainType/* ChainType.ETHEREUM */.J.ETHEREUM]: mainnet,
        [ChainType/* ChainType.POLYGON */.J.POLYGON]: polygon,
    },
    timings: {
        pollingPeriod: 3000,
        maxIndexingWaitTime: 120000,
        maxMiningWaitTime: 60000,
    },
};
const staging = {
    backend: 'https://api-mumbai.lens.dev',
    chains: {
        [ChainType/* ChainType.ETHEREUM */.J.ETHEREUM]: goerli,
        [ChainType/* ChainType.POLYGON */.J.POLYGON]: mumbai,
    },
    timings: {
        pollingPeriod: 3000,
        maxIndexingWaitTime: 240000,
        maxMiningWaitTime: 120000,
    },
};


/***/ }),

/***/ 6747:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ sources)
/* harmony export */ });
const sources = {
    lenster: 'lenster',
    orb: 'orb',
};


/***/ }),

/***/ 2943:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ localStorage)
/* harmony export */ });
class LocalStorageProvider {
    subscribers = new Map();
    getItem(key) {
        return window.localStorage.getItem(key);
    }
    setItem(key, value) {
        window.localStorage.setItem(key, value);
    }
    removeItem(key) {
        window.localStorage.removeItem(key);
    }
    subscribe(key, subscriber) {
        if (this.subscribers.has(key)) {
            this.subscribers.get(key)?.push(subscriber);
        }
        else {
            this.subscribers.set(key, [subscriber]);
        }
        if (this.subscribers.size === 1) {
            this.listenToStorageEvent();
        }
        return {
            unsubscribe: () => {
                const subscribers = this.subscribers.get(key) ?? [];
                const index = subscribers.indexOf(subscriber);
                if (index > -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    this.subscribers.delete(key);
                }
                if (this.subscribers.size === 0) {
                    this.stopListeningToStorageEvent();
                }
            },
        };
    }
    onStorageEvent = (event) => {
        if (event.storageArea !== window.localStorage) {
            return;
        }
        if (event.key && this.subscribers.has(event.key)) {
            const subscribers = this.subscribers.get(event.key) ?? [];
            subscribers.forEach((subscriber) => subscriber(event.newValue, event.oldValue));
        }
    };
    listenToStorageEvent() {
        window.addEventListener('storage', this.onStorageEvent);
    }
    stopListeningToStorageEvent() {
        window.removeEventListener('storage', this.onStorageEvent);
    }
}
function localStorage() {
    return new LocalStorageProvider();
}


/***/ }),

/***/ 1662:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "R": () => (/* binding */ bindings)
});

// EXTERNAL MODULE: ../../packages/shared-kernel/dist/esm/ts-helpers/invariant.js
var invariant = __webpack_require__(1604);
// EXTERNAL MODULE: external "ethers"
var external_ethers_ = __webpack_require__(1982);
;// CONCATENATED MODULE: ../../packages/react/dist/esm/utils.js


function isRequiredSigner(signer) {
    return '_signTypedData' in signer && signer.provider instanceof external_ethers_.providers.JsonRpcProvider;
}
function assertRequiredSigner(signer) {
    (0,invariant/* invariant */.k)(isRequiredSigner(signer), 'The provided signer is not supported. Make sure the Signer implements TypedDataSigner and is connected to a JsonRpcProvider.');
}
const DEFAULT_PAGINATED_QUERY_LIMIT = 10;

// EXTERNAL MODULE: ../../node_modules/.pnpm/@wagmi+core@0.8.2_6s3hhsgcetktvjvubhzqo5q72u/node_modules/@wagmi/core/dist/chunk-63RNYADG.js
var chunk_63RNYADG = __webpack_require__(3202);
;// CONCATENATED MODULE: ../../packages/wagmi/dist/esm/index.js



function bindings() {
    return {
        getProvider: async ({ chainId }) => (0,chunk_63RNYADG/* getProvider */.VH)({ chainId }),
        getSigner: async ({ chainId }) => {
            const signer = await (0,chunk_63RNYADG/* fetchSigner */.DG)({ chainId });
            (0,invariant/* invariant */.k)(signer, 'Cannot get signer, is the wallet connected?');
            assertRequiredSigner(signer);
            return signer;
        },
    };
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [530,202,626], () => (__webpack_exec__(9973)));
module.exports = __webpack_exports__;

})();