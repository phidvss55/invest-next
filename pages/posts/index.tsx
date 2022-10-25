import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import React from 'react'

declare type Post = {
  id: number | string
  name: String
  username: String,
  email?: String,
  address?: Object[]
  phone?: String
}

export interface IPostProps {
  posts: Post[]
}

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>All Posts</h1>
      <div className="grid">
          {posts.map((post: Post) => (
            <Link key={post.id} href={'/posts/' + post.id}>
              <ul className="list-post">
                <li>{post.name}</li>
                <li>{post.email}</li>
                <li>{post.phone}</li>
              </ul>
          </Link>
          ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const posts = await res.json();

  return { 
    props: { posts }
  }
}

export default Posts;