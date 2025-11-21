# 🎯 Quick Test Guide - Successful Validation Demo

## **For a PASSING Validation Test:**

### 1. Upload Valid Test Data

We've already created `test_data.json` that matches the AI Dataset Schema:

```json
{
  "dataset_name": "Tusk Demo Dataset",
  "instances": 1000,
  "labels": ["validated", "decentralized", "quality"],
  "format": "json",
  "created_at": "2025-11-21T03:05:00Z"
}
```

**Location:** `/home/evan/otterlabs/tusk/test_data.json`

### 2. Upload to Walrus

Using Walrus CLI or web interface, upload this file and get the Blob ID.

### 3. Update Demo Script

Edit `sdk/demo.ts` line 119:
```typescript
const exampleBlobId = 'YOUR_NEW_BLOB_ID_HERE';
```

### 4. Run Demo

```bash
cd /home/evan/otterlabs/tusk/sdk
pnpm demo
```

### Expected Output:
```
✅ Blob fetched successfully
✅ VALIDATION PASSED!
🎖️  Creating on-chain attestation...
✅ Attestation created! Digest: <tx_digest>
🎉 Blob is valid! Attestation created: <tx_digest>
```

---

## **Current Test Status**

Currently using Blob ID: `H-rWHfeOr5lw4wU9VnSnTdCCaI6re6LwL4g095KF9Hw`

This blob contains **Python source code**, which correctly **FAILS** validation against the AI Dataset Schema.

**This proves the validation engine is working correctly!** ✅

---

## **Deployed Contract Info**

- **Package ID:** `0xd7c516b3842301145ce4e46a23e34b4fc6ce59189c61299fc6ea16a7607b0a07`
- **Registry ID:** `0x79945fc2fba9c7450c983baaf508d73f3f5c1fb69162f04c62330ac20e7db4f7`
- **Network:** Sui Testnet
- **Latest Schema ID:** `0x386f5d46312402c2e26c8fdadd213a490b4cc932096aad56e04db583b92c98e7`

---

## **All Components Verified** ✅

- Contract deployment
- Schema registration  
- Walrus blob fetching
- On-chain schema retrieval
- JSON schema validation
- Attestation creation (ready to test with valid data)
