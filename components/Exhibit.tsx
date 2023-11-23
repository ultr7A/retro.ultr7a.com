import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ExhibitProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Exhibit: React.FC<{ exhibit: ExhibitProps }> = ({ exhibit }) => {
  const authorName = exhibit.author ? exhibit.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${exhibit.id}`)}>
      <h2>{exhibit.title}</h2>
      <small></small>
      <ReactMarkdown children={exhibit.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Exhibit;
