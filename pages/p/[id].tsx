import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { ExhibitProps } from "../../components/Exhibit"

import prisma from '../../lib/prisma';
import { Router } from "next/router"
import { useSession } from "next-auth/react"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const exhibit = await prisma.exhibit.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: exhibit,
  };
};

async function publishExhibit(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deleteExhibit(id: string): Promise<void> {
  await fetch(`/api/exhibit/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Exhibit: React.FC<ExhibitProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishExhibit(props.id)}>Publish</button>
        )}
        {
          userHasValidSession && postBelongsToUser && (
            <button onClick={() => deleteExhibit(props.id)}>Delete</button>
          )
        }
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
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
      `}</style>
    </Layout>
  );
}

export default Exhibit
