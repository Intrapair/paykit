# Paykit
Paykit is a comprehensive module that provides wallet management and payment gateway interface on top of Flutterwave and paystack. It is designed to simplify and streamline payment processes within your application or system. With Paykit, users can easily manage their digital wallets and perform secure transactions using various payment gateway.

The module consists of 3 main packages:
- Wallet
- Paystack
- Flutterwave

# Wallet
This package enables you to create and manage digital wallets securely. It includes features such as wallet creation, balance management, and transaction history.

## Update model or add migration?
If you update the model, you need to generate a new typed file. To do this, run the following command:
- Run `DATABASE_URL=db-connection-string DATABASE_NAME=db-name pnpm generate:schema`
- For dev environment, run `DATABASE_URL=mysql://root:testrootpassword@localhost:3306/walletmodule DATABASE_NAME=walletmodule pnpm generate:schema`

## Usage
```
import {
    walletModel,
    debitActions,
    creditActions,
    walletActions
} from './wallet';
```

### Test authentication to db
``` 
const wallet await walletModel.authenticate();
if(!wallet) throw new Error('Unable to connect to database');

// To close the db connection
await walletModel.disconnect();
```

### Create wallet
userId is required to create a wallet. The userId is the unique identifier of the user in your system. It can be the user's email, phone number, or any other unique identifier. The userId is used to uniquely identify the user's wallet in the system.
```
await walletActions.createWallet(userId);
```

## Run test
- The test is written using jest. It automatically creates a test database before the test and destroy it after the test is completed. To run the test, run `pnpm test`
- Incase of any error during the test, run `pnpm stop:test:db` to manually destroy the test database
- To manually start the test database, run `pnpm start:test:db`