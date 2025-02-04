# 🍄 Mushroom (--Better-Sliders)

<!-- [![hacs][hacs-badge]][hacs-url]
[![release][release-badge]][release-url]
![downloads][downloads-badge]
![build][build-badge]
 -->
[original-repo]: https://github.com/piitaya/lovelace-mushroom

![Overview](https://raw.githubusercontent.com/phischdev/lovelace-mushroom-better-sliders/master/.github/images/readme_image.png)

## What is mushroom-better-sliders?
This is a fork of the fantastic [Mushrooms UI Cards][original-repo] by piitaya, a collection of cards for [Home Assistant][home-assistant] Dashboard UI.

It focuses on making the sliders more touch friendly.

1. Sliders move on reduced speed when dragged by a finger (easier to hit small values)
2. Sliders can be dragged from any point on the slider (like in iOS Home)
3. Sliders apply live changes to your devices (except turning them off)
2. Explicitly makes it easier to hit 1%

The original lovelace-mushroom has to be disabled for it to work.

## Installation

### HACS

Mushroom Better Sliders is available in [HACS][hacs] (Home Assistant Community Store).

1. Install HACS if you don't have it already
2. Open HACS in Home Assistant
3. Go to "Frontend" section
4. Click button with "+" icon
5. Search for "Mushroom Better Sliders"

### Manual

1. Download repository and build `mushroom.js`. Instructions are in the [original repo][original-repo].
2. Put `mushroom.js` file into your `config/www` folder.
3. Add reference to `mushroom.js` in Dashboard. There's two way to do that:
    - **Using UI:** _Settings_ → _Dashboards_ → _More Options icon_ → _Resources_ → _Add Resource_ → Set _Url_ as `/local/mushroom.js` → Set _Resource type_ as `JavaScript Module`.
      **Note:** If you do not see the Resources menu, you will need to enable _Advanced Mode_ in your _User Profile_
    - **Using YAML:** Add following code to `lovelace` section.
        ```yaml
        resources:
            - url: /local/mushroom.js
              type: module
        ```

## Usage

All the Mushroom cards can be configured using Dashboard UI editor.

1. In Dashboard UI, click 3 dots in top right corner.
2. Click _Edit Dashboard_.
3. Click Plus button to add a new card.
4. Find one of the _Custom: Mushroom_ card in the list.

### Cards

Different cards are available for differents entities :

-   🚨 [Alarm card](docs/cards/alarm.md)
-   🪟 [Cover card](docs/cards/cover.md)
-   🪄 [Entity card](docs/cards/entity.md)
-   💨 [Fan card](docs/cards/fan.md)
-   💡 [Light card](docs/cards/light.md)
-   🙋 [Person card](docs/cards/person.md)
-   🛠 [Template card](docs/cards/template.md)
-   🔔 [Chips card](docs/cards/chips.md)
-   ✏️ [Title card](docs/cards/title.md)
-   📦 [Update card](docs/cards/update.md)
-   🧹 [Vacuum card](docs/cards/vacuum.md)
-   📺 [Media card](docs/cards/media-player.md)
-   🔒 [Lock card](docs/cards/lock.md)
-   💧 [Humidifier card](docs/cards/humidifier.md)
-   🌡 [Climate card](docs/cards/climate.md)
-   📑 [Select card](docs/cards/select.md)

### Theme customization

Mushroom works without theme but you can add a theme for better experience by installing the [Mushroom Themes](https://github.com/piitaya/lovelace-mushroom-themes). If you want more information about themes, check out the official [Home Assistant documentation about themes][home-assitant-theme-docs].

## Development server

### Home assistant demo

You can run a demo instance of Home Assistant with docker by running:

```sh
npm run start:hass
```

Once it's done, go to Home Assistant instance [http://localhost:8123](http://localhost:8123) and start configuration.

#### Windows Users

If you are on Windows, either run the above command in Powershell, or use the below if using Command Prompt:

```sh
npm run start:hass-cmd
```

### Development

In another terminal, install dependencies and run development server:

```sh
npm install
npm start
```

Server will start on port `4000`.

### Home assistant configuration

Once both Home Assistant and mushroom are running, you have to add a resource to Home Assistant UI:

-   Enable `Advanced Mode` in your profile page
-   Go to Dashboard Resources and add the resource `http://localhost:4000/mushroom.js`:  
    _Settings_ → _Dashboards_ → _More Options icon_ → _Resources_ → _Add Resource_ → Set _URL_ as `http://localhost:4000/mushroom.js` → Set _Resource type_ as `JavaScript Module`.

<!-- Badges -->

[hacs-url]: https://github.com/hacs/integration
[hacs-badge]: https://img.shields.io/badge/hacs-default-orange.svg?style=flat-square
[release-badge]: https://img.shields.io/github/v/release/piitaya/lovelace-mushroom?style=flat-square
[downloads-badge]: https://img.shields.io/github/downloads/piitaya/lovelace-mushroom/total?style=flat-square
[build-badge]: https://img.shields.io/github/actions/workflow/status/piitaya/lovelace-mushroom/build.yml?branch=main&style=flat-square

<!-- References -->

[home-assistant]: https://www.home-assistant.io/
[home-assitant-theme-docs]: https://www.home-assistant.io/integrations/frontend/#defining-themes
[hacs]: https://hacs.xyz
[ui-lovelace-minimalist]: https://ui-lovelace-minimalist.github.io/UI/
[button-card]: https://github.com/custom-cards/button-card
[7ahang]: https://www.behance.net/gallery/88433905/Redesign-Smart-Home
[release-url]: https://github.com/piitaya/lovelace-mushroom/releases
