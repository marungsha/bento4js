interface BentoOptions {
    aesKey: string | null;
    singleFile: boolean;
    outputPath: string;
    noIframe: boolean;
}
interface BentoCompleteCallback {
    (code: number, path: string): void;
}
declare class Bento4 {
    static isModule: boolean;
    static transcode(files: string[] | undefined, options: BentoOptions | undefined, onComplete: BentoCompleteCallback, onError?: (error: Error) => void): Promise<void>;
    static getEncryptionKey(key: string, cb?: (_: string | null) => void): void;
    static runEncode(files: any[], options: BentoOptions, onComplete?: BentoCompleteCallback, onError?: (error: any) => void): void;
    static removeIframe(options: BentoOptions): void;
}
export default Bento4;
//# sourceMappingURL=Bento.d.ts.map