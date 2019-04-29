# aws-secret-manager

A simple way to get a secret from AWS Secrets Manager.

Assumes that AWS credentials are set in `.aws` or as Environment Variables.

# install

```bash
yarn add @dsandor\aws-secret-manager
```

# usage

```javascript
const SecretManager = require('@dsandor\aws-secret-manager');

const secretManager = new SecretManager('my-secret-id');
const secret = await secretManager.getSecrets();
```

You can also pass the secret id on the `getSecrets` call.

```javascript
const SecretManager = require('@dsandor\aws-secret-manager');

const secretManager = new SecretManager();
const secret = await secretManager.getSecrets('my-secret-id');
```

Or one line if you wish;

```javascript
const SecretManager = require('@dsandor\aws-secret-manager');

const secret = await new SecretManager().getSecrets('my-secret-id');
```

# Constructor

```javascript
  /**
   * .ctor
   * @param secretName - optionally set the secret to retrieve.
   * @param region - the AWS region where the secret exists. Defaults: AWS_REGION, AWS_DEFAULT_REGION, us-east-1
   */
  SecretManager(secretName, region = process.env['AWS_REGION'] || process.env['AWS_DEFAULT_REGION'] || 'us-east-1')
```

# getSecrets

```javascript
 /**
   * Get's the secrets for an environment.
   * @param secretName - the name (or id) of the secret in AWS.
   * @returns {Promise<string|any>} - Returns a JS Object if the results can be parsed otherwise it returns the raw string.
   */
  async getSecrets(secretName = this.secretName)
```

