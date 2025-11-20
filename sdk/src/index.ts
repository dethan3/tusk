/**
 * Tusk SDK - The sharpest data validation layer for Walrus
 * Built by OtterLabs for the Walrus Protocol ecosystem
 * 
 * VISION: Tusk provides two validation workflows:
 * 1. Pre-upload validation (sniff) - Local schema checks before upload [v2]
 * 2. Post-upload verification (pierce) - Verify blobs already on Walrus [MVP]
 * 
 * HACKATHON SCOPE: We are implementing pierce() for post-upload verification
 */

import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { TransactionBlock } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import Ajv, { JSONSchemaType } from 'ajv';
import axios from 'axios';

// Walrus Testnet Aggregator endpoint
const WALRUS_AGGREGATOR_URL = 'https://aggregator.walrus-testnet.walrus.space/v1';

/**
 * Schema definition interface
 */
export interface SchemaDefinition {
    name: string;
    version: string;
    schema: JSONSchemaType<any>;
}

/**
 * Main Tusk class
 * OtterLabs: The sharpest tool for piercing through Walrus blobs
 */
export class Tusk {
    private client: SuiClient;
    private packageId: string;
    private registryId: string;
    private keypair: Ed25519Keypair | null = null;
    private ajv: Ajv;
    private walrusAggregatorUrl: string;

    /**
     * Initialize a new Tusk client
     * 
     * @param network - Sui network to connect to ('testnet', 'mainnet', 'devnet')
     * @param packageId - The deployed Tusk protocol package ID
     * @param registryId - The SchemaRegistry shared object ID
     * @param privateKey - Optional: Sui private key for signing transactions
     * @param walrusUrl - Optional: Custom Walrus aggregator URL
     */
    constructor(
        network: 'testnet' | 'mainnet' | 'devnet',
        packageId: string,
        registryId: string,
        privateKey?: string,
        walrusUrl?: string
    ) {
        // Initialize Sui client
        const rpcUrl = getFullnodeUrl(network);
        this.client = new SuiClient({ url: rpcUrl });
        this.packageId = packageId;
        this.registryId = registryId;
        this.walrusAggregatorUrl = walrusUrl || WALRUS_AGGREGATOR_URL;

        // Initialize keypair if private key provided
        if (privateKey) {
            // Remove 'suiprivkey' prefix if present
            const cleanKey = privateKey.replace('suiprivkey', '');
            this.keypair = Ed25519Keypair.fromSecretKey(
                Buffer.from(cleanKey, 'base64')
            );
        }

        // Initialize AJV for JSON schema validation
        this.ajv = new Ajv({ allErrors: true, verbose: true });

        console.log(`🦦 Tusk initialized on ${network}`);
        console.log(`📦 Package ID: ${packageId}`);
        console.log(`🗄️  Registry ID: ${registryId}`);
        console.log(`🌊 Walrus Aggregator: ${this.walrusAggregatorUrl}`);
    }

    /**
     * Register a new schema on-chain
     * OtterLabs: Creates a publicly shared schema in the registry
     * 
     * @param schemaDef - Schema definition including name, version, and JSON schema
     * @returns Object containing transaction digest and schema object ID
     */
    async registerSchema(schemaDef: SchemaDefinition): Promise<{ digest: string; schemaId: string }> {
        if (!this.keypair) {
            throw new Error('Private key required to register schema');
        }

        console.log(`\n📝 Registering schema: ${schemaDef.name} v${schemaDef.version}`);

        // Build transaction
        const tx = new TransactionBlock();

        // Convert schema to JSON string
        const schemaContent = JSON.stringify(schemaDef.schema);

        tx.moveCall({
            target: `${this.packageId}::registry::register_schema`,
            arguments: [
                tx.object(this.registryId), // Schema registry
                tx.pure(Array.from(Buffer.from(schemaDef.name, 'utf8'))),
                tx.pure(Array.from(Buffer.from(schemaDef.version, 'utf8'))),
                tx.pure(Array.from(Buffer.from(schemaContent, 'utf8'))),
            ],
        });

        // Execute transaction
        const result = await this.client.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            signer: this.keypair,
            options: {
                showEffects: true,
                showObjectChanges: true,
            },
        });

        console.log(`✅ Schema registered! Digest: ${result.digest}`);

        // Find the created/shared schema object
        const createdObjects = result.objectChanges?.filter(
            (change) => change.type === 'created' || change.type === 'mutated'
        );

        let schemaId = '';
        if (createdObjects && createdObjects.length > 0) {
            schemaId = createdObjects[0].objectId || '';
            console.log(`🆔 Schema Object ID: ${schemaId}`);
            console.log(`   (Shared publicly - anyone can validate against this!)`);
        }

        return { digest: result.digest, schemaId };
    }

    /**
     * CORE METHOD: Pierce through a Walrus blob and validate against schema
     * 
     * OtterLabs: This is the MVP core functionality
     * - Fetches blob data from Walrus HTTP Aggregator automatically
     * - Validates against on-chain schema
     * - Creates attestation if validation passes
     * 
     * @param blobId - Walrus blob identifier
     * @param schemaId - On-chain schema object ID to validate against
     * @returns Object with validation result and attestation digest (if created)
     */
    async pierce(
        blobId: string,
        schemaId: string
    ): Promise<{ isValid: boolean; attestationDigest?: string; errors?: any[] }> {
        console.log(`\n🎯 PIERCE: Starting validation workflow`);
        console.log(`   Blob ID: ${blobId}`);
        console.log(`   Schema ID: ${schemaId}`);

        try {
            // Step 1: Fetch schema from Sui
            console.log(`\n📋 Step 1/3: Fetching schema from Sui...`);
            const schemaObj = await this.client.getObject({
                id: schemaId,
                options: { showContent: true },
            });

            if (!schemaObj.data?.content || schemaObj.data.content.dataType !== 'moveObject') {
                throw new Error('Schema not found or invalid');
            }

            const schemaFields = schemaObj.data.content.fields as any;
            const schemaContentStr = schemaFields.schema_content;
            const schemaName = schemaFields.name;

            console.log(`   ✅ Schema found: ${schemaName}`);

            const schemaJson = JSON.parse(schemaContentStr);

            // Step 2: Fetch blob data from Walrus
            console.log(`\n🌊 Step 2/3: Fetching blob from Walrus Aggregator...`);
            const blobUrl = `${this.walrusAggregatorUrl}/blobs/${blobId}`;
            console.log(`   URL: ${blobUrl}`);

            const response = await axios.get(blobUrl, {
                timeout: 30000, // 30 second timeout
                responseType: 'json',
            });

            console.log(`   ✅ Blob fetched successfully`);
            console.log(`   Data size: ${JSON.stringify(response.data).length} bytes`);

            // Step 3: Validate blob data against schema
            console.log(`\n✨ Step 3/3: Validating blob structure...`);
            const validate = this.ajv.compile(schemaJson);
            const isValid = validate(response.data);

            if (isValid) {
                console.log(`   ✅ VALIDATION PASSED!`);
                console.log(`   Blob structure conforms to schema`);

                // Create attestation if we have a keypair
                if (this.keypair) {
                    const attestationDigest = await this.attest(blobId, schemaId, true);
                    return { isValid: true, attestationDigest };
                } else {
                    console.log(`   ⚠️  No private key - skipping attestation`);
                    return { isValid: true };
                }
            } else {
                console.log(`   ❌ VALIDATION FAILED!`);
                console.log(`   Errors:`, JSON.stringify(validate.errors, null, 2));
                return { isValid: false, errors: validate.errors || [] };
            }

        } catch (error: any) {
            console.error(`\n❌ Pierce failed:`, error.message);
            if (axios.isAxiosError(error)) {
                console.error(`   HTTP Error: ${error.response?.status} ${error.response?.statusText}`);
            }
            throw error;
        }
    }

    // TODO: Implement local pre-upload validation (sniff) in v2
    // 
    // async sniff(data: any, schemaId: string): Promise<boolean> {
    //   // This will perform local validation before upload to Walrus
    //   // Use case: Check data structure before spending gas on upload
    //   // Implementation coming in v2
    // }

    /**
     * Create an on-chain attestation for a validated blob
     * OtterLabs: Mints a "Quality Certificate" proving validation
     * 
     * Note: This is typically called automatically by pierce()
     * 
     * @param blobId - Walrus blob identifier
     * @param schemaId - Schema object ID used for validation
     * @param isValid - Validation result
     * @returns Transaction digest
     */
    async attest(
        blobId: string,
        schemaId: string,
        isValid: boolean = true
    ): Promise<string> {
        if (!this.keypair) {
            throw new Error('Private key required to create attestation');
        }

        console.log(`\n🎖️  Creating on-chain attestation...`);

        // Build transaction
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${this.packageId}::registry::create_attestation`,
            arguments: [
                tx.object(schemaId), // Schema object reference
                tx.pure(Array.from(Buffer.from(blobId, 'utf8'))),
                tx.pure(isValid),
            ],
        });

        // Execute transaction
        const result = await this.client.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            signer: this.keypair,
            options: {
                showEffects: true,
                showObjectChanges: true,
            },
        });

        console.log(`   ✅ Attestation created! Digest: ${result.digest}`);

        // Find the created attestation object
        const createdObjects = result.objectChanges?.filter(
            (change) => change.type === 'created'
        );

        if (createdObjects && createdObjects.length > 0) {
            console.log(`   🆔 Attestation Object ID: ${createdObjects[0].objectId}`);
        }

        return result.digest;
    }

    /**
     * Get the Sui client instance
     */
    getClient(): SuiClient {
        return this.client;
    }

    /**
     * Get the package ID
     */
    getPackageId(): string {
        return this.packageId;
    }
}

// Export types
export type { SchemaDefinition };
