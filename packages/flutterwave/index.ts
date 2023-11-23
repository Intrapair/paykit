import { IApiKeys } from './flutterwave.types';
import Collection from './services/collection.service';
export class Flutterwave {
    private config: IApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    Collection: Collection;

    constructor(publicKey: string, secretKey: string) {
        this.config.publicKey = publicKey;
        this.config.secretKey = secretKey;
        this.Collection = new Collection(this.config);
    }
}
