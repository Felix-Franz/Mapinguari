const { execSync } = require('child_process');
const { unlinkSync } = require('fs');

const faviconConfiguration = {
    "masterPicture": "src/resources/logo.png",
    "iconsPath": "/favicon",
    "design": {
        "ios": {
            "pictureAspect": "noChange",
            "assets": {
                "ios6AndPriorIcons": true,
                "ios7AndLaterIcons": true,
                "precomposedIcons": true,
                "declareOnlyDefaultIcon": true
            }
        },
        "desktopBrowser": {
            "design": "raw"
        },
        "windows": {
            "pictureAspect": "noChange",
            "backgroundColor": "#20232a",
            "onConflict": "override",
            "assets": {
                "windows80Ie10Tile": true,
                "windows10Ie11EdgeTiles": {
                    "small": true,
                    "medium": true,
                    "big": true,
                    "rectangle": true
                }
            }
        },
        "androidChrome": {
            "pictureAspect": "noChange",
            "themeColor": "#20232a",
            "manifest": {
                "name": "Mapinguari",
                "startUrl": "/",
                "display": "standalone",
                "orientation": "notSet",
                "onConflict": "override",
                "declared": true
            },
            "assets": {
                "legacyIcon": false,
                "lowResolutionIcons": false
            }
        },
        "safariPinnedTab": {
            "pictureAspect": "blackAndWhite",
            "threshold": 30,
            "themeColor": "#00e5ff"
        }
    },
    "settings": {
        "scalingAlgorithm": "Mitchell",
        "errorOnImageTooSmall": false,
        "readmeFile": false,
        "htmlCodeFile": false,
        "usePathAsIs": false
    }
}

console.log("Generating favicon (this might take some time)...")
execSync(`real-favicon -- generate <(echo '${JSON.stringify(faviconConfiguration)}') favicon.json public/favicon`, { stdio: "inherit", shell: "/bin/bash" });
execSync("real-favicon -- inject favicon.json public index.html", { stdio: "inherit", shell: "/bin/bash" });
unlinkSync("favicon.json");
console.log("Generating favicon finished")
