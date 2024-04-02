---
"@lens-protocol/client": minor
---

**feat:** added Frames module

    - `client.frames.createFrameTypedData` - create Frame action typed data to be signed by user wallet
    - `client.frames.signFrameAction` - sign Frame action with Lens Manager if enabled
    - `client.frames.verifyFrameSignature` - verify Frame signature

**feat:** added support for Identity Token

    - `client.authentication.getIdentityToken` - retrieve Identity Token from authenticated LensClient
    - `client.authentication.verify({ identityToken })` - verify the token, notice new argument format
