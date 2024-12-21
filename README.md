# Card Deck Manager

## Introduction

The **Card Deck Manager** is a card management application built with **Angular**, **Material Design**, and **Firebase**. It allows users to shuffle, deal, and reset a standard deck of 52 playing cards. The state of the deck is saved to **Firebase Firestore**, allowing users to resume their session after reloading. This project was developed to assess skills in Angular, UI/UX design, and best practices, including the SOLID principles and use of interfaces.

## Live Demo

You can access the live version of the app here:  
[**Live Demo**](https://card-deck-manager-morrow.web.app/)

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
2. ### Install the Dependencies:

``bash
npm install

3. ### Set up Firebase:

  1. Create a Firebase project.
  2. Obtain your Firebase config and store it in the `src/environments/environment.ts` file.

---

4. ### Run the Application:

  ``bash
  ng serve

5. ### Open your browser and visit http://localhost:4200.

## Approach and Assumptions

- **SOLID Principles**: Code adheres to SOLID principles to ensure maintainability and scalability.
- **Material Design**: Used Angular Material for a clean, responsive interface.
- **Firebase**: Integrated Firebase for persisting deck state and handling history.

---

## Deployment

The app is deployed on Firebase Hosting. You can view the live demo at the URL mentioned above.

---

## Evaluation Criteria

The following aspects were considered when evaluating the project:

- **Functionality**: The app meets the outlined requirements (deck shuffling, dealing, and resetting).
- **Code Quality**: The code is clean, readable, and well-organized.
- **Use of Material Design**: Angular Material components were effectively utilized for UI/UX.
- **Best Practices**: SOLID principles and interfaces were applied appropriately.
- **Firebase Integration**: Firebase functionality was implemented correctly to persist deck state.
