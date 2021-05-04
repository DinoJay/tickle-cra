import React, { useState, useEffect } from 'react';
import uuidv1 from 'uuid/v1';

import Plus from 'react-feather/dist/icons/plus';
import Minimize from 'react-feather/dist/icons/minimize';
import Maximize from 'react-feather/dist/icons/maximize';

import { addToStorage, removeFromStorage } from '~/firebase/db';
import { Img } from '~/constants/typeUtils';
// import useDeepCompareMemoize from '~/components/utils/useDeepCompareMemoize';

import useMemoize from '~/components/utils/useMemoize';
import ThreeDots from '~/components/utils/ThreeDots';

// const compress = new Compress();
// function compress(f: FileList): Promise<File> {
//   const fileName = f[0].name;

//   const reader: FileReader = new FileReader();
//   reader.readAsDataURL(f[0]);
//   return new Promise(
//     (resolve, reject): void => {
//       // TODO: fix later
//       reader.onload = (e: Event | any): void => {
//         const img = new Image();
//         img.src = e.target.result;
//         img.onload = (): void => {
//           const elem = document.createElement('canvas');
//           const { height, width } = img;
//           elem.width = width;
//           elem.height = height;
//           // const scaleFactor = width / img.width;
//           elem.height = img.height; //* scaleFactor;

//           const ctx = elem && elem.getContext('2d');
//           // img.width and img.height will contain the original dimensions
//           if (ctx) {
//             ctx.drawImage(img, 0, 0, width, height);
//             ctx.canvas.toBlob(
//               blob => {
//                 if (blob) {
//                   const file = new File([blob], fileName, {
//                     type: 'image/jpeg',
//                     lastModified: Date.now()
//                   });
//                   resolve(file);
//                 } else reject(new Error('blob null or undefined'));
//               },
//               'image/jpeg',
//               // quality
//               0.4
//             );
//           }
//         },
//           (reader.onerror = (error): void => reject(error));
//       };
//     }
//   );
// }

export const PhotoUpload: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  onChange: Function;
  id?: string | null;
  onLoadChange?: Function;
  uploadBtn?: React.ReactNode;
  sizeBtn?: React.ReactNode;
  folder?: string;
}> = props => {
  const {
    className,
    style,
    onChange,
    id,
    folder,
    onLoadChange = (): null => null,
    uploadBtn,
    sizeBtn
  } = props;

  const oldId = useMemoize(id) as string;

  const makePath = (newId: string): string =>
    `${folder || 'img'}/${newId}`;

  useEffect(() => {
    if (id !== null && oldId !== null && id !== oldId) {
      const oldPath = makePath(oldId);
      removeFromStorage(oldPath).then(() =>
        console.info('remove img success', oldPath)
      );
    }
  }, [id]);

  // TODO hack
  const k = uuidv1();

  return (
    <>
      <label
        htmlFor={`file-upload${k}`}
        className={`${className} `}
        style={style}>
        {uploadBtn && <div>{uploadBtn}</div>}
      </label>
      {sizeBtn}
      <input
        id={`file-upload${k}`}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          onLoadChange(true);
          // const files = [...e.target.files];
          const fileList: FileList | null = e.target.files;
          const file = fileList instanceof FileList && fileList[0];
          // TODO do a type for different file types
          if (!fileList || !file) return;
          const { name } = file;

          // console.log('data', data);
          // const file = Compress.convertBase64ToFile(
          //   base64str,
          //   imgExt
          // );
          const newId = uuidv1();

          addToStorage({ file, path: makePath(newId) }).then(
            newUrl => {
              onLoadChange(false);
              onChange({
                url: newUrl,
                name,
                id: newId
              });
            }
          );
        }}
      />
    </>
  );
};

// type ImgType = {
//   url: string;
//   id: string;
//   name: string;
//   contain: boolean;
// };

export const PhotoPreview: React.FC<{
  url?: string | null;
  style?: React.CSSProperties;
  onChange: (a: Img) => any;
  className?: string;
  name?: string;
  edit?: boolean;
  shrinkable?: boolean;
  uploadBtn?: React.ReactNode;
  contain?: boolean;
}> = props => {
  const {
    url,
    style,
    onChange,
    className,
    name = 'defaultName',
    // id,
    // title,
    shrinkable = true,
    edit,
    contain = false
  } = props;

  const [loading, setLoading] = useState(false);

  const imgConf = url
    ? {
      backgroundImage: `url(${url}) `,
      backgroundSize: contain ? 'contain' : 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
    : {};

  return (
    <div
      className={`flex-grow relative border-2 flex flex-col justify-center items-center text-muted ${className}`}
      style={{ ...style, ...imgConf }}>
      {!url && (
        <div className="pointer-events-none flex items-center justify-center absolute h-full w-full text-gray-700 text-xl uppercase">
          <div>{loading ? <ThreeDots /> : 'No Img selected'}</div>
        </div>
      )}
      {edit && (
        <PhotoUpload
          className="flex-grow"
          uploadBtn={
            <>
              <div className="absolute right-0 bottom-0 triangle-right border-right-black" />
              <div className="absolute right-0 bottom-0 text-white mr-2 mb-2 text-4xl">
                <Plus color="white" />
              </div>
            </>
          }
          sizeBtn={
            <button
              type="button"
              onClick={() =>
                url &&
                // name &&
                // id &&
                onChange({
                  url,
                  name,
                  id: url,
                  contain: !contain
                })
              }>
              {
                (shrinkable && (
                  <div className="absolute left-0 bottom-0 triangle-left border-left-black" />
                ))}

              <div className="absolute left-0 bottom-0 text-white ml-2 mb-2 text-4xl">
                {shrinkable && contain && <Maximize color="white" />}
                {shrinkable && !contain && <Minimize color="white" />}
              </div>
            </button>
          }
          onChange={({ url: newUrl, name, id: newId }: Img): void => {
            onChange({ id: newId, url: newUrl, name, contain });
          }}
          onLoadChange={setLoading || undefined}
        />
      )}
    </div>
  );
};

export default PhotoPreview;
