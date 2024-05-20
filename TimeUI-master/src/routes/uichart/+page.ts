export const ssr = false;
// src/routes/+page.ts
import { validateUser, type User } from "$lib/types";
import type { PageLoad } from "../lib/types"; // Adjust the path as necessary

export const load = (async ({ fetch }: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> }) => { // Explicitly type fetch
  async function fetchUsers() {
    const result = await fetch(
      "https://dummyjson.com/users?select=age,firstName,lastName,weight,height&limit=10"
    );

    const { users } = await result.json();

    if (!Array.isArray(users)) {
      return [];
    }

    let validatedUsers: User[] = [];

    for (let user of users) {
      if (!validateUser(user)) {
        console.log(user);
        return [];
      }

      validatedUsers.push(user);
    }

    return validatedUsers;
  }

  return {
    users: await fetchUsers(),
  };
}) satisfies PageLoad;
