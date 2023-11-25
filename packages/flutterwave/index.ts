import { IApiKeys } from './flutterwave.types';
import Collection from './services/collection.service';
import Transfer from './services/transfer.service';
export class Flutterwave {
    private config: IApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    Collection: Collection;
    Transfer: Transfer;

    constructor(publicKey: string, secretKey: string) {
        this.config.publicKey = publicKey;
        this.config.secretKey = secretKey;
        this.Collection = new Collection(this.config);
        this.Transfer = new Transfer(this.config);
    }
}
