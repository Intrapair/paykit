import Collection from './services/collection.service';
export default class Flutterwave {
    constructor(publicKey, secretKey) {
        this.config = {
            publicKey: '',
            secretKey: '',
        };
        this.config.publicKey = publicKey;
        this.config.secretKey = secretKey;
        this.Collection = new Collection(this.config);
    }
}
