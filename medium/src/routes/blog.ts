import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { createBlogSchema, updateBlogSchema } from "@jayant100x/medium-comman";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if(user){
            c.set("userId", String(user.id))
            await next();
        } 
        else{
            c.status(411);
            return c.json({
                msg: "You are not logged in"
            })
        }
    } catch (error) {
        c.status(403);
        c.json({
            msg: "You not logged in"
        })
    }
})

blogRouter.post('/', async (c) => {
    const {title, content} = await c.req.json();
    const {success} = createBlogSchema.safeParse({title, content});
    if(!success){
        c.status(403);
        return c.json({
          msg: "Invalid Inputs"
        })
      }
    const userId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId: userId
            }
        });
    
        c.status(200);
        return c.json({
            msg: "blog created",
            id: blog.id
        })
    }
    catch(err){
        c.status(400);
        return c.json({
            msg: "Unexxpected error"
        })
    }
})
  
blogRouter.put('/', async (c) => {
    const {id, title, content} = await c.req.json();
    const {success} = updateBlogSchema.safeParse({id, title, content});
    if(!success){
        c.status(403);
        return c.json({
          msg: "Invalid Inputs"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.blog.update({
            where: {
                id
            },
            data: {
                title,
                content
            }
        });
    
        c.status(200);
        return c.json({
            msg: "blog updated",
            id: blog.id
        })
    }
    catch(err){
        c.status(400);
        return c.json({
            msg: "Unexxpected error"
        })
    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const blogs = await prisma.blog.findMany();
        c.status(200);
        return c.json({
            blogs
        });
    }
    catch(err){
        c.status(400);
        return c.json({
            msg: "Unexxpected error"
        })
    }
})
  
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.blog.findUnique({
            where: {
                id
            }
        });
        c.status(200);
        return c.json({
            blog
        });
    }
    catch(err){
        c.status(400);
        return c.json({
            msg: "Unexxpected error"
        })
    }
})
  