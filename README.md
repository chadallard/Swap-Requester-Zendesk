# Zendesk Swap Requester App

This Zendesk app adds a button to the ticket editor to swap requester with another user in the CC / collaborator list. 

It can also be set up to automatically swap the requester from specific email domains.

## Features

- Adds a "Swap Requester" button to the ticket editor.
- Automatically swap the requester based on email domain list.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/chadallardswap-requester-zendesk.git
    ```

2. Navigate to the app directory:
    ```sh
    cd swap-requester-zendesk
    ```

3. Install Zendesk Command Line Interface (Note, you need Node.js installed to use this tool.)
    ```sh
    npm install @zendesk/zcli -g
    ```

4. Package the app:
    ```sh
    zcli apps:package
    ```

5. Upload the package to your Zendesk instance:
    - Go to your Zendesk Admin Center.
    - Navigate to the "Apps" section.
    - Click "Upload App" and follow the prompts to upload the `zip` file generated in the previous step.

6. Configure the app settings as needed to add a comma-separated list of email domains to swap the requester for.

## Usage

- Open a ticket in Zendesk.
- Click the "Swap Requester" button in the ticket editor icons.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
