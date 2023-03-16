import { ImageType } from '@lens-protocol/react-web';
import { useRef, useEffect, useCallback } from 'react';

import { never } from '../utils';

export interface ILocalFile<T extends ImageType> extends File {
  type: T;
}

export interface ILocalFileList<T extends ImageType> extends FileList {
  item(index: number): ILocalFile<T> | null;
  [index: number]: ILocalFile<T>;
}

type UseFileSelectParams<T extends ImageType> = {
  onSelect: (files: ILocalFileList<T>) => void;
  onCancel?: () => void;
  accept: ReadonlyArray<T>;
  multiple?: boolean;
};

export function useFileSelect<T extends ImageType>({
  accept,
  multiple = false,
  onSelect,
  onCancel,
}: UseFileSelectParams<T>) {
  const input = useRef<HTMLInputElement>();

  useEffect(() => {
    input.current = document.createElement('input');
    input.current.type = 'file';
    input.current.style.display = 'none';
    input.current.dataset.testid = 'fileInput';
    document.body.appendChild(input.current);

    return () => {
      input.current && document.body.removeChild(input.current);
    };
  }, []);

  useEffect(() => {
    if (input.current) {
      input.current.accept = accept.join(',');
      input.current.multiple = multiple;
    }
  }, [accept, multiple]);

  useEffect(() => {
    const onWindowFocus: EventListener = () => {
      onCancel?.call(null);
    };

    window.addEventListener('focus', onWindowFocus);
    return () => {
      window.removeEventListener('focus', onWindowFocus);
    };
  }, [onCancel]);

  useEffect(() => {
    const onFileChange: EventListener = () => {
      const files = input.current?.files ?? never();
      onSelect(files as ILocalFileList<T>);
    };

    if (input.current) {
      input.current.addEventListener('change', onFileChange);
    }
    return () => {
      input.current?.removeEventListener('change', onFileChange);
    };
  }, [onSelect]);

  return useCallback(() => {
    if (input.current) {
      input.current.value = '';
      input.current.click();
    }
  }, []);
}
