// eslint-disable-next-line no-unused-vars
import Source from '../source/source';

import integrateConfig from './integrate-config';
import getConfig from './get-config';
import setConfig from './set-config';
import extractConfigFromSources from '../source/extract-config-from-sources';

export default class Config {
  private readonly sources: Source[];

  private env: string[];

  private value: object;

  constructor(sources: Source[], env: string[]) {
    this.sources = sources;
    this.env = env;
    this.value = {};
  }

  async refresh(): Promise<Config> {
    const config = await extractConfigFromSources(this.sources);
    const configs = this.env.map((element) => config.get(element));

    this.value = integrateConfig(configs);

    return this;
  }

  get(key: string = null): object {
    return getConfig(this.value, key);
  }

  set(key: string, value: any) {
    if (key === null) this.value = value;

    setConfig(this.value, key, value);
  }
}
