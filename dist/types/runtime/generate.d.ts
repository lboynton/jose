import type { GenerateKeyPairOptions } from '../key/generate_key_pair';
import type { GenerateSecretOptions } from '../key/generate_secret';
export declare function generateSecret(alg: string, options?: GenerateSecretOptions): Promise<Uint8Array | CryptoKey>;
export declare function generateKeyPair(alg: string, options?: GenerateKeyPairOptions): Promise<{
    publicKey: CryptoKey;
    privateKey: CryptoKey;
}>;
