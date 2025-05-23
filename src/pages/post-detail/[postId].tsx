interface Params {
  postId: string;
}

interface Author {
  name: string;
}

interface Post {
  id: number;
  content: string;
  author: Author;
}

const mockData: Post[] = [
  {
    id: 1,
    content: "Đây là bài viết đầu tiên!!",
    author: { name: "Đặng Xuân Điệp" },
  },
  {
    id: 2,
    content: "Đây là bài viết thứ hai22",
    author: { name: "Đặng Xuân Điệp 22" },
  },
];

export async function getStaticPaths() {
  const paths = mockData.map((post) => ({
    params: { postId: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: Params }) {
  const { postId } = params;

  const foundPost = mockData.find((e) => e.id === Number(postId));

  if (!foundPost) {
    return { notFound: true };
  }

  const post: Post = foundPost;

  return {
    props: {
      post,
    },
  };
}

const PostDetailPage = ({ post }: { post: Post }) => {
  return (
    <div>
      <p>
        <strong>Tác giả:</strong> {post.author.name}
      </p>
      <h1>Nội dung: {post.content}</h1>
    </div>
  );
};

export default PostDetailPage;
