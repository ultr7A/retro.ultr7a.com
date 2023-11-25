import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Exhibit, { ExhibitProps } from "../components/Exhibit"

import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.exhibit.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: ExhibitProps[]
}

const Museum: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>R E T R O 🌈 🌒 .ultr7a.com</h1>
        <p className="featured">
          Under the wolf-moon's silvery glow, the landscape transforms into a dreamscape.  
        </p>
        <p className="featured">
          The celestial dance illuminates the tapestry of the night.
        </p>
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

        .featured {
          font-size: 36px;
        }

        h1 {
          font-size:4.5em;
        }
      `}</style>
    </Layout>
  )
}

export default Museum
