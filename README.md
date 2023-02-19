# TypeScript Setup

***Note:*** Check the packages in ```package.json``` and remove the once you don't want to work with.

## To Start Using the setup use the following instructions

1. Install packages using ```npm i```.

2. To initialize prisma use ```npx prisma init --datasource-provider <provider-name>```
   - Example:
   ```npx prisma init --datasource-provider mysql```.

3. Create the keys in the ```.env``` file
   - Example:

   ```env
   API_PORT=3001
   API_ENV=development
   API_SECRET_KEY=Hv1lPM+zR8IA/5V3K1kByhNNnZurJOW0DYDbMVAj0v3jSZhCxoneA+e8VIoODkipDWlSKTjQB0d4JoPt
   JWT_PRIVATE_KEY=4ytV1l5vEuQTuRX8I5cFRTx38zADzRp+kQ3UcH02crPomznz0ZnrSWtVrHZWnGUi6RV74e9wSoxBwGqM
   ```

   ***Note:*** you can generate the secrets by creating a vanilla js file and write the following code

   ```js
   console.log(require("crypto").randomBytes(64).toString("base64"));
   ```

4. Remember to create an ```.env``` file with the needed environment variables and then configure the ```index.js``` file in the
