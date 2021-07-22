# Vizitor Backend

## Run the project locally (Development)

Run the following command and the APIs will the available locally for testing and development.

```closure
git clone https://gitlab.com/vizitorapp/backend-apis.git
cd backend-apis
npm install
npm run dev
```

## Lint Project

```closure
npm run lint  # for cheking the lint error
npm run lint:fix # for fixing the minor lint error
```

## Run Tests

Used [Mocha](https://mochajs.org/)

```closure
npm run test  # for running tests
```

## Directory Structure:

```
ci/
    All the CI configurations that are needed on server
config/
    All the configurations that are needed on server
scripts/
    All the scripts that are run on server
log/
    Logs of the running server
src/
    domain/
        module/
            TBD
    infra/
        database/
            models/
                Exposes all the Database Models
        utils/
            logger.js
            errorHandler.js
    interface/
        rest/
            module/
                TBD
        graphql/
            module/
                index.js -> resolvers
                schema.gql
            scalar/
                index.js -> resolvers
                schema.gql
            directives/
                index.js -> resolvers
                schema.gql
            resolvers.js
            typeDefs.js
            index.js
package.json
README.md
Dockerfile
apps.json
.huskyrc.js
.travis.yml
.gitignore
.eslintrc.js
.gitignore
```
## Explore

* https://www.npmjs.com/package/graphql-rate-limit
