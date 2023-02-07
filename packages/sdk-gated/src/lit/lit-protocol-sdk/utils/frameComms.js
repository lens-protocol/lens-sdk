// import { unlockLitWithKey } from "./lit";

export const listenForChildFrameMessages = async () => {
  console.log('calling listenForChildFrameMessages from ' + window.origin);
  // listen for requests from child frames
  window.addEventListener(
    'message',
    async (event) => {
      // console.log('onMessage in sdk: ', event)

      let childFrameThatSentMessageIndex = false;
      for (let i = 0; i < frames.length; i++) {
        if (frames[i] === event.source) {
          childFrameThatSentMessageIndex = i;
        }
      }

      if (childFrameThatSentMessageIndex !== false) {
        console.log('onMessage in parent: ', event);

        const { command, params } = event.data;
        if (command === 'LIT_SYN') {
          window.frames[childFrameThatSentMessageIndex].postMessage({ response: 'LIT_ACK' }, '*');
          return;
        }
        //       if (command === 'signAndGetEncryptionKey') {
        //         authSig = await checkAndSignAuthMessage({ chain: params.chain })
        //         if (authSig.errorCode && authSig.errorCode === 'wrong_chain') {
        //           alert('You are connected to the wrong blockchain.  Please switch your metamask to ' + params.chain)
        //         }
        //
        //         // get the merkle proof
        //         const { balanceStorageSlot } = LIT_CHAINS[params.chain]
        //         try {
        //           merkleProof = await getMerkleProof({ tokenAddress: params.tokenAddress, balanceStorageSlot, tokenId: params.tokenId })
        //         } catch (e) {
        //           console.log(e)
        //           alert('Error - could not obtain merkle proof.  Some nodes do not support this operation yet.  Please try another ETH node.')
        //           return
        //         }
        //         const encryptionKey = await window.litNodeClient.getEncryptionKey({
        //           ...params, authSig, merkleProof
        //         })
        //         window.frames[childFrameThatSentMessageIndex].postMessage({ respondingToCommand: command, encryptionKey }, '*')
        //         return
        //       }
        if (event.data.target === 'LitNodeClient') {
          // forward this on to the nodes
          if (command === 'getEncryptionKey') {
            const encryptionKey = await window.litNodeClient.getEncryptionKey({
              ...params,
            });
            window.frames[childFrameThatSentMessageIndex].postMessage(
              { respondingToCommand: command, encryptionKey },
              '*'
            );
          }
        }
      }
    },
    false
  );
};

export const listenForFrameParentMessages = async () => {
  console.log('calling listenForFrameParentMessages from ' + window.origin);
  // listen for requests from child frames
  window.addEventListener(
    'message',
    async (event) => {
      const messageIsFromFrameParent = event.source === window.parent;

      if (messageIsFromFrameParent) {
        console.log('onMessage in frame: ', event);
      }

      // console.log('messageIsFromFrameParent: ', messageIsFromFrameParent)

      if (messageIsFromFrameParent) {
        const { response } = event.data;
        if (response === 'LIT_ACK') {
          window.useLitPostMessageProxy = true;
          if (typeof document !== 'undefined') {
            document.dispatchEvent(new Event('lit-ready'));
          }
        }
        // if (respondingToCommand === "getEncryptionKey") {
        //   const { encryptionKey } = event.data;
        // unlockLitWithKey({ symmetricKey: encryptionKey });
        // }
      }
    },
    false
  );
};

export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
