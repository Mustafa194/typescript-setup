/**
 * @desc          Handles async and promises errors
 * @returns       Array of the awaited promise type and an error, one of them must be null
 * @logic         If there is no error the data will be returned and the error will be null
                  or if an error occurs the data will be null and the error will be returned
 */
async function asyncHandler<Type>(promise: Promise<Type>) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export default asyncHandler;
