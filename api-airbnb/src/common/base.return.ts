import { responseSucess } from '../utils/response';

export const baseReturn = async (task: Promise<any>, statusCode: number) => {
  const data = await task;
  return responseSucess(statusCode, data);
};
