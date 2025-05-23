import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { instance } from '../api/instance';

type User = {
  id: number;
  name: string;
  avatars?: { id: number; url: string; createdAt: Date; updatedAt: Date }[];
};

type POST = {
  _count: {
    Like: number;
    Comment: number;
  };
  author: User;
  liked: boolean;
  id: number;
  authorId: number;
  content?: string;
  images?: { id: number; url: string; postId: number }[];
  createdAt: Date;
};

export async function getServerSideProps() {
  const response = await instance.get('posts');
  const posts = response.data.data;

  return {
    props: {
      posts,
    },
  };
}

const Page = ({ posts }: { posts: POST[] }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Danh sách bài viết</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map((post: POST) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <p><strong>Tác giả:</strong> {post.author.name}</p>
            <p>{post.content}</p>
            {post.images && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {post.images.slice(0, 3).map((image) => (
                  <Link key={image.id} href={`/post-detail/${post.id}`}>
                    <div className="relative cursor-pointer" style={{ width: '100px', height: '100px' }}>
                      <Image
                        src={image.url}
                        alt={`Image ${image.id}`}
                        width={100}
                        height={100}
                        layout="fixed"
                        className="rounded-md"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;