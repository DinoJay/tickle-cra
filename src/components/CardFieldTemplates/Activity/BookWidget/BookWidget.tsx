import React, { useState, useEffect, useRef } from "react";
import useSize from "~/components/utils/useSize";
import WidgetForm from "./WidgetForm";
import AuthUser from "~/constants/authUserType";
// import PropTypes from 'prop-types';
// import useDidUpdateEffect from '~/components/utils/useDidUpdateEffect';
// import styles from './BookWidget.css';

interface BookWidgetProps {
  authUser: AuthUser;
  teacherId: string;
  bWidgetUrl: string;
  userEnvId: string;
  id: string;
}

interface WidgetType {
  lti_message_type: string;
  lti_version: string;
  user_id: string;
  roles: string;
  lis_person_contact_email_primary: string;
  lis_person_name_given: string;
  lis_person_name_family: string;
  tool_consumer_info_version: string | number;
  tool_consumer_info_product_family_code: string;
  tool_consumer_instance_name: string;
  tool_consumer_instance_description: string;
  tool_consumer_instance_url: string;
  context_id: string;
  context_title: string;
  context_label: string;
  lis_result_sourcedid: string;
  lis_outcome_service_url: string;
  launch_presentation_locale: string;
  oauth_consumer_key: string;
  oauth_signature_method: string;
  oauth_timestamp: string;
  oauth_nonce: string | number;
  oauth_version: string | number;
  oauth_signature: string;
  custom_initial_submit: string;
}

const BookWidget: React.FC<BookWidgetProps> = props => {
  const signatureURL =
    "https://us-central1-tickle-194510.cloudfunctions.net/bookWidget-oauth_signature";

  const { authUser, teacherId, bWidgetUrl, userEnvId, id } = props;

  const widgetObject = {
    base_url: bWidgetUrl,
    lti_message_type: "basic-lti-launch-request",
    lti_version: "LTI-1p0",

    teacher_id: teacherId,
    user_id: authUser.uid,
    roles: "Student",

    lis_person_contact_email_primary: authUser.email,
    lis_person_name_given: authUser.firstName,
    lis_person_name_family: authUser.lastName,

    tool_consumer_info_version: "1.2.3",
    tool_consumer_info_product_family_code: "tickle",
    tool_consumer_instance_name: "Tickle",
    tool_consumer_instance_description: "Tickle",
    tool_consumer_instance_url: "https://tickle-staging.firebaseapp.com",

    context_id: "2",
    context_title: "Geography 101",
    context_label: "geography-101",

    lis_result_sourcedid: `${authUser.uid}/${id}/${userEnvId}`,
    lis_outcome_service_url:
      "https://us-central1-tickle-194510.cloudfunctions.net/bookWidget-results",
    launch_presentation_locale: "en",
    custom_initial_submit: 1,
    // custom_autosubmit: 1,
    oauth_consumer_key: "TVBLxw9tlXj8rWpNVyxZThNIo20tq8",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: "",
    oauth_nonce: "",
    oauth_version: "1.0"
  };

  const [widget, setWidget] = useState<WidgetType | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const size = useSize(ref);

  const fetchSignedWidgetObject = () => {
    // Fetch the signed widget object from firebase functions
    fetch(signatureURL, {
      method: "post",
      mode: "cors",
      body: JSON.stringify(widgetObject)
    })
      .then(res => {
        res.json().then(data => {
          // Set the signed widget object in the state
          setWidget(data);
        });
      })
      .catch(err => {
        throw Error(err);
      });
  };

  useEffect(() => {
    fetchSignedWidgetObject();
  }, []);

  return (
    <div className="flex-grow" ref={ref}>
      {widget !== null && (
        <WidgetForm widget={widget} size={size} baseURL={bWidgetUrl} />
      )}
    </div>
  );
};

export default BookWidget;
