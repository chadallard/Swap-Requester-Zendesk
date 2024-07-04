import { swapButton } from './swapButton.js';
import { isValidDomainList } from './utils.js';

// automation
export async function autoSwap(client) {
    try {
        // fetch all the required ticket data
        const [requesterEmail, collaborators, metadata] = await Promise.all([
            client.get('ticket.requester.email'),
            client.get('ticket.collaborators'),
            client.metadata()
        ]);

        // validate the domain list
        let domains = [];
        if (metadata.settings.domains && isValidDomainList(metadata.settings.domains)) {
            domains = metadata.settings.domains.split(',').map(domain => domain.trim());
        }

        // get the domain of the requester
        const domain = requesterEmail['ticket.requester.email'].split('@')[1];

        // check if the requester domain is in the exclusion list, and if so, swap them out as requester
        if (domains.includes(domain)) {
            if (collaborators['ticket.collaborators'].length > 0) {
                await swapButton(client);
            }
        }
        client.invoke('app.close');
    } catch (error) {
        console.error('Error in autoSwap function:', error);
    }
}