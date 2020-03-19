# conev-core

Conev is a module that build environment variables from a `source` into `config`. Storing configuration in the environment separate from code is based on [The Twelve-Factor App](http://12factor.net/config) methodology.

![](https://img.shields.io/npm/dm/conev.png?style=flat-square)

​    

## Install

```shell
# with npm 
npm install conev-core
 
# or with Yarn 
yarn add conev-core
```

​    

## Config Builder

```typescript
class ConfigBuilder {
    constructor(sources?: Source[], env?: string[]);
    setEnv(...env: string[]): ConfigBuilder;
    addEnv(...env: string[]): ConfigBuilder;
    addSource(source: Source, priority?: number): ConfigBuilder;
    build(): Promise<Config>;
}
```

`ConfigBuilder` takes a configuration from the source and creates a new configuration according to the environment. `Env` and `Source` have priority. If priority is not defined, highest priority is added first.

​    

## Source

```typescript
interface Source {
    export(): Promise<Map<string, object>>;
}
```

`Source` defines the source from which to get the configuration. Map is returned as the result value of `export`. The key of this map is environment and the value is the configuration when environment.

​    

## Config

```typescript
class Config {
    constructor(map: Map<string, object>, envs: string[]);
    get(key?: string): object;
    set(key: string, value: any): void;
}
```

`config` is a container for configuration. `config` is provided by creating a new configuration from the configuration and environment obtained from ` source`.

​    

## Expansion

It can be extended by defining a new `Source`.
