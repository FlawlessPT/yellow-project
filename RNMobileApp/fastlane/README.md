fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Fetch certificates and provisioning profiles

### ios build

```sh
[bundle exec] fastlane ios build
```

Fetch certificates. Build the iOS application.

### ios deploy_to_test_flight

```sh
[bundle exec] fastlane ios deploy_to_test_flight
```

Build and Deploy to test flight

----


## Android

### android build

```sh
[bundle exec] fastlane android build
```

Build the Android application.

### android deploy_internal_play_store

```sh
[bundle exec] fastlane android deploy_internal_play_store
```

Build and deploy to internal play store.

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
