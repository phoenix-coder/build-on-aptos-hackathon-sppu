# Aptos Hackathon Project: Blockchain Task & Campaign Platform

This project is a blockchain-based platform built for the **Aptos Hackathon**, where users can earn points and claim tokens by completing tasks. Marketers can create campaigns, purchase plans, and sponsor posts. The frontend was built with Lovable, and the smart contracts are written in **Aptos Move**.

## Features

### User Features
- Earn points by completing tasks.
- Points displayed in navbar; becomes a "Claim" button after reaching 20 points.
- Connect Aptos wallet to interact with smart contracts.
- View campaigns in a list with details: name, post link, reward per action, and a "Done" button.

### Marketer Features
- **Add Campaign:** Create new campaigns via a popup form.
- **Purchase Plan:** Choose between three plans:
  - Basic: 5 posts, 40 APT
  - Premium: 10 posts, 70 APT
  - Pro: 20 posts, 150 APT
- **Sponsor Post:** Select a campaign post to feature on top for 10 APT.

## Tech Stack
- **Frontend:** React/Next.js (from Lovable)
- **UI Framework:** Tailwind CSS / Modular components
- **Blockchain:** Aptos Move smart contracts
- **Wallet Integration:** Petra wallet

## How to Run

1. Clone the repository:
```bash
git clone <repo-url>
cd frontend
npm install
npm run dev
```
2.Connect Aptos wallet and interact with campaigns.

Notes

Points and token claiming are simulated via smart contract functions.

Ensure the Aptos devnet/testnet is configured in the wallet.

All campaigns, plans, and sponsorship features are tied to blockchain transactions.
