export default function subtleDsa(alg: string, algorithm: KeyAlgorithm | EcKeyAlgorithm): {
    hash: string;
    name: string;
    saltLength?: undefined;
    namedCurve?: undefined;
} | {
    hash: string;
    name: string;
    saltLength: number;
    namedCurve?: undefined;
} | {
    hash: string;
    name: string;
    namedCurve: string;
    saltLength?: undefined;
} | {
    name: string;
    hash?: undefined;
    saltLength?: undefined;
    namedCurve?: undefined;
};
