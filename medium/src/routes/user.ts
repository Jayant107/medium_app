import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { signUpSchema, signInSchema } from "@jayant100x/medium-comman"

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string
    }
  }>();

userRouter.post('/signup', async (c) => {
    const {email, password, name} = await c.req.json();
    const { success } = signUpSchema.safeParse({email, password, name});
    if(!success){
      c.status(403);
      return c.json({
        msg: "Invalid Inputs"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try{
      const user = await prisma.user.create({
        data: {
          email: email,
          password: password,
          name: name
        }
      })
      const token = await sign({id: user.id}, c.env.JWT_SECRET);
      c.status(200)
      return c.json({
        msg: "user created",
        token
      })
    }catch(err){
      console.log(err);
      c.status(411);
      return c.json({
        msg: "Unexpected error"
      })
    }
})
  
userRouter.post('/signin', async (c) => {
    const {email, password} = await c.req.json();
    const { success } = signInSchema.safeParse({email, password});
    if(!success){
      c.status(403);
      return c.json({
        msg: "Invalid Inputs"
      })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                password: password
            }
        })
        if(!user){
            c.status(403);
            return c.json({
                msg: "Unauthorized"
            })
        }
        const token = await sign({id: user.id}, c.env.JWT_SECRET);
        c.status(200);
        return c.json({
            msg: "user signed in",
            token
        })
    }catch(err){
        console.log(err);
        c.status(411);
        return c.json({
            msg: "Unexpected error"
        })
    }
})
