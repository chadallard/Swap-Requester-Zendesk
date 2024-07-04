import { isValidDomainList } from './utils.js';

export const swapButton = async (client) => {

    try {
        // fetch all the required ticket data
        const [requesterId, collaborators, metadata] = await Promise.all([
            client.get('ticket.requester.id'),
            client.get('ticket.collaborators'),
            client.metadata()
        ]);

        // validate the domain list
        let domains = [];
        if (metadata.settings.domains && isValidDomainList(metadata.settings.domains)) {
            domains = metadata.settings.domains.split(',').map(domain => domain.trim());
        }

        // process the collaborators
        if (collaborators && collaborators['ticket.collaborators'].length > 0) {
            for (const collaborator of collaborators['ticket.collaborators']) {
                const email = collaborator.email.trim();
                const domain = email.split('@')[1];

                // skip collaborators whose email domain is in the exclusion list
                if (domains.includes(domain)) {
                    continue;
                }

                // swap requester and collaborators
                await Promise.all([
                    client.invoke('ticket.collaborators.add', { id: requesterId['ticket.requester.id'] }),
                    client.set('ticket.requester', { id: collaborator.id }),
                    client.invoke('ticket.collaborators.remove', { id: collaborator.id })
                ]);
                break;
            }
        }
        client.invoke('app.close');
    } catch (error) {
        console.error('Error in swapButton function:', error);
    }
}
