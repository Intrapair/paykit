import { ApiKeys } from './utils/apiKit';
import Collection from './services/collection.service';
import Transfer from './services/transfer.service';
import Verification from './services/verification.service';
export class Flutterwave {
    private config: ApiKeys = {
        publicKey: '',
        secretKey: '',
    };

    Collection: Collection;
    Transfer: Transfer;
    Verification: Verification;

    constructor(publicKey: string, secretKey: string) {
        this.config.publicKey = publicKey;
        this.config.secretKey = secretKey;
        this.Collection = new Collection(this.config);
        this.Transfer = new Transfer(this.config);
        this.Verification = new Verification(this.config);
    }
}
