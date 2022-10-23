import * as React from 'react';

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
  return <div>About Page</div>
}

export function getServerSideProps() {
  return {
    props: {} // will be passed to the page component as props
  }
}
