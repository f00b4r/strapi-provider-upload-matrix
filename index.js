module.exports = {
  init(options) {
    const matrix = new Matrix(options);

    return {
      upload(file, params = {}) {
        const provider = matrix.getProvider(file);

        strapi.log.info(`[strapi-provider-upload-matrix] File uploading using [${provider.name}] provider`);

        return provider.module.upload(file, params);
      },
      delete(file, params = {}) {
        const provider = matrix.getProvider(file);

        strapi.log.info(`[strapi-provider-upload-matrix] File deleting using [${provider.name}] provider`);

        return provider.module.delete(file, params);
      },
    };
  },

};

class Matrix {

  constructor(options) {
    this._options = options;
    this._providers = {};
  }

  getProvider(file) {
    const provider = this.resolve(file);
    if (!provider) {
      throw "[strapi-provider-upload-matrix] No provider provided";
    }

    const id = provider.id;
    const name = provider.use.provider;
    const options = provider.use.providerOptions;

    if (!this._providers[id]) {
      // Init provider and store to cache
      this._providers[id] = {
        id,
        name,
        options,
        module: require(`strapi-provider-upload-${name}`).init(options),
      }
    }

    return this._providers[id];
  }

  resolve(file) {
    // Lookup by extension
    const byExtension = this.resolveByExtension(file.ext);
    if (byExtension) return byExtension;

    // Lookup by mime type
    // @todo

    // Fallback
    const byFallback = this.resolveByFallback();
    if (byFallback) return byFallback;

    strapi.log.error(`[strapi-provider-upload-matrix] No fallback provider defined`);
  }

  resolveByExtension(extension) {
    const ext = extension.replace(/\./g, '');
    return (this._options.resolvers || []).find(r => (r.test.ext || []).includes(ext));
  }
  resolveByFallback() {
    return (this._options.resolvers || []).find(r => r.test === '*');
  }

}
