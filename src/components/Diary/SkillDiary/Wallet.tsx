import React, {useState} from 'react';
import clsx from 'clsx';
import FlexCollapsible from '~/components/utils/FlexCollapsible';

import Reward from '~/constants/rewardType';
import AuthUser from '~/constants/authUserType';

import {BlackModal, ModalBody} from '~/components/utils/Modal';

import PreviewTag from '~/components/utils/PreviewTag';

import TagDetail from '~/components/utils/TagDetail';

const Wallet: React.SFC<{
  open: boolean;
  allRewards: Reward[];
  onClick: Function;
  style?: React.CSSProperties;
  authUser: AuthUser;
  updateAuthUser: Function;
  ownedRewards: Reward[];
  xPoints: number;
  allXpoints: number;
  className?: string;
}> = props => {
  const {
    open,
    allRewards,
    onClick,
    style,
    authUser,
    updateAuthUser,
    ownedRewards,
    xPoints,
    allXpoints
  } = props;

  const {rewardIds: ownedRewardIds = []} = authUser;

  const availableRewards = allRewards.filter(
    r => !ownedRewardIds.includes(r.id)
  );

  const AVAIL = 'affordable';
  const BOUGHT = 'bought';

  const [filterId, setFilterId] = useState(AVAIL);
  const [selectedReward, setReward] = useState<Reward | null>(null);

  const selectedRewards =
    filterId === AVAIL ? availableRewards : ownedRewards;

  const affordable = selectedReward && xPoints > selectedReward.points;

  const owned =
    selectedReward && ownedRewardIds.includes(selectedReward.id);

  const pointsOfSelectedReward =
    selectedReward !== null ? selectedReward.points : null;

  return (
    <>
      <FlexCollapsible
        header="Wallet"
        className="w-full overflow-hidden mb-2"
        open={open}
        onClick={onClick}
        style={style}
        footer={
          <div className="flex flex-grow text-base">
            <div className="flex">
              <button
                type="button"
                className={clsx(
                  `btn border-2 p-1 mr-1 $ `,
                  filterId === AVAIL && 'bg-gray-500 text-white '
                )}
                onClick={(): void => setFilterId(AVAIL)}>
                available ({availableRewards.length})
              </button>
              <button
                type="button"
                className={clsx(
                  `btn border-2 p-1 mr-1 $`,
                  filterId === BOUGHT && 'bg-gray-500 text-white'
                )}
                onClick={(): void => setFilterId(BOUGHT)}>
                Bought ({ownedRewards.length})
              </button>
            </div>
            <div className="ml-auto items-center text-lg font-bold flex flex-wrap">
              <div>{xPoints}/</div>
              <div>{allXpoints}XP</div>
            </div>
          </div>
        }>
        <div className="flex justify-center flex-wrap overflow-y-auto flex-max-grow mb-10">
          {selectedRewards.length === 0 && (
            <div className="m-1 text-xl italic">No Rewards!</div>
          )}
          {selectedRewards.map((r: Reward) => (
            <PreviewTag
              {...r}
              title={r.title}
              points={r.points}
              className="flex-none m-1"
              onClick={(): void => {
                setReward(r);
              }}
            />
          ))}
        </div>
      </FlexCollapsible>
      <BlackModal visible={!!selectedReward}>
        <ModalBody
          className="flex flex-grow"
          onClose={() =>
            /* TODO */
            null
          }>
          {selectedReward && (
            <>
              <TagDetail
                {...selectedReward}
                className="flex-grow w-full"
              />
              <div className="flex mt-auto">
                {affordable && selectedReward && (
                  <button
                    type="button"
                    className="btn bg-green-500 flex-grow flex-shrink-0 p-2 text-white"
                    onClick={(): void => {
                      if (selectedReward)
                        updateAuthUser({
                          rewardIds: [
                            ...ownedRewardIds,
                            selectedReward.id
                          ]
                        });
                      setReward(null);
                    }}>
                    Buy ({pointsOfSelectedReward}$)
                  </button>
                )}
                {owned && (
                  <button
                    type="button"
                    className="btn bg-yellow-500 flex-grow flex-shrink-0 p-2 text-white"
                    onClick={(): void => {
                      updateAuthUser({
                        rewardIds: ownedRewardIds.filter(
                          (id: string) => id !== selectedReward.id
                        )
                      });
                      setReward(null);
                    }}>
                    Sell ({pointsOfSelectedReward}$)
                  </button>
                )}
                {!owned && !affordable && (
                  <div className="mt-1 uppercase text-center flex-grow p-2 text-red-500 border-2 border-red-500 font-bold">
                    Not enough Money!!!
                  </div>
                )}
              </div>
            </>
          )}

          <button
            type="button"
            className="mt-1 btn border-2 border-red p-2"
            onClick={() => setReward(null)}>
            Close
          </button>
        </ModalBody>
      </BlackModal>
    </>
  );
};
export default Wallet;
