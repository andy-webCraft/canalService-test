const correctLogin = "admin";
const correctPassword = "12345";

export const fakeAuthApi = {
  authCheck: (login: string, password: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (login === correctLogin && password === correctPassword) {
          return resolve(login);
        } else reject(new Error("Invalid login or password"));
      }, 500);
    });
  },
};
