import React from "react";
interface WidgetFormProps {
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
declare const WidgetForm: React.FC<WidgetFormProps>;
export default WidgetForm;
