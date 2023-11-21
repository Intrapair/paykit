import { Worker, Job } from 'bullmq';
import connection from '../../config/bull.config';
import emailQueue from '../../services/mailJobQueue';
import userPNQueue from '../../services/userPNQueue';
import pnEvents from '../../utils/constants/pnEvents';
import walletModule from '../../walletModule/index';

const start = async () => {
    // setup action worker
    const walletWorker = new Worker(
        String(process.env.USER_WALLET_QUEUE_NAME),
        async (job: Job) => {
            console.log(`Processing job #${job.id}`);
            const jobData = job.data;
            try {
                if (job.name === 'credit') {
                    console.log('Job type: credit');
                    const { uuid, data, amount, email } = jobData;
                    await Promise.all([
                        walletModule.credit(uuid, amount, data),
                        emailQueue.add('email', {
                            email,
                            type: 'fundSuccessful',
                            subject: 'Credit Transaction Notification',
                            data: {
                                amount: new Intl.NumberFormat().format(
                                    Number(amount)
                                ),
                            },
                        }),
                        userPNQueue.add('user_pn', {
                            uuid,
                            payload: '',
                            body: `₦${amount} has been credited to your AnyworkX wallet.`,
                            event: pnEvents.fundSuccessful,
                            title: `Credit Transaction Notification`,
                        }),
                    ]);
                } else if (job.name === 'debit') {
                    console.log('Job type: debit');
                    const { data } = jobData;
                    await walletModule.completeDebit(data.reference, data);
                } else if (job.name === 'revert') {
                    console.log('Job type: revert');
                    const { transaction_id } = jobData;
                    await walletModule.revert(transaction_id);
                } else {
                    console.log('Invalid job name');
                }
                return true;
            } catch (error) {
                console.log(`Error occur: ${error}`);
            }
        },
        { connection }
    );

    console.log(`Starting worker ${walletWorker.name}`);
};

export default {
    start,
};
