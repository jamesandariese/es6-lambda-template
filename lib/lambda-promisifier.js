export function lambdaPromisifier(lambda) {
  return options =>
    new Promise((resolve, reject) => {
      try {
          const ret = lambda(options, {
        succeed: resolve,
        fail: reject,
        done: (err, res) => (err ? reject(err) : resolve(res)),
        getRemainingTimeInMillis: () => Infinity,
        functionName: "fakeLambda",
        functionVersion: "0",
        invokedFunctionArn: "arn:aws:lambda:fake-region:fake-acc:function:fakeLambda",
        memoryLimitInMB: Infinity,
        awsRequestId: "fakeRequest",
        logGroupName: "fakeGroup",
        logStreamName: "fakeStream",
        identity: null,
        clientContext: null
      })
          if (ret !== undefined) {
              resolve(ret);
          }
      } catch(error) {
          reject(error);
      }
    });
}