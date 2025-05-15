import PageBanner from '@/components/main/common/PageBanner';
import MainLayout from '@/components/main/layout';
import { useGetSingleBlogQuery } from '@/slice/services/public/blogs/publicBlogsServices';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default function SingleBlog() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: singleBlogData } = useGetSingleBlogQuery(slug);

  return (
    <MainLayout>
      <PageBanner
        title={singleBlogData?.data?.title}
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />
      <section className="blog-details">
        <div className="container">
          <div className="blog-details-content">
            <div className="blog-img">
              <Image
                src={
                  singleBlogData?.data?.image?.url
                    ? singleBlogData?.data?.image?.url
                    : ''
                }
                width={1000}
                height={550}
                alt={
                  singleBlogData?.data?.title
                    ? singleBlogData?.data?.title
                    : 'Featured Image'
                }
              />
            </div>
            <h2>
              {singleBlogData?.data?.title ? singleBlogData?.data?.title : ''}
            </h2>
            <div
              className="single-blog-description editor-container"
              dangerouslySetInnerHTML={{
                __html: singleBlogData?.data?.description || '',
              }}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
