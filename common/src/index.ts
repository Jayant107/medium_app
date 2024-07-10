import z from "zod";

export const signUpSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string().optional()
});

export const signInSchema = z.object({
    email: z.string(),
    password: z.string()
});

export const createBlogSchema = z.object({
    title: z.string(),
    content: z.string()
});

export const updateBlogSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export type SignUpType = z.infer<typeof signUpSchema>;
export type SingInType = z.infer<typeof signInSchema>;
export type CreateBlogType = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;