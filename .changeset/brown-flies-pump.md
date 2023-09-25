---
"@lens-protocol/client": patch
---

- renamed `profile.createOnchainSetProfileMetadataTypedData` to `profile.createSetProfileMetadataTypedData`
- removed duplicated method `profile.changeProfileManagers`, use `profile.createChangeProfileManagersTypedData` instead
- renamed `profile.createUnblockProfileTypedData` to `profile.createUnblockProfilesTypedData`
