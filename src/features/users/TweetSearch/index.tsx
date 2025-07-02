import { ChangeEvent, startTransition, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PLACEHOLDERS } from '~/constants/placeholders';
import { useDebounce } from '~/hooks/useDebounce';
import SearchInput from '~/shared/ui/Input/variants/SearchInput';
import Loader from '~/shared/ui/Loader';
import StatusMessage from '~/shared/ui/StatusMessage';
import { useSearchTweetsQuery } from '~/store/supabaseApi';

import styles from './styles.module.scss';

const DEBOUNCE_DELAY = 300;
const PLACEHOLDER_WIDTH = 100;
const PLACEHOLDER_HEIGHT = 100;

const TweetSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const deboucedQuery = useDebounce(query, DEBOUNCE_DELAY);

  const {
    data: tweets = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useSearchTweetsQuery(deboucedQuery, {
    skip: !deboucedQuery.trim(),
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClickTweet = (id: string) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();

      startTransition(() => {
        router.push(`/tweet/${id}`);
        setQuery('');
      });
    };
  };

  const renderContent = () => {
    const renderLoader = isFetching || (isLoading && query.trim());
    if (renderLoader) {
      return (
        <div className={styles.postListContainer}>
          <p className={styles.title}>Search results</p>
          <Loader />
        </div>
      );
    }

    if (query && isSuccess) {
      return (
        <div className={styles.postListContainer}>
          <p className={styles.title}>Search results</p>
          {tweets.length > 0 ? (
            <ul className={styles.postList}>
              {tweets.map(({ id, content }) => (
                <Link
                  className={styles.tweetLink}
                  key={id}
                  href={`/tweet/${id}`}
                  onClick={handleClickTweet(id)}
                >
                  <li>
                    <p>{content}</p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <StatusMessage className={styles.fetchStatus}>
              Nothing.
            </StatusMessage>
          )}
        </div>
      );
    }

    return (
      <ul className={styles.placeholder}>
        {PLACEHOLDERS.map(({ id, placeholder }) => (
          <li key={id} className={styles.imageWrapper}>
            <Image
              priority={true}
              src={placeholder}
              width={PLACEHOLDER_WIDTH}
              height={PLACEHOLDER_HEIGHT}
              alt=""
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.container}>
      <section
        className={styles.searchContainer}
        aria-label="search tweets form"
      >
        <SearchInput
          onChange={onChange}
          value={query}
          placeholder="Search Twitter"
        />
      </section>
      {renderContent()}
    </div>
  );
};

export default TweetSearch;
