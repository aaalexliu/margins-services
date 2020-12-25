aws cognito-idp admin-initiate-auth \
  --user-pool-id us-east-1_jcGG3tVBb \
  --client-id 4v1q302r040fct1ve3kkhoo30b \
  --auth-flow ADMIN_USER_PASSWORD_AUTH \
  --auth-parameters USERNAME=test@test.com,PASSWORD=password