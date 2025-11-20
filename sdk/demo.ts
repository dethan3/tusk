/**
 * OtterLabs Internal Demo
 * Tusk - The sharpest data validation layer for Walrus
 * 
 * DEMONSTRATION OF PIERCE WORKFLOW:
 * 1. Register a schema on-chain (shared publicly)
 * 2. Pierce a Walrus blob (fetch from HTTP, validate, attest)
 * 
 * This showcases the MVP: Post-upload verification of Walrus blobs
 */

import { Tusk, SchemaDefinition } from './src/index';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Main demo function
 * OtterLabs: Demonstrates the complete pierce() workflow
 */
async function main() {
    console.log('🦦 ========================================');
    console.log('   OtterLabs Tusk Protocol Demo');
    console.log('   "The sharpest data validation for Walrus"');
    console.log('========================================\n');

    // ========== Step 1: Initialize Tusk Client ==========
    console.log('📌 Step 1: Initializing Tusk Client...');

    const network = (process.env.SUI_NETWORK as 'testnet' | 'mainnet' | 'devnet') || 'testnet';
    const packageId = process.env.TUSK_PACKAGE_ID || '0x0';
    const registryId = process.env.TUSK_REGISTRY_ID || '0x0';
    const privateKey = process.env.SUI_PRIVATE_KEY;

    const tusk = new Tusk(network, packageId, registryId, privateKey);

    // ========== Step 2: Define AI Dataset Schema ==========
    console.log('\n📌 Step 2: Defining AI Dataset Schema...');

    // OtterLabs: We're defining a schema for AI training datasets
    // This ensures all datasets stored in Walrus follow a consistent structure
    const aiDatasetSchema: SchemaDefinition = {
        name: 'AI Dataset Schema',
        version: '1.0',
        schema: {
            type: 'object',
            properties: {
                dataset_name: {
                    type: 'string',
                    description: 'Name of the AI dataset'
                },
                instances: {
                    type: 'number',
                    description: 'Number of training instances',
                    minimum: 1
                },
                labels: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Classification labels'
                },
                format: {
                    type: 'string',
                    enum: ['json', 'csv', 'parquet'],
                    description: 'Data format'
                },
                created_at: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Dataset creation timestamp'
                }
            },
            required: ['dataset_name', 'instances', 'labels'],
            additionalProperties: false
        }
    };

    console.log(`   Schema Name: ${aiDatasetSchema.name}`);
    console.log(`   Version: ${aiDatasetSchema.version}`);
    console.log(`   Required fields: dataset_name, instances, labels`);

    // ========== Step 3: Register Schema (if private key available) ==========
    let schemaObjectId = '';

    if (privateKey) {
        try {
            console.log('\n📌 Step 3: Registering Schema on Sui Testnet...');
            const result = await tusk.registerSchema(aiDatasetSchema);
            console.log(`   Transaction successful!`);
            schemaObjectId = result.schemaId;

        } catch (error: any) {
            console.error('   ⚠️  Error registering schema:', error.message);
            console.log('   Continuing with demo...');
        }
    } else {
        console.log('\n📌 Step 3: Skipping Schema Registration (no private key)');
        console.log('   💡 Set SUI_PRIVATE_KEY in .env to enable on-chain operations');
    }

    // ========== Step 4: Pierce a Walrus Blob ==========
    console.log('\n📌 Step 4: PIERCE - Validate Walrus Blob...\n');
    console.log('─────────────────────────────────────────');

    // OtterLabs: In a real scenario, you would:
    // 1. Have already uploaded data to Walrus and received a blob ID
    // 2. Use the schema ID from your registration
    // 3. Call tusk.pierce() which will:
    //    - Fetch the blob from Walrus Aggregator
    //    - Validate against the on-chain schema
    //    - Create an attestation if validation passes

    const exampleBlobId = 'YOUR_WALRUS_BLOB_ID_HERE';
    const exampleSchemaId = schemaObjectId || 'YOUR_SCHEMA_OBJECT_ID_HERE';

    console.log('   📝 To test with real data:');
    console.log('   1. Upload your JSON data to Walrus Testnet');
    console.log('   2. Get the blob ID from the upload response');
    console.log('   3. Use your schema object ID from Step 3');
    console.log('   4. Call: await tusk.pierce(blobId, schemaId)');
    console.log('');
    console.log('   Example:');
    console.log(`   const result = await tusk.pierce('${exampleBlobId}', '${exampleSchemaId}');`);
    console.log('');
    console.log('   The SDK will automatically:');
    console.log('   ✅ Fetch blob from Walrus Aggregator HTTP API');
    console.log('   ✅ Validate structure against on-chain schema');
    console.log('   ✅ Create attestation if validation passes');
    console.log('');

    // Uncomment this when you have a real Walrus blob:
    // try {
    //   const result = await tusk.pierce(exampleBlobId, exampleSchemaId);
    //   if (result.isValid) {
    //     console.log('🎉 Blob is valid! Attestation created:', result.attestationDigest);
    //   } else {
    //     console.log('❌ Blob validation failed:', result.errors);
    //   }
    // } catch (error) {
    //   console.error('Pierce failed:', error);
    // }

    // ========== Summary ==========
    console.log('\n🦦 ========================================');
    console.log('   Demo Complete!');
    console.log('========================================');
    console.log('\n📝 What we demonstrated:');
    console.log('   ✅ Initialized Tusk SDK with Walrus integration');
    console.log('   ✅ Defined a data schema for AI datasets');
    if (schemaObjectId) {
        console.log(`   ✅ Registered schema on-chain (ID: ${schemaObjectId.substring(0, 20)}...)`);
        console.log('   ✅ Schema is now publicly available for validation!');
    }
    console.log('');
    console.log('🎯 The Pierce Workflow:');
    console.log('   1. Upload data to Walrus → get blob ID');
    console.log('   2. Call tusk.pierce(blobId, schemaId)');
    console.log('   3. SDK fetches from Walrus HTTP API automatically');
    console.log('   4. SDK validates against on-chain schema');
    console.log('   5. SDK creates attestation on Sui');
    console.log('');
    console.log('🔮 Coming in v2: sniff() for pre-upload validation');
    console.log('');
    console.log('📚 Learn more:');
    console.log('   • Walrus Docs: https://docs.walrus.xyz');
    console.log('   • Sui Docs: https://docs.sui.io');
    console.log('   • Tusk README: ../README.md');
    console.log('');
}

// Run the demo
main().catch((error) => {
    console.error('❌ Demo failed:', error);
    process.exit(1);
});
