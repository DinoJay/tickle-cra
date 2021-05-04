import React, { useEffect } from "react";

import uuid from "uuid/v1";

interface ResultsWidgetFormProps {
  widget: any;
  baseURL: string;
  height: number;
}

const ResultsWidgetForm: React.FC<ResultsWidgetFormProps> = props => {
  const { widget, baseURL, height } = props;

  const formName = uuid();
  const iframeName = uuid();

  interface MyDocument extends Document {
    [key: string]: any;
  }

  useEffect(() => {
    (document as MyDocument)[formName].submit();
  }, []);

  return (
    <>
      <form
        action={baseURL}
        method="POST"
        encType="application/x-www-form-urlencoded"
        target={iframeName}
        name={formName}
      >
        <input
          type="hidden"
          id="lti_message_type"
          name="lti_message_type"
          value={widget.lti_message_type}
        />
        <input
          type="hidden"
          id="lti_version"
          name="lti_version"
          value={widget.lti_version}
        />
        <input
          type="hidden"
          id="user_id"
          name="user_id"
          value={widget.user_id}
        />
        <input type="hidden" id="roles" name="roles" value={widget.roles} />
        <input
          type="hidden"
          id="lis_person_contact_email_primary"
          name="lis_person_contact_email_primary"
          value={widget.lis_person_contact_email_primary}
        />
        <input
          type="hidden"
          id="lis_person_name_given"
          name="lis_person_name_given"
          value={widget.lis_person_name_given}
        />
        <input
          type="hidden"
          id="lis_person_name_family"
          name="lis_person_name_family"
          value={widget.lis_person_name_family}
        />
        <input
          type="hidden"
          id="tool_consumer_info_version"
          name="tool_consumer_info_version"
          value={widget.tool_consumer_info_version}
        />
        <input
          type="hidden"
          id="tool_consumer_info_product_family_code"
          name="tool_consumer_info_product_family_code"
          value={widget.tool_consumer_info_product_family_code}
        />
        <input
          type="hidden"
          id="tool_consumer_instance_name"
          name="tool_consumer_instance_name"
          value={widget.tool_consumer_instance_name}
        />
        <input
          type="hidden"
          id="tool_consumer_instance_description"
          name="tool_consumer_instance_description"
          value={widget.tool_consumer_instance_description}
        />
        <input
          type="hidden"
          id="tool_consumer_instance_url"
          name="tool_consumer_instance_url"
          value={widget.tool_consumer_instance_url}
        />
        <input
          type="hidden"
          id="context_id"
          name="context_id"
          value={widget.context_id}
        />
        <input
          type="hidden"
          id="context_title"
          name="context_title"
          value={widget.context_title}
        />
        <input
          type="hidden"
          id="context_label"
          name="context_label"
          value={widget.context_label}
        />
        <input
          type="hidden"
          id="launch_presentation_locale"
          name="launch_presentation_locale"
          value={widget.launch_presentation_locale}
        />
        <input
          type="hidden"
          id="oauth_consumer_key"
          name="oauth_consumer_key"
          value={widget.oauth_consumer_key}
        />
        <input
          type="hidden"
          id="oauth_signature_method"
          name="oauth_signature_method"
          value={widget.oauth_signature_method}
        />
        <input
          type="hidden"
          id="oauth_timestamp"
          name="oauth_timestamp"
          value={widget.oauth_timestamp}
        />
        <input
          type="hidden"
          id="oauth_nonce"
          name="oauth_nonce"
          value={widget.oauth_nonce}
        />
        <input
          type="hidden"
          id="oauth_version"
          name="oauth_version"
          value={widget.oauth_version}
        />
        <input
          type="hidden"
          id="oauth_signature"
          name="oauth_signature"
          value={widget.oauth_signature}
        />
      </form>

      <iframe
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        title={iframeName}
        name={iframeName}
        id={iframeName}
        width="100%"
        height={height - 100}
      />
    </>
  );
};

export default ResultsWidgetForm;
