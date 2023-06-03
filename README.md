# 🌫Mijikee

A simple URL shortener with [Deno KV](https://deno.com/kv).\
Mijikee works on [Deno Deploy](https://deno.com/deploy).

## 📃 TOC

- [Getting started](#-getting-started)
- [How to use](#-how-to-use)
- [Endpoints](#-endpoints)

## 🚀 Getting started

Install [Deno CLI](https://deno.land/) v1.33.1 or higher.

### 🏡 Local

From within your project folder, start the development server using the
`deno task` command.

```
deno task start
```

Now open http://localhost:8000 in your browser to view the page.

### 🌎 Internet

To deploy the project on [Deno Deploy](https://deno.com/deploy).

1. Push your project to GitHub.
2. [Create a Deno Deploy project](https://dash.deno.com/new).
3. [Link](https://deno.com/deploy/docs/projects#enabling) the Deno Deploy
   project to the `main.ts` file in the root of the created repository.
4. The project will be deployed to a public $project.deno.dev subdomain.

## 🤔 How to use

Save URL in KV by sending POST request to `/api/v1/links`.\
And you can access the URL from `:/shortPath`.

## 🔱 Endpoints

### `GET`: `/`

#### Response

```
Hello Mijikee!
```

### `GET`: `/:shortPath`

Redirect to URL set in `shortPath`.

### `POST`: `/api/v1/links`

Save URL in KV.

#### Form parameters

| Name | Type   | Description                       |
| ---- | ------ | --------------------------------- |
| url  | string | need url starting with "https://" |

#### Response

```
{
    message: "Short URL is created.",
    status: "ok",
    originUrl: "example.com",
    shortPath: "ExaMpLE"
}
```
