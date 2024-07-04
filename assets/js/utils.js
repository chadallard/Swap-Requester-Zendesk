const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    return domainRegex.test(domain);
}

export const isValidDomainList = (input) => {

    if (!input) {
        return false;
    }

    // Trim any leading or trailing whitespace
    input = input.trim();
    
    // if valid single domain, return
    if (isValidDomain(input)) {
        return true;
    }
    
    // check for comma separated domains
    const domains = input.split(',').map(domain => domain.trim());
    for (const domain of domains) {
        if (!isValidDomain(domain)) {
            return false;
        }
    }
    
    return true;
}

