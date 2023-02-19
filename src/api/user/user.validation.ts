import { z } from "zod";

export const IdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    username: z.string().min(4).max(30),
    password: z.string().min(4),
  }),
});

type Id = z.infer<typeof IdSchema>["params"];
type LoginData = z.infer<typeof LoginSchema>["body"];

export { Id, LoginData };
