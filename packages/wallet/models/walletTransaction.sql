CREATE TABLE IF NOT EXISTS walletTransactions (
    id INT(11) NOT NULL AUTO_INCREMENT,
    walletId INT(11) NOT NULL,
    amount DOUBLE NOT NULL,
    transactionType ENUM('credit', 'debit') NOT NULL,
    previousBalance DOUBLE NOT NULL,
    newBalance DOUBLE NOT NULL,
    narration VARCHAR(255) NOT NULL,
    transactionId VARCHAR(255) NOT NULL,
    transactionDetails JSON NOT NULL,
    status ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (walletId) REFERENCES wallets(id) ON DELETE RESTRICT
);
ALTER TABLE walletTransactions AUTO_INCREMENT=1000000;
CREATE INDEX idx_walletId ON walletTransactions (walletId);