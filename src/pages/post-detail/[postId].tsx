import React from 'react';
import { instance } from '../api/instance';

interface Params {
  postId: string;
}

interface Post {
  id: number;
  content: string;
  author: { name: string };
}

export async function getStaticPaths() {
  const response = await instance.get('posts');
  const posts = response.data.data;

  const paths = posts.map((post: { id: number }) => ({
    params: { postId: post.id.toString() },
  }));

  return { paths, fallback: false }; // fallback: false để trả về 404 nếu không tìm thấy
}

// Lấy dữ liệu cho từng bài viết khi build
export async function getStaticProps({ params }: { params: Params }) {
  const { postId } = params;

  const response = await instance.get(`posts/${postId}`);
  const post: Post = response.data.data;

  return {
    props: {
      post,
    },
  };
}

// Component hiển thị chi tiết bài viết
const PostDetailPage = ({ post }: { post: Post }) => {
  return (
    <div>
      <p><strong>Tác giả:</strong> {post.author.name}</p>
      <h1>Nội dung: {post.content}</h1>
    </div>
  );
};

export default PostDetailPage;