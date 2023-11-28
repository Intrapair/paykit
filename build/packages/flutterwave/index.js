import Collection from './services/collection.service';
import Transfer from './services/transfer.service';
export class Flutterwave {
    constructor(publicKey, secretKey) {
        this.config = {
            publicKey: '',
            secretKey: '',
        };
        this.config.publicKey = publicKey;
        this.config.secretKey = secretKey;
        this.Collection = new Collection(this.config);
        this.Transfer = new Transfer(this.config);
    }
}
