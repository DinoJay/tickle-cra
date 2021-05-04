import React, { useState, useEffect, useRef } from "react";
import AuthoringWidgetForm from "./AuthoringWidgetForm";

interface AuthoringWidgetProps {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  teacherId: string | undefined;
}

const AuthoringWidget: React.FC<AuthoringWidgetProps> = props => {
  const signatureURL: string =
    "https://us-central1-tickle-194510.cloudfunctions.net/bookWidget-oauth_signature";
  const baseURL: string = "https://www.bookwidgets.com/lti/create";

  // const defaultProps = {
  //   userId: '5294917292130304',
  //   email: 'david.breckx@gmail.com',
  //   firstName: 'David',
  //   lastName: 'Breckx',
  //   teacherId: '5294917292130304'
  // };

  const { userId, email, firstName, lastName, teacherId } = props;

  const authorWidgetObject = {
    base_url: baseURL,
    lti_message_type: "ContentItemSelectionRequest",
    lti_version: "LTI-1p0",

    user_id: teacherId || userId,
    roles: "Instructor",
    lis_person_contact_email_primary: email,
    lis_person_name_given: firstName,
    lis_person_name_family: lastName,

    tool_consumer_info_version: "1.2.3",
    tool_consumer_info_product_family_code: "tickle",
    tool_consumer_instance_name: "tickle",
    tool_consumer_instance_description: "Tickle",
    tool_consumer_instance_url: "https://tickle-staging.firebaseapp.com",

    context_id: "2",
    context_title: "Geography 101",
    context_label: "geography-101",

    launch_presentation_locale: "en",

    content_item_return_url:
      "https://us-central1-tickle-194510.cloudfunctions.net/bookWidget-content_item_return",

    oauth_consumer_key: "TVBLxw9tlXj8rWpNVyxZThNIo20tq8",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: "",
    oauth_nonce: "",
    oauth_version: "1.0"
  };

  const [authorWidget, setAuthorWidget] = useState(null);

  const fetchSignedWidgetObject = () => {
    // Fetch the signed widget object from firebase functions
    fetch(signatureURL, {
      method: "post",
      mode: "cors",
      body: JSON.stringify(authorWidgetObject)
    })
      .then(res => {
        res.json().then(data => {
          // Set the signed widget object in the state
          setAuthorWidget(data);
        });
      })
      .catch(err => {
        throw Error(err);
      });
  };

  useEffect(() => {
    fetchSignedWidgetObject();
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex-grow" ref={ref}>
      {authorWidget !== null && (
        <AuthoringWidgetForm widget={authorWidget} baseURL={baseURL} />
      )}
    </div>
  );
};

export default AuthoringWidget;
