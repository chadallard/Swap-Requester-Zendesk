import { swapButton } from './swapButton.js';
import { autoSwap } from './autoSwap.js';


const client = window.ZAFClient.init();
client.invoke('resize', { width: '0', height: '0' });


client.on('app.registered', async () => {
    await autoSwap(client);
});

client.on('pane.activated', async () => {
    await swapButton(client);
});