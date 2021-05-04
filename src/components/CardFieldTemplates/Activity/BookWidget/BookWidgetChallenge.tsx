import React from "react";
import BookWidget from "./BookWidget";
import AuthUser from "~/constants/authUserType";

// import PropTypes from 'prop-types';
// import {withRouter} from 'react-router-dom';
// import {compose} from 'recompose';
// import withAuthorization from '~/components/withAuthorization';
// import MediaUpload from '~/components/utils/MediaUpload';

interface BookWidget {
  nonAuthUrl: string;
  short_code: string;
  teacher_id: string;
  title: string;
  url: string;
}

interface BookWidgetChallengeProps {
  authUser: AuthUser;
  activity: BookWidget;
  userEnvId: string;
  id: string;
}

const BookWidgetChallenge: React.FC<BookWidgetChallengeProps> = props => {
  const { activity, authUser, userEnvId, id } = props;

  const { teacher_id: teacherId, url } = activity || {
    teacher_id: null,
    url: null
  };

  return (
    <div className="flex flex-col flex-grow">
      {url && (
        <BookWidget
          authUser={authUser}
          userEnvId={userEnvId}
          id={id}
          teacherId={teacherId}
          bWidgetUrl={url}
        />
      )}
    </div>
  );
};

export default BookWidgetChallenge;
