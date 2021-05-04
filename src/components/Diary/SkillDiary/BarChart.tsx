import React from 'react';

import defIconSrc from '~/styles/alphabet_icons/ic_ak.svg';

import DataElem from '~/constants/dataElemType';

const BarChart: React.FC<{
  data: DataElem[];
  className?: string;
  countAcc?: Function;
  titleAcc?: Function;
  imgAcc?: Function;
  style?: React.CSSProperties;
  onClick?: Function;
  selectedId?: string;
  sumAcc: Function;
}> = props => {
  const {
    data,
    className,
    countAcc = (d: DataElem): number => d.count,
    titleAcc = (d: DataElem): string => d.title,
    imgAcc = (d: DataElem): string => d.img.url,
    style,
    onClick = (d: DataElem): DataElem => d,
    selectedId,
    sumAcc,
    cards
  } = props;

  const allTags = cards
    .map(d => d.topics?.value || null)
    .flat()
    .filter(d => d);

  const getAllPs = (did: string) =>
    allTags
      .filter(e => e.id === did)
      .reduce((acc: number, d: any) => acc + d.points, 0);

  const percent = (d: DataElem): number =>
    (countAcc(d) * 100) / getAllPs(d.id);

  return (
    <div className={className} style={style}>
      {data.map((d: DataElem) => (
        <div className="mb-2 flex-grow">
          <div
            className="flex items-center mt-1 text-base"
            onClick={(): void => onClick(d)}>
            <div
              className="mr-2 text-sm"
              style={{
                minHeight: '3rem',
                minWidth: '3rem',
                background: `url(${imgAcc(d) || defIconSrc})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
            <button
              type="button"
              className={`border-2 border-black bg-yellow-400 h-12 flex items-center ${selectedId &&
                selectedId === d.id &&
                'text-white bg-black'} `}
              style={{
                width: `${percent(d)}%`
              }}>
              {percent(d) > 40 && (
                <div className="p-1 flex flex-grow break-words justify-between">
                  <div className="text-truncate ">{titleAcc(d)}</div>
                  <div>
                    {countAcc(d)}XP/{getAllPs(d.id)}XP
                  </div>
                </div>
              )}
            </button>
            {percent(d) <= 40 && (
              <div className="p-1 flex flex-wrap break-words  flex-grow text-truncate">
                <div className="truncate mr-1">{titleAcc(d)}</div>
                <div>
                  {countAcc(d)}XP/{getAllPs(d.id)}XP
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default BarChart;
