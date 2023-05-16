import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { searchPosts } from 'stores/api/shared/actions';
import { useDispatch, useSelector } from 'react-redux';
import { API_PROCESS } from 'shared/core/services/redux';

const SearchBox = () => {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const { process } = useSelector((state: any) => state?.commonReducer?.postsController);
  const [showFilter, setShowFilter] = useState<boolean>();
  const allData = watch();

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  const onSubmit = (data: any) => {
    dispatch(searchPosts(data));
  }
  
  useEffect(() => {
    dispatch(searchPosts({q: ''}));
  }, []);

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto p-4">
        <form className="mt-6 sm:max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="flex-1">
              <label htmlFor="q" className="sr-only">
                Find a story
              </label>
              <input
                type="text"
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder="Enter your keywords"
                {...register("q")}
              />
            </div>
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="disabled:opacity-50 flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={API_PROCESS.LOADING === process}
              >
                Search
              </button>
              <button type="button" className="flex gap-1 underline text-white text-sm mt-2" onClick={toggleFilter}>
                Advanced options
                {((allData.tags || allData.reactions || allData.userId) && !showFilter) && <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>}
              </button>
            </div>
          </div>
          {showFilter && (
            <div className="flex gap-4 mt-4 text-white">
              <div className="flex-1">
                <label htmlFor="tags" className="sr-only">
                  Tag
                </label>
                <input
                  type="text"
                  className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                  placeholder="Tag"
                  {...register("tags")}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="userId" className="sr-only">
                  UserId
                </label>
                <input
                  type="text"
                  className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                  placeholder="User Id"
                  {...register("userId")}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="reactions" className="sr-only">
                  Reactions
                </label>
                <input
                  type="text"
                  className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                  placeholder="Reactions"
                  {...register("reactions")}
                />
              </div>
            </div> 
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
