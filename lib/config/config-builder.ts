// eslint-disable-next-line no-unused-vars
import Source from '../source/source';
import Config from './config';
import addSource from '../source/add-source';

export default class ConfigBuilder {
  private readonly sources: Source[];

  private env: string[];

  constructor(sources?: Source[], env?: string[]) {
    this.sources = sources || [];
    this.env = env || [process.env.NODE_ENV as string, 'basic'];
  }

  setEnv(...env: string[]): ConfigBuilder {
    this.env = env;

    return this;
  }

  addEnv(...env: string[]): ConfigBuilder {
    this.env.push(...env);

    return this;
  }

  addSource(source: Source, priority: number = -1): ConfigBuilder {
    addSource(this.sources, source, priority);

    return this;
  }

  build(): Config {
    return new Config(this.sources, this.env);
  }
}
