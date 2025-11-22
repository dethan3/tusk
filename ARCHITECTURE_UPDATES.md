# Critical Architecture Updates - Summary

## Changes Implemented

### 1. ✅ Walrus Integration Verification
**Status**: CONFIRMED COMPLETE
- The `pierce()` method DOES fetch from Walrus Aggregator automatically
- Uses `axios.get(${walrusAggregatorUrl}/blobs/${blobId})`
- No manual data passing required
- Removed from "Next Steps" as it's already implemented

### 2. ✅ Protocol Deployment Model
**Changed from**: User deploys contracts individually
**Changed to**: OtterLabs deploys centrally

#### New Files Created:
- `sdk/src/config.ts` - Centralized configuration with defaults

#### Move Contract Updates:
- Added `RegistryCreated` event in `init()` function
- Event emits registry ID for easy tracking after deployment

#### SDK Updates:
- Constructor parameters now optional with OtterLabs defaults
- `DEFAULT_PACKAGE_ID` and `DEFAULT_REGISTRY_ID` from config
- Graceful fallback: uses env vars if provided, otherwise defaults

#### Usage Patterns:
```typescript
// Simple usage - uses OtterLabs deployment
const tusk = new Tusk('testnet', undefined, undefined, privateKey);

// Custom deployment for testing
const tusk = new Tusk('testnet', customPackageId, customRegistryId, privateKey);
```

### 3. ✅ Demo Location
**Status**: ACKNOWLEDGED
- Demo stays in SDK for debugging phase
- Will be moved to separate example repo for production

## Files Modified

### Smart Contract
- `/contracts/sources/schema_registry.move`
  - Added `RegistryCreated` event struct
  -Updated `init()` to emit event with registry ID

### SDK Core
- `/sdk/src/config.ts` (NEW)
  - Default package and registry placeholders
  - Walrus aggregator URL constant
  
- `/sdk/src/index.ts`
  - Import defaults from config  
  - Make constructor parameters optional with defaults
  - Export config constants

### Configuration
- `/sdk/.env.example`
  - Clarified OtterLabs central deployment
  - Made package/registry IDs optional overrides
  - Private key remains required

### Documentation
- `/sdk/README.md`
  - Updated quick start to show default usage
  - Removed requirement for package/registry IDs

### Demo
- `/sdk/demo.ts`
  - Updated to use optional parameters
  - Falls back to OtterLabs defaults

## Deployment Workflow

### For OtterLabs (Protocol Deployers):
1. Deploy contract: `sui client publish`
2. Find `RegistryCreated` event in transaction
3. Update `sdk/src/config.ts` with real IDs
4. Publish SDK to npm

### For End Users:
1. Install SDK: `pnpm add @otterlabs/tusk`
2. Set only `SUI_PRIVATE_KEY` in .env
3. Use SDK - automatically uses OtterLabs deployment

## Note on TypeScript Errors

The current TypeScript errors related to `@mysten/sui` APIs are due to SDK version compatibility:
- `TransactionBlock` vs `Transaction`  
- `signAndExecuteTransactionBlock` vs `signAndExecuteTransaction`

These need to be resolved by either:
1. Updating to the latest @mysten/sui SDK version, OR
2. Adjusting code to match the currently installed version

This is a separate task from the architectural updates above.
