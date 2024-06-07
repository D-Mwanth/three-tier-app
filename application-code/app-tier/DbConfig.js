const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

// Define the secret name
const secret_name = "${DB_SECRET_MANAGER}";

// Create a Secrets Manager client
const client = new SecretsManagerClient({
  region: "us-east-1",
});

const getSecret = async () => {
  let response;

  try {
    // Retrieve the secret value
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // Handle the error appropriately
    console.error("Error retrieving secret value:", error);
    throw error;
  }

  // Parse the secret string
  const secret = JSON.parse(response.SecretString);

  // Return the database credentials
  return {
    DB_HOST: secret.endpoint.split(':')[0], // Extract host from endpoint
    DB_PORT: secret.endpoint.split(':')[1], // Extract port from endpoint
    DB_USER: secret.username,
    DB_PWD: secret.password,
    DB_DATABASE: secret.app_database,
  };
};

module.exports = getSecret;