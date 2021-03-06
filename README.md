
# Man in the middle response interceptor

This is an utility for modifying data from Json RESTFUL API responses.

> Originally made for prevent waiting specific expedients from the conecta project

# Install

You can use any package manager but this project is set with pnpm

```bash
pnpm install
```

## Usage

### Run
```bash
pnpm dev
```

### Compile

```bash
pnpm build
```

### Start (JS)

```bash
pnpm start
```

> Always use dev script

### Replace the original server url by the proxy url 

Once you started the proxy server you will need to change the url of the original api to the proxy one (`http://localhost:3001` as default)
> In the conecta project you have to to replace the local url inside `src/common/constants/env.ts` as in the next image:
> 
> ![image](https://user-images.githubusercontent.com/101884405/170985059-0b1729ee-59b1-4947-a65b-91d4febf7fdc.png)


# Setup

Basic guide to setup the proxy server

## Setup your envs 

   ```env
   PROXY_BASE_URL=https://conecta-web-develop.azurewebsites.net
   PROXY_PORT=8081
   ```
   > It resolves to proxy localhost:3000 if no base is set
   > It resolves to the 3001 port if no proxy port is set

## Set your targets

Targets are common records for the utility to know which request needs to be modified.

To make it work you will need to place your request targets (of the type `IRequestTarget`) inside `src/target.ts` which returns by default an array with al your target filters (`IRequestTarget[]`), a target looks like this:

```typescript
{
    endpoint: "/path/to/endpoint",
    method: "GET",
    resolveByStart: {
      paramAmountFilter: 1,
    },
    assign: {
      someField: true,
      another: 'lol'
    },
  }
```

### Request target options

- **`endpoint`**:
  - **Type**: `string`
  - **Required**: yes
  - **Description**: This is the literal endpoint that matches the request url.
- **`method`**:
  - **Type**: `AllowedMethod` (GET, PUT, DELETE, POST, PATCH, etc.)
  - **Required**: yes
  - **Description**: This is the literal method that matches the request method.
- **`resolveByStart`**:
  - **Type**: `IResolver`
  - **Required**: no
  - **Description**: If this option is set, the resolver will try to match the endpoint with the requested url by checking if it starts with. (e.g. `/path/to/endpoint/a_param/yes_a_param/another_param` will pass `/path/to/endpoint`). Otherwise it always will check if path is equal match with url.
- **`assign`**:
  - **Type**: `Record<string, any>`
  - **Required**: yes
  - **Description**: The body to patch against the response

### Resolve by start options

- **`paramAmountFilter`**:
  - **Type**: `number`
  - **Required**: yes
  - **Description**: To prevent injecting data inside every response that matches non literal endpoints, you need to set the param amount of the endpoint (e.g. `/path/to/endpoint/{param1}/{param2}/{param3}` in this case you need to set this prop to `3`)

> **PLEASE NOTE**: resolveByStart could match some urls even if the param amount is set due to route similarity but the proxy never replaces the responses it just assigns it to the curren body, so response will be ok the majority of cases.
