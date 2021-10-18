# Order book

This project contains the order book for XBT-USD and ETH-USD pairs.

## Main technologies

- react native
- redux
- redux-saga
- reselect
- typescript
- websockets

## Prerequisites

- Node.js v.12 or greater is required
- yarn
- For Android:
  - version 8 of the Java SE Development Kit (JDK)
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device
- For iOS:
  - Xcode
  - [CocoaPods](https://cocoapods.org/)

**If you haven't launched any React Native projects before, you should check [Setting up the development environment · React Native](https://reactnative.dev/docs/environment-setup) to set up your local development environment correctly.**

## Installation

```sh
$ git clone https://github.com/KedziaPawel/Order-book.git
$ cd orderbook
$ yarn install
```

To run iOS app you also need to install Swift project's dependencies:

```sh
$ cd ios
$ pod install
```

## Running the app

To run the app on specific platform in the debug mode:
Start the metro bundler in the first terminal:

```sh
$ yarn start
```

Start the chosen platform in the second terminal:

```sh
$ yarn android
$ yarn ios
```

## Testing

To run tests:

```bash
$ yarn test
```

## Performance solution overview

The app has to process large throughput of data coming from about order book. In order to run smoothly apps caches this data before they are added to main bids/asks state. It's done like this because when the main bids/asks are updated the selector recomputes grouping of the data and the UI is updated. If it would be done for every event from the websockets the app would have serious problem with performance. That said the main bids/asks update is throttled so it updates every second.

## Todo, app improvments

- throttle time could be parametrized, for example based on the computing power of the phone CPU. For phone with weak CPU it could be increased and decreased for the phones with powerful CPU.
- if we would have control over the server socket.io could be used on the client and server side
- styled-components with theming could be added with variables, like padding, fonts etc.
- websockets url should be taken from the environment variable and should be diffrent for every environment (dev, staging, prod)
- in production the monitoring should be added, for example firebase crashlytics and analytics, sentry error handler and performance monitor
- navigation, currently it's only one screen, but later the navigation should be added, for example react-navigation
- production distribiution
- typedoc for documentation
- husky with formatting on pre-commit and testing on pre-push
- storybook for components library
- e2e tests, for example detox
- integration tests of UI, for example react native testing library
- eslint could be improved, for example with airbnb rules
- commitizen for changelog
- logger, for example winston

Cheers!:)
