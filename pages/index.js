import AppLayout from '@/components/app-layout/AppLayout';
import { useState } from 'react';
import {
  booksListRead,
  booksListReading,
  booksListWantToRead,
} from '@/constants/mockData';
import BookCard from '@/components/book-card/BookCard';

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const changeTabs = (index) => {
    if (selectedIndex === index) return;
    setSelectedIndex(index);
  };

  return (
    <div className="w-full h-full">
      <ul className="flex justify-center items-center">
        <li className="mr-2">
          <div
            onClick={() => changeTabs(0)}
            aria-current="page"
            className={`inline-block  text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center cursor-pointer ${
              selectedIndex === 0
                ? 'active dark:bg-gray-800 dark:text-gray-200'
                : 'dark:text-gray-500  dark:hover:bg-gray-800 dark:hover:text-gray-300'
            } `}
          >
            Want to read
          </div>
        </li>
        <li className="mr-2">
          <div
            onClick={() => changeTabs(1)}
            className={`inline-block  text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center cursor-pointer ${
              selectedIndex === 1
                ? 'active dark:bg-gray-800 dark:text-gray-200'
                : 'dark:text-gray-500  dark:hover:bg-gray-800 dark:hover:text-gray-300'
            } `}
          >
            Reading
          </div>
        </li>
        <li className="mr-2">
          <div
            onClick={() => changeTabs(2)}
            className={`inline-block  text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center cursor-pointer ${
              selectedIndex === 2
                ? 'active dark:bg-gray-800 dark:text-gray-200'
                : 'dark:text-gray-500  dark:hover:bg-gray-800 dark:hover:text-gray-300'
            } `}
          >
            Read
          </div>
        </li>
      </ul>
      <div className={`flex flex-row flex-wrap gap-10 m-10`}>
        {selectedIndex === 0
          ? booksListWantToRead.map((book, index) => (
              <BookCard key={index} book={book} />
            ))
          : selectedIndex === 1
          ? booksListReading.map((book, index) => (
              <BookCard key={index} book={book} />
            ))
          : booksListRead.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Home;
