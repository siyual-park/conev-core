// eslint-disable-next-line no-unused-vars
import Source from '../source/source';

import integrateConfig from './integrate-config';
import getConfig from './get-config';
import setConfig from './set-config';
import extractConfigFromSources from '../source/extract-config-from-sources';
import addSource from '../source/add-source';
import configValidate from './config-validate';

export default class Config {
  private readonly sources: Source[];

  private env: string[];

  private value: object;

  constructor(sources: Source[], env: string[]) {
    this.sources = sources;
    this.env = env;
    this.value = {};
  }

  setEnv(...env: string[]): Config {
    this.env = env;

    return this;
  }

  addEnv(...env: string[]): Config {
    this.env.push(...env);

    return this;
  }

  addSource(source: Source, priority: number = -1): Config {
    addSource(this.sources, source, priority);

    return this;
  }

  async refresh(): Promise<Config> {
    const config = await extractConfigFromSources(this.sources);
    const configs = this.env.map((element) => config.get(element));

    this.value = integrateConfig(configs);

    return this;
  }

  validate(): void {
    configValidate(this.value);
  }

  get(key: string = null): object {
    return getConfig(this.value, key);
  }

  set(key: string, value: any) {
    if (key === null) this.value = value;

    setConfig(this.value, key, value);
  }
}
