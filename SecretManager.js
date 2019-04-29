const AWS     = require('aws-sdk'),
      region  = process.env['AWS_REGION'] || process.env['AWS_DEFAULT_REGION'] || 'us-east-1';

/**
 * Provides helper functions fro getting FOS secrets from AWS Secret Manager.
 */
class SecretManager {
  /**
   * .ctor
   * @param secretName - optionally set the secret to retrieve.
   * @param region - the AWS region where the secret exists. Defaults: AWS_REGION, AWS_DEFAULT_REGION, us-east-1
   */
  constructor(secretName, region = process.env['AWS_REGION'] || process.env['AWS_DEFAULT_REGION'] || 'us-east-1') {
    this.region = region;
    this.secretName = secretName;
    this.client = new AWS.SecretsManager({ region: this.region });
  }

  /**
   * Get's the secrets for an environment.
   * @param secretName - the name (or id) of the secret in AWS.
   * @returns {Promise<string|any>} - Returns a JS Object if the results can be parsed otherwise it returns the raw string.
   */
  async getSecrets(secretName = this.secretName) {
    let secrets;

    const data = await this.client.getSecretValue({ SecretId: secretName }).promise();

    if ('SecretString' in data) {
      secrets = data.SecretString;
    } else {
      let buff = new Buffer(data.SecretBinary, 'base64');
      secrets = buff.toString('ascii');
    }

    try {
      return JSON.parse(secrets);
    } catch {
      return secrets;
    }
  }
}

module.exports = SecretManager;