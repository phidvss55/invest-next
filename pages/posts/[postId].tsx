import { useRouter } from 'next/router'
import React, { Component } from 'react'

export interface IPostDetailProps {}

export default function PostDetail(props: IPostDetailProps) {
  const router = useRouter();
  console.log('router', router);
  console.log('query', router.query);

  return <div>Post Detail page</div>
}