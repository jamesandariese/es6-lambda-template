// bin/run.js

const args = process.argv;
const requiredLambda = args[2].split(".");
const lambdaModule = require(`../dist/${requiredLambda[0]}.js`);
const lambda = lambdaModule[requiredLambda[1]];
const options = JSON.parse(args[3]);

function succeed(result) {
  console.log(result);
  process.exit(0);
}

function fail(error) {
  console.error(error);
  process.exit(1);
}

const context = {
  succeed: succeed,
  fail: fail,
  done: (err, res) => err ? fail(err) : succeed(res),
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
};

Promise.resolve(lambda(options, context))
  .then((data) => {
      console.log(data);
      process.exit(0);
  })
  .catch((err) => {
      console.log("ERROR");
      console.log(err);
      process.exit(1);
  });

