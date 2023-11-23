import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Exhibit, { ExhibitProps } from "../components/Exhibit"

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: "1",
      title: "r e t r o",
      content: "a e s t h e t i c",
      published: false,
      author: {
        name: "J. R. Evans",
        email: "ultr7a@gmail.com",
      },
    },
  ]
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: ExhibitProps[]
}

const Museum: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Artifacts</h1>
        <main>
          {props.feed.map((exhibit) => (
            <div key={exhibit.id} className="post">
              <Exhibit exhibit={exhibit} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .exhibit {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .exhibit:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .exhibit + .exhibit {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Museum
