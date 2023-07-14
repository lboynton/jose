export declare function deriveKey(publicKey: unknown, privateKey: unknown, algorithm: string, keyLength: number, apu?: Uint8Array, apv?: Uint8Array): Promise<Uint8Array>;
export declare function generateEpk(key: unknown): Promise<CryptoKeyPair>;
export declare function ecdhAllowed(key: unknown): boolean;
