import React, { useEffect } from "react";

import uuid from "uuid/v1";

interface WidgetFormProps {
  // TODO: Change widget to type that is needed
  widget: WidgetType;
  baseURL: string;
  size: {
    width: number;
    height: number;
  };
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

interface MyDocument extends Document {
  [key: string]: any;
}

const WidgetForm: React.FC<WidgetFormProps> = props => {
  const formName = uuid();
  const iframeName = uuid();

  const { widget, baseURL, size } = props;

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
          id="lis_result_sourcedid"
          name="lis_result_sourcedid"
          value={widget.lis_result_sourcedid}
        />
        <input
          type="hidden"
          id="lis_outcome_service_url"
          name="lis_outcome_service_url"
          value={widget.lis_outcome_service_url}
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
        <input
          type="hidden"
          id="custom_initial_submit"
          name="custom_initial_submit"
          value={widget.custom_initial_submit}
        />
        <input type="hidden" value="Press to launch widget" />
      </form>

      <iframe
        title={iframeName}
        width={size.width}
        height={size.height}
        name={iframeName}
      />
    </>
  );
};

export default WidgetForm;
