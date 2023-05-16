import React from 'react';
import { useSelector } from 'react-redux';
import { API_PROCESS } from 'shared/core/services/redux';
import { Post } from 'shared/models/Post';

const PostsList = () => {
  const { data, process } = useSelector((state: any) => state?.commonReducer?.postsController);

  return (
    <div className="container mx-auto p-4 mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {process === API_PROCESS.SUCESS && (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Body
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tags
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    UserId
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Reactions
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.posts.map((post: Post) => (
                  <tr key={post.id}>
                    <td className="max-w-xs py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {post.title}
                    </td>
                    <td className="max-w-sm px-3 py-4 text-sm text-gray-500">{post.body}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.tags.join(', ')}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.userId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {post.reactions}
                    </td>
                  </tr>
                ))}
                {data?.posts.length === 0 && <tr>
                  <td colSpan={5} className="max-w-xs py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <p className="py-4 text-center">No data</p>
                  </td>
                </tr>}
              </tbody>
            </table>
          )}
          {process === API_PROCESS.LOADING && (
            <div className="flex gap-4 justify-center my-8">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
         )}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
