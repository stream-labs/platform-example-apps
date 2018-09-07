# Followers Alert widget with settings page

## Description
It is a simple alert widget that notifies you about a new followers and a settings page through which you can change an audio file that will be played for new followers.

| File | Description |
| ---- | ----------- |
| index.html | Widget that will be opened as a `browser source` in the Streamlabs OBS. Used to notify about new followers|
| settings.html | Settings page that can be opened via a top nav bar icon. Used to change an audio sound |
| manifest.json | Application description for the Streamlabs OBS |

## How to run
This project is made via [`vue-cli`](https://cli.vuejs.org/) tool.

To install dependencies, run:
```
> npm install
```

To build, run:
```
> npm run build
```
Build artifacts will be contained in the `dist/` folder.

## How it works
This project is using a `Streamlabs Platform SDK` to receive notifications, store audio file link and to pass messages between the `settings` page and the `widget` page in real-time without restarts.

In `vue.config.js` contains a simple config for a multi-page build for `Vue.js` and a `baseUrl` property for `CDN` deployments.
