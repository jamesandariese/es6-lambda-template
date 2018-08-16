import AWS from 'aws-sdk';

export async function hello(options, context) {
    return await Promise.resolve(`Hello ${options.name || "world"}!`);
}
