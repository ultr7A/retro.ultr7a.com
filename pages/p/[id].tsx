import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { ExhibitProps } from "../../components/Exhibit"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = {
    id: "1",
    title: "The cosmic dance illuminates the tapestry of the night.",
    content:`
    In a mystical realm where disco wizards unravel cosmic blizzards, a vinyl vineyard emerges, brewing tea dreams with a rhythmic regard. 
    Quantum dreamers ride waves in the stellar gleamer, 
    while neon alchemists cast spells with a neon sheen. 
    
    "I'm baby," declares a voice from the lunar crooner, 
    singing lullabies to the lunar swooner. 
    
    Galactic baristas craft elixirs in the cosmic vista, 
    offering a cup to a passerby who whispers an esoteric truth about akashic records. 
    
    Synthetic mystics decode tales in the starry cryptic, 
    and crystal nomads project holographs, creating a cosmic fad. 
    Vinyl enchantresses cast sonatas in astral oneness, while retro explorers navigate paths as stellar saviors. Mystic cassette oracles divine tunes with vintage floral, and aetheric nomads blend harmonies in the celestial squad. 
    
    As the cosmic adventure unfolds, the declaration of "I'm baby" echoes as a charming refrain, woven into ethereal whispers that resonate with the mysteries of the universe. Under the wolf-moon's silvery glow, the landscape transforms into a dreamscape.  The celestial dance illuminates the tapestry of the night.`,
    published: false,
    author: {
      name: "J. R. Evans",
      email: "ultr7a@gmail.com",
    },
  }
  return {
    props: post,
  }
}

const Exhibit: React.FC<ExhibitProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "I'm Baby Chillwave Wolf Moon"}</p>
        <ReactMarkdown children={props.content} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }

        code {
          overflow-wrap: normal;
          text-wrap: pretty;
          max-width: 800px;
          display: inline-block;
        }
      `}</style>
    </Layout>
  )
}

export default Exhibit
