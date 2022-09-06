# Macrometa GDN – Polling App

Polling App built on [Next.js](https://nextjs.org/) and [Macrometa GDN](https://www.macrometa.com/products/nosql), deployed on [Vercel](https://vercel.com/) with the Vercel + Macrometa integration

![](/public/macrometa-polling-app.png)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMacrometacorp%2Fdemo-vercel-pollingapp&project-name=macrometa-polling-app&repo-name=macrometa-polling-app&demo-title=Macrometa%20Polling%20App&demo-description=Take%20Polls%20using%20Macrometa%20Polling%20APP&demo-image=https%3A%2F%2Fgithub.com%2FMacrometacorp%2Fdemo-vercel-pollingapp%2Fblob%2F9df4f5fe97a238bdb5f418bd2eddf378edc7b837%2Fpublic%2Fmacrometa-polling-app.png&integration-ids=oac_jTz48t3BK5HRhsFuCy7Ppi83)

## Macrometa GDN Setup

### Collections

Create the following collections in your federation:

```
vercel_polls (global document)
vercel_page_content (global document)
```

## Run it Locally

### Prerequisites

Make sure you have:

-   Created all the resources in Macrometa GDN Setup section, and
-   Generated an API key with the corresponding permissions.
-   Run this [:link: Query](./query-workers.md) in [:link: Macrometa GDN Console](https://gdn.paas.macrometa.io/#queries)

Also, you will have to create a `.env` from `.env.sample` file to store your environment variables. This file must have the following env. variables:

```
MACROMETA_URL= {MACROMETA_URL}
MACROMETA_FABRIC_NAME= {MACROMETA_FABRIC_NAME}
MACROMETA_API_KEY= {MACROMETA_API_KEY}
MACROMETA_POLLS_COLLECTION_NAME= {MACROMETA_POLLS_COLLECTION_NAME}
NEXT_PUBLIC_MACROMETA_POLLS_COLLECTION_NAME= {NEXT_PUBLIC_MACROMETA_POLLS_COLLECTION_NAME}
MACROMETA_CONTENT_COLLECTION_NAME= {MACROMETA_CONTENT_COLLECTION_NAME}
```

### Steps

First, clone the repository and `cd` to the `demo-vercel-pollingapp` directory.

```
git clone git@github.com:Macrometacorp/demo-vercel-pollingapp.git
```

Then, install the project's dependencies with

```
npm install
```

and finally, run

```
npm run dev
```

This will start a local development server on `localhost:3000`.
