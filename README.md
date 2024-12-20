# Card Deck Manager

## Introduction

The **Card Deck Manager** is a card management application built with **Angular**, **Material Design**, and **Firebase**. It allows users to shuffle, deal, and reset a standard deck of 52 playing cards. The state of the deck is saved to **Firebase Firestore**, allowing users to resume their session after reloading. This project was developed to assess skills in Angular, UI/UX design, and best practices, including the SOLID principles and use of interfaces.

## Live Demo

You can access the live version of the app here:  
[**Live Demo**](insert-your-live-url)

## Features

- **Deck Shuffling and Dealing**: Shuffle and deal cards from a standard 52-card deck.
- **History of Dealt Cards**: View previously dealt cards.
- **Reset Deck**: Restore the deck to its full 52 cards.
- **Firebase Integration**: The current state of the deck is stored in Firestore and persists between sessions.

## Setup and Running Locally

If you wish to run the project locally, follow the steps below.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (recommended version: 18.x or higher)
- [Angular CLI](https://angular.io/cli) (install with `npm install -g @angular/cli`)
- Firebase project and Firestore setup (create one on [Firebase Console](https://console.firebase.google.com/))

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/memorrowiv/CardDeckMorrow.git
   cd CardDeckMorrow
