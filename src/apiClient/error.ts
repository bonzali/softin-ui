export function convertErrors(errors: any, useKey = false) {
  const errorList: string[] = [];
  const keys = Object.keys(errors);
  keys.forEach((key) => {
    const errorsArray = errors[key];
    if (Array.isArray(errorsArray)) {
      errorsArray.forEach((key1, index1) => {
        if (useKey) {
          errorList.push(`${errorsArray[index1]} : ${key1}`);
        } else {
          errorList.push(`${errorsArray[index1]}`);
        }
      });
    } else {
      errorList.push(`${key}: ${errorsArray}`);
    }
  });
  return errorList;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}