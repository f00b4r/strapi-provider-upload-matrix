<h1 align=center>Strapi Matrix Provider</h1>

<p align=center>
   Combine multiple upload plugins together.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

<p align=center>
    <a href="https://github.com/webkitty/strapi-provider-upload-matrix/actions">
        <img src="https://badgen.net/github/checks/webkitty/strapi-provider-upload-matrix">
    </a>
    <a href="https://www.npmjs.com/package/strapi-provider-upload-matrix">
        <img src="https://badgen.net/npm/v/strapi-provider-upload-matrix">
    </a>
    <a href="https://www.npmjs.com/package/strapi-provider-upload-matrix">
        <img src="https://badgen.net/npm/dt/strapi-provider-upload-matrix">
    </a>
    <a href="/LICENSE">
        <img src="https://badgen.net/github/license/webkitty/strapi-provider-upload-matrix">
    </a>
</p>

![](/docs/screenshot.png)

-----

## Usage

To install latest version use [NPM](https://npmjs.com).

```
npm install --save strapi-provider-upload-matrix
```

## Overview

Strapi has great support for plugins and upload providers, but you can register only one upload provider.
Let's say you want to deploy images to image service and other files to file service. This provider will help you.

## Documentation

1. Install provider.
2. Install [other upload providers](https://www.npmjs.com/search?q=strapi-provider-upload-&ranking=popularity).
3. Edit configuration.

    We are going to setup 2 providers ([ImageKit](https://www.npmjs.com/package/strapi-provider-upload-imagekit) and [S3](https://www.npmjs.com/package/strapi-provider-upload-aws-s3)).

    - Images will use `imagekit` according to extensions (`png, jpg, jpeg, svg, webp, gif, tif, mp4, webm, mov, swf, pdf`)
    - Other files will use `aws-s3` according to fallback

    #### `{strapi}/config/plugins.js`

    ```js
    module.exports = ({ env }) => ({
        upload: {
            provider: 'matrix',
            providerOptions: {
            resolvers: [
                // ImageKit
                // Images, videos
                {
                    id: 'images',
                    test: {
                        ext: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'tif', 'mp4', 'webm', 'mov', 'swf', 'pdf'],
                    },
                    use: {
                        provider: "imagekit",
                        providerOptions: {
                        publicKey: env("IMAGEKIT_PUBLIC_KEY"),
                        privateKey: env("IMAGEKIT_PRIVATE_KEY"),
                        urlEndpoint: env("IMAGEKIT_URL"),
                            params: {
                                folder: env("IMAGEKIT_FOLDER"),
                            }
                        }
                    }
                },
                // AWS S3
                // Fallback
                {
                    id: 'misc',
                    test: '*',
                    use: {
                        provider: 'aws-s3',
                        providerOptions: {
                        accessKeyId: env('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: env('AWS_ACCESS_SECRET'),
                        region: env('AWS_REGION'),
                            params: {
                                Bucket: env('AWS_BUCKET'),
                            },
                        }
                    },
                },
            ]
            },
        }
    });
    ```

4. Profit 🚀

## Development

<a href="https://github.com/f3l1x">
    <img width="80" height="80" src="https://avatars2.githubusercontent.com/u/538058?v=3&s=80">
</a>

-----

Consider to [support](https://github.com/sponsors/f3l1x) **f3l1x**. Also thank you for using this package.
