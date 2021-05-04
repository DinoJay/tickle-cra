import React, { useState } from "react";
import uuidv1 from "uuid/v1";
import AuthoringWidget from "./AuthoringWidget";
import ResultsWidget from "./ResultsWidget";
import DetailsFrame from "components/utils/DetailsFrame";
import { BlackModal, ModalBody } from "components/utils/Modal";
import AuthUser from "constants/authUserType";

interface BookWidgetsPanelProps {
  authUser: AuthUser;
  updateAuthUser: Function;
  width: number;
  open: boolean;
  onClick: Function;
}

const BookWidgetsPanel: React.FC<BookWidgetsPanelProps> = props => {
  const [refreshKey, setRefreshKey] = useState(uuidv1());
  const [teacherModal, setTeacherModal] = useState(false);
  const [gradingModal, setGradingModal] = useState(false);

  window.addEventListener("message", event => {
    if (
      event.origin === "https://us-central1-tickle-194510.cloudfunctions.net"
    ) {
      setRefreshKey(uuidv1());
    }
  });

  const { authUser, updateAuthUser, width, open, onClick } = props;

  const [teacherId, setTeacherId] = useState(authUser.teacherId);

  const baseURL = "https://www.bookwidgets.com/lti/results";

  return (
    <DetailsFrame
      className="BookWidgets Panel"
      open={open}
      title="BookWidgets"
      onClick={onClick}
    >
      <AuthoringWidget
        key={refreshKey}
        userId={authUser.uid}
        email={authUser.email}
        firstName={authUser.firstName}
        lastName={authUser.lastName}
        teacherId={authUser.teacherId}
      />
      <button
        className="btn border-2 p-2 mt-2 w-full text-base"
        type="button"
        onClick={() => {
          setTeacherModal(true);
        }}
      >
        Add TeacherID
      </button>
      <button
        className={`btn border-2 p-2 mt-2 w-full text-base ${!teacherId &&
          "disabled"}`}
        disabled={!teacherId}
        type="button"
        onClick={() => {
          setGradingModal(true);
        }}
      >
        Grade Bookwidgets
      </button>
      <BlackModal className="flex-grow m-auto" visible={teacherModal}>
        <ModalBody
          title="Add teacher ID"
          onClose={() => {
            setTeacherModal(false);
          }}
        >
          <div>
            <input
              name="teacherId"
              className="w-full form-control border-2 text-lg"
              style={{ flexGrow: 0.75 }}
              value={teacherId}
              placeholder="Add Teacher ID"
              onChange={e => setTeacherId(e.target.value)}
            />
            <button
              className="btn border-2 p-2 mt-2 w-full text-base"
              type="button"
              onClick={() => {
                updateAuthUser({ teacherId });
                setTeacherModal(false);
              }}
            >
              Save
            </button>
          </div>
        </ModalBody>
      </BlackModal>

      <BlackModal
        className="flex-grow m-auto"
        visible={gradingModal}
        style={{ maxWidth: width, width }}
      >
        <ModalBody
          title="Grade Bookwidgets"
          onClose={() => {
            setGradingModal(false);
          }}
        >
          <div>
            {gradingModal && (
              <ResultsWidget
                baseURL={baseURL}
                email={authUser.email}
                firstName={authUser.firstName}
                lastName={authUser.lastName}
                teacherId={authUser.teacherId}
                userId={authUser.uid}
                height={0}
              />
            )}
          </div>
        </ModalBody>
      </BlackModal>
    </DetailsFrame>
  );
};

export default BookWidgetsPanel;
