import { GetStaticPaths } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Context } from 'react'

declare interface IPostDetailProps {
  id: number
  name: String
  username: String,
  email?: String,
  address?: Object[]
  phone?: String
}

export default function PostDetail({ post }: any) {
  const router = useRouter();
  return (
    <>
      <div className="post-detail">
        <h1>Post Detail Page</h1>
        <h2>Name: {post.name}</h2>
        <div>Username: {post.username}</div>
        <div>Phone: {post.phone}</div>
        <div>Website: <a href="">{post.website}</a></div>
      </div>
      
      <Link href="/posts"><button>Go back</button></Link>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  const paths = data.map((post: { id: { toString: () => any } }) => {
    return {
      params: { id: post.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

declare type TContext = {
  params: { id: any }
}

export const getStaticProps = async (context: TContext) => {
  const id = context.params.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
  const post: IPostDetailProps = await res.json();

  return { 
    props: { post }
  }
}