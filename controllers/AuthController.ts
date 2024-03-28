import { User } from "next-auth";

interface EmailUser {
  email: string;
  password: string;
}

const CreateEmailUser = async (credentials: EmailUser) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/createUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.ok;
};

const FindUserByEmail = async (email: string): Promise<User | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/findUserByEmail/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 404) {
    return null;
  }
  const user: User = await response.json();
  return user;
};

const UniqueUsernameCheck = async (username: string): Promise<boolean> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/uniqueUsername/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user: User | null = await response.json();
  return !!user;
};

// const CompleteOnboarding = async(): Promise<boolean> => {}
export { CreateEmailUser, FindUserByEmail, UniqueUsernameCheck };
