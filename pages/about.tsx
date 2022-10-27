import Head from 'next/head';
import * as React from 'react';

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
  return (
    <>
      <Head>
        <title>Ninja List | Meta Heading</title>
        <meta lang="en" />
      </Head>
      
      <div>About Page</div>
    </>
  )
}

export function getServerSideProps() {
  return {
    props: {} // will be passed to the page component as props
  }
}
