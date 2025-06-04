"use server";

import { cookies } from "next/headers";

export async function login(formLogin: { email: string; password: string }) {
  console.log("asdasdas 3243223423", formLogin);
  if (formLogin.email === "test@test.com" && formLogin.password === "test@@") {
    const token = "your_generated_token";
    (await cookies()).set("authToken", token, { httpOnly: true, maxAge: 3600 });
    return {
      success: true,
      user: { name: formLogin.email, email: formLogin.email, id: "1" },
      token: token,
      error: null,
    };
  } else {
    return {
      success: false,
      user: null,
      token: null,
      error: "Invalid credentials",
    };
  }
}

export async function logout() {
  (await cookies()).delete("authToken");
  return { success: true };
}
