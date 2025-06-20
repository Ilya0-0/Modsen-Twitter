import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';

import Image from 'next/image';

import useNotifications from '~/hooks/useNotifications';
import ImageIcon from '~/public/svg/image.svg';

import { FileData } from '../AddTweetForm';
import styles from './styles.module.scss';

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_IMAGES = 5;
const ACCEPTED_TYPES = ['image/webp', 'image/jpeg', 'image/png'];

interface TweetImageManagerProps {
  images: FileData[];
  setImages: Dispatch<SetStateAction<FileData[]>>;
}

const TweetImageManager = ({ images, setImages }: TweetImageManagerProps) => {
  const { notifyError } = useNotifications();

  const generateUniqueId = (() => {
    let id = (images.at(-1)?.id || 0) + 1;
    return () => {
      return id++;
    };
  })();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = MAX_IMAGES - images.length;
    if (remainingSlots === 0) {
      notifyError(
        'Error image upload',
        `Maximum ${MAX_IMAGES} images allowed.`
      );
      return;
    }

    const newImages = [...images];
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        notifyError(
          'Error image upload',
          `File ${file.name} exceeds 15 MB limit.`
        );
        return;
      }

      if (!ACCEPTED_TYPES.includes(file.type)) {
        notifyError(
          'Error image upload',
          `Unsupported file type for ${file.name}. Use .webp, .jpg, .jpeg, or .png.`
        );
        return;
      }

      newImages.push({ file: file, id: generateUniqueId() });
    });

    setImages(newImages);
    e.target.value = '';
  };

  const handleImageDelete = (index: number) => (e: MouseEvent) => {
    e.stopPropagation();
    setImages(images.filter(({ id }) => id !== index));
  };

  return (
    <div className={styles.imageContainer}>
      <label
        className={`${styles.tweetImage} ${styles.addImage}`}
        aria-label="add image to tweet"
      >
        <ImageIcon />
        <input
          type="file"
          accept=".webp,.jpg,.jpeg,.png"
          onChange={handleImageUpload}
          multiple
          className={styles.fileInput}
        />
      </label>
      <div className={styles.images}>
        {images.map(({ file, id }) => (
          <button
            key={id}
            onClick={handleImageDelete(id)}
            className={styles.tweetImage}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              fill
              className={styles.imagePreview}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TweetImageManager;
