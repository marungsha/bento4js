export default Bento4;
declare class Bento4 {
    static isModule: boolean;
    static transcode(files?: any[], options?: {
        aesKey: null;
        noIframe: boolean;
        singleFile: boolean;
        outputPath: string;
    }, onComplete?: () => void, onError?: () => void): Promise<void>;
    static getEncryptionKey(key: any, cb?: () => void): void;
    static runEncode(files: any, options: any, onComplete: any, onError: any): void;
    static removeIframe(options: any): void;
}
//# sourceMappingURL=BackupBento.d.ts.map