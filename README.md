
# Discord Pinger

Discord Pinger is a simple web application that allows users to ping specific Discord users or entire channels using a Discord webhook. It supports customizable messages, usernames, and bot avatars.

## Features

- Ping specific users, everyone, or here with a custom message.
- Custom bot name and avatar URL support.
- Form validation for empty fields and proper URL format.
- Light/Dark mode toggle.
- Built with **Next.js 14**, **TypeScript**, and **Shadcn UI**.

## Tech Stack

- **Next.js** (version 14)
- **TypeScript**
- **Shadcn UI** for UI components
- **Tailwind CSS** for styling
- **Next Themes** for dark/light mode toggling

## Live Demo

Link: [Demo Site](https://zhenfon.github.io/discord-pinger/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/discord-pinger.git
cd discord-pinger
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at:

```
http://localhost:3000
```

## How to Use

1. **Insert the Discord Webhook**: Paste the webhook URL for the Discord channel you want to send messages to.
2. **Select Target**: Choose from "User", "@everyone", or "@here". If "User" is selected, you'll need to insert the Discord user ID.
3. **Insert the Message**: Write the message you want to send.
4. **Bot Customization**: You can optionally add a bot name and avatar image URL.
5. **Send the Ping**: Click the "Ping" button to send the message.

## Environment Setup

1. **Discord Webhooks**: Learn more about how to create a Discord webhook [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

2. **Environment Variables**: You may use environment variables to store sensitive information. To use `.env`:

   ```bash
   NEXT_PUBLIC_DISCORD_WEBHOOK=<YOUR_DISCORD_WEBHOOK>
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any features or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.