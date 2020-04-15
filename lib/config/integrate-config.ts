import deepAssignObject from '../object/deep-assign-object';

export default function integrateConfig(configs: Array<object>): object {
  return configs.reduceRight((pre, curr) => deepAssignObject(pre, curr), {});
}
