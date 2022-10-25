import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter();

  const goToDetailPage = () => {
    router.push({
      pathname: '/posts/[postId]',
      query: {
        postId: 123,
        ref: 'social'
      }
    })
  }

  return (
    <div className={styles.container}>
      <h1>This is HomePage</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias veniam molestias magni optio quae velit delectus odit ea repellat quis veritatis sit quod magnam aperiam laboriosam ullam, quibusdam, cupiditate in similique. Debitis corporis accusantium soluta incidunt consequuntur. Vel deleniti officiis eaque omnis, minus nemo numquam ducimus possimus adipisci distinctio illo dolor doloremque eius molestias delectus aliquam esse sint placeat accusamus ipsam atque, exercitationem provident obcaecati consequatur! Cumque quod voluptates dignissimos, iste magnam sed provident obcaecati id quidem sequi incidunt voluptatem enim, officiis quasi pariatur perferendis suscipit quo esse, nostrum vero? Tempore quae cum earum laudantium ipsa dolores at voluptate. Vel?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias veniam molestias magni optio quae velit delectus odit ea repellat quis veritatis sit quod magnam aperiam laboriosam ullam, quibusdam, cupiditate in similique. Debitis corporis accusantium soluta incidunt consequuntur. Vel deleniti officiis eaque omnis, minus nemo numquam ducimus possimus adipisci distinctio illo dolor doloremque eius molestias delectus aliquam esse sint placeat accusamus ipsam atque, exercitationem provident obcaecati consequatur! Cumque quod voluptates dignissimos, iste magnam sed provident obcaecati id quidem sequi incidunt voluptatem enim, officiis quasi pariatur perferendis suscipit quo esse, nostrum vero? Tempore quae cum earum laudantium ipsa dolores at voluptate. Vel?</p>
    </div>
  )
}

export default Home
