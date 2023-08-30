import { gql, useQuery, useMutation } from "@apollo/client";

const GET_POSTS = gql`
  query Query {
    getPosts {
      text
    }
  }
`;
const CREATE_POST = gql`
  mutation CreatePost($postCreateInput: PostInput!) {
    createPost(postCreateInput: $postCreateInput)
  }
`;
export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [createPost, createdPost] = useMutation(CREATE_POST);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error : {error.message}</p>;
  }
  console.log(data, createdPost.data);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() =>
            createPost({
              variables: {
                postCreateInput: {
                  text: "123",
                },
              },
            })
          }
        >
          Get posts
        </button>
      </div>
    </>
  );
}
