import { matchedData, validationResult } from "express-validator";


export default (schemas, status = 400) => {
  const validationCheck = async (req, next) => {
    const errors = validationResult(request);
    request = { ...request, ...matchedData(request) };

    if (!errors.isEmpty()) {
      const mappedErrors = Object.entries(errors.mapped()).reduce(
        (accumulator, [key, value]) => {
          accumulator[key] = value.msg;
          return accumulator;
        },
        {}
      );

      const validationErrors = new ApplicationError(
        status,
        "Invalid Credentials",
        mappedErrors
      );

      return next(validationErrors);
    }

    return next();
  };

  return [...(schemas.length && [schemas]), validationCheck];
};
