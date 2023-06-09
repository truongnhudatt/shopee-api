import _ from 'lodash';

export interface InfoData {
  fields: string[];
  object: object;
}

export const getInfoData = ({ fields = [], object = {} }: InfoData) => {
  return _.pick(object, fields);
};
