import React, { useState } from 'react';

import { VIDEOS, VideoField } from '~/constants/cardFields';
import { ModalBody, ModalProps } from '~/components/utils/Modal';

import TabSlider from '~/components/utils/TabSlider';

import PreviewFrame from './PreviewFrame';

import {
  MediaSearch,
  MediaOverview,
  EditMediaOverview
} from './MediaSearch';

export type Video = {
  id: string;
  thumbnail: string;
  title: string;
  descr: string;
  url: string;
  onClick: Function;
};

const YOUTUBE = 'youtube';

// const OAUTH2_CLIENT_ID = process.env!.GoogleOAuth;
// const OAUTH2_SCOPES = ['https://www.googleapis.com/auth/youtube'];

const youtubeSearchUrl = ({
  part,
  q,
  type,
  maxResults,
  order
}: {
  part: string;
  q: string;
  type: string;
  maxResults: number;
  order: string;
}) =>
  `https://www.googleapis.com/youtube/v3/search?part=${part}&safeSearch=strict&q=${q}&type=${type}&maxResult=${maxResults}&order=${order}&key=${process.env.youtube}`;

const youtubeVideoUrl = ({
  part,
  id,
  maxResults
}: {
  part: string;
  id: string;
  maxResults: number;
}) =>
  `https://www.googleapis.com/youtube/v3/videos?part=${part}&id=${id}&maxResult=${maxResults}&key=${process.env.youtube}`;

/* global gapi */
// const googleAuthorize = (callback, onError = d => d) => {
//   gapi.auth.authorize(
//     {
//       client_id: OAUTH2_CLIENT_ID,
//       scope: OAUTH2_SCOPES,
//       immediate: true
//     },
//     authResult => {
//       if (authResult && !authResult.error) {
//         callback(authResult);
//       } else {
//         onError(authResult);
//       }
//     }
//   );
// };

const searchYoutube = (q = '') =>
  new Promise(resolve =>
    fetch(
      youtubeSearchUrl({
        part: 'snippet',
        q: q && q !== '' ? q : 'brussels',
        type: 'video',
        maxResults: 20,
        order: 'viewCount'
        // publishedAfter: '2015-01-01T00:00:00Z'
      })
    )
      .then(res => res.json())
      .then(({ items }: { items: any[] }) => {
        const res = items.map((d: any) => ({
          // url2: `http://www.youtube.com/embed/${d.id.videoId}`,
          url: `https://www.youtube.com/watch?v=${d.id.videoId}`,
          id: d.id.videoId,
          title: d.snippet.title,
          descr: d.snippet.description,
          thumbnail: d.snippet.thumbnails.medium.url,
          source: YOUTUBE,
          type: VIDEOS
        }));
        resolve(res);
      })
  );

const youtubeVideoIdFn = (id = '') => {
  const url = youtubeVideoUrl({
    part: 'snippet',
    id,
    maxResults: 20
    // publishedAfter: '2015-01-01T00:00:00Z'
  });

  return fetch(url)
    .then(res => res.json())
    .then(response => {
      console.log('response', response);
      return response.items.map((d: any) => ({
        // url2: `http://www.youtube.com/embed/${d.id.videoId}`,
        url: `https://www.youtube.com/watch?v=${d.id}`,
        id: d.id,
        title: d.snippet.title,
        descr: d.snippet.description,
        thumbnail: d.snippet.thumbnails.medium.url,
        source: YOUTUBE,
        type: VIDEOS
      }));
    });
};

//
// function SignInGoogleButton(props) {
//   const {className, children, style, onSignIn, onError} = props;
//   const [error, setError] = useState(false);
//
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://apis.google.com/js/client.js ';
//
//     script.onload = () => {
//       gapi.load('auth2', () => {
//         gapi.auth.init(function() {
//           googleAuthorize(onSignIn, () => setError(true));
//         });
//       });
//     };
//     document.body.appendChild(script);
//     return () => script.parentNode.removeChild(script);
//   }, []);
//
//   return (
//     <button
//       type="button"
//       className={className}
//       style={style}
//       onClick={() => googleAuthorize(onSignIn)}>
//       {error ? 'Click to authenticate' : 'loading...'}
//     </button>
//   );
// }

// const searchYoutube = (q = 'brussels') =>
//   new Promise(resolve =>
//     gapi.client.load('youtube', 'v3', function() {
//       const request = gapi.client.youtube.search
//         .list({
//           q: q && q !== '' ? q : 'brussels',
//           part: 'snippet'
//         })
//         .execute(function(response) {
//           resolve(
//             response.items.map(d => ({
//               // url2: `http://www.youtube.com/embed/${d.id.videoId}`,
//               url: `https://www.youtube.com/watch?v=${d.id.videoId}`,
//               id: d.id.videoId,
//               title: d.snippet.title,
//               descr: d.snippet.description,
//               thumbnail: d.snippet.thumbnails.medium.url,
//               source: YOUTUBE,
//               type: VIDEOS
//             }))
//           );
//         });
//     })
//   );

export const VideoPreview: React.FC<Video> = ({
  // thumbnail,
  title,
  // descr,
  url
  // onClick
}) => {
  const videoUrl = new URL(url);
  const videoId = videoUrl.searchParams.get('v');

  return (
    <div className="w-full">
      <iframe
        width="100%"
        height="300"
        title={title}
        src={`https://www.youtube.com/embed/${videoId}`}
      />

      {/* <h2 className="truncate-text mb-2">
        <NewTabLink href={url}>{title}</NewTabLink>
      </h2>
      <div
        className="w-full h-32"
        onClick={onClick}
        style={{
          backgroundImage: `url(${thumbnail}) `,
          minHeight: 300,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      /> */}
    </div>
  );
};

export const key = VIDEOS;
export const label = 'Videos';

const EditMedia: React.FC<{
  onChange: Function;
  placeholder: string;
  Element: any;
  videos: VideoField;
}> = props => {
  const { videos, onChange } = props;
  const [tabIndex, setTabIndex] = useState<number>(0);

  const btnClassName = (i: number) =>
    `btn flex-grow p-2 border text-base m-1 ${tabIndex === i &&
    'btn-active'}`;

  const updateData = (vds: Video[]) =>
    onChange({ key, label, value: vds });

  const selectedData = (videos && videos.value) || [];

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-shrink-0">
        <button
          type="button"
          className={btnClassName(0)}
          onClick={() => setTabIndex(0)}>
          Search
        </button>
        <button
          type="button"
          className={btnClassName(1)}
          onClick={() => setTabIndex(1)}>
          Overview
        </button>
      </div>
      <TabSlider
        visibleIndex={tabIndex}
        className="flex flex-col flex-grow">
        <MediaSearch
          {...props}
          searchFn={searchYoutube}
          selectedData={selectedData}
          onChange={updateData}
          Element={VideoPreview}
        />
        <EditMediaOverview
          className="flex-grow overflow-y-auto"
          {...props}
          data={selectedData}
          onChange={updateData}
          videoIdFn={youtubeVideoIdFn}
          Element={VideoPreview}
        />
      </TabSlider>
    </div>
  );
};

export const ModalContent: React.FC<{
  modalProps: ModalProps;
  disabled: boolean;
  videos: VideoField;
  onChange: Function;
}> = props => {
  const { modalProps, disabled, videos, onChange } = props;

  return (
    <ModalBody {...modalProps} className="flex flex-col flex-grow">
      {disabled ? (
        <MediaOverview
          {...props}
          data={videos.value || []}
          Element={VideoPreview}
        />
      ) : (
          <EditMedia
            {...props}
            onChange={onChange}
            placeholder="No Video added!"
            Element={VideoPreview}
          />
        )}
    </ModalBody>
  );
};

export const Preview: React.FC<{
  onClick: Function;
  videos: VideoField;
}> = ({ onClick, videos }) => {
  const numVideos = videos.value !== null ? videos.value.length : 0;
  const text = () => `${numVideos} Video${numVideos > 1 ? 's' : ''}`;

  return (
    <PreviewFrame
      onClick={onClick}
      empty={videos.value === null || videos.value.length === 0}
      type="Video"
      placeholder="No Video"
      content={() => text()}
    />
  );
};

export const View: React.FC<{
  onClose: Function;
  videos: VideoField;
  modalProps: any
}> = ({ videos, modalProps }) => (
  <ModalBody
    className="flex-grow"
    onClose={modalProps.onClose}
    title="Videos">
    <div className="overflow-y-auto flex-1-1-0">
      {videos &&
        videos.value &&
        videos.value.map(v => <VideoPreview {...v} />)}
    </div>
  </ModalBody>
);
