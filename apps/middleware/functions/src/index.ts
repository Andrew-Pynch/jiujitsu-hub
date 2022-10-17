import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export let api: any;

try {
    admin.initializeApp();

    api = functions.https.onRequest(AppRouter);

    api = functions.runWith({
        minInstances: 1,
    });
} catch (e) {
    console.error(e);
}

export * from './server';
