import React, { useState, useEffect, useRef } from "react";
import ResultsWidgetForm from "./ResultsWidgetForm";
const ResultsWidget = props => {
    const signatureURL = "https://us-central1-tickle-194510.cloudfunctions.net/bookWidget-oauth_signature";
    // const baseURL = 'https://www.bookwidgets.com/lti/results'; // All results
    // One result of a student
    // This URL is saved in the firestore under the cardSubmissions table either in cards as well in users table
    // const baseURL = 'https://www.bookwidgets.com/lti/results'
    // const defaultProps = {
    //   uid: '5294917292130304',
    //   email: 'david.breckx@gmail.com',
    //   firstName: 'David',
    //   lastName: 'Breckx',
    //   teacherId: '5294917292130304'
    // };
    const { userId, email, firstName, lastName, teacherId, baseURL, height } = props;
    const resultsWidgetObject = {
        base_url: baseURL,
        lti_message_type: "basic-lti-launch-request",
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
        oauth_consumer_key: "TVBLxw9tlXj8rWpNVyxZThNIo20tq8",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: "",
        oauth_nonce: "",
        oauth_version: "1.0"
    };
    const [resultsWidget, setResultsWidget] = useState(null);
    const fetchSignedWidgetObject = () => {
        // Fetch the signed widget object from firebase functions
        fetch(signatureURL, {
            method: "post",
            mode: "cors",
            body: JSON.stringify(resultsWidgetObject)
        })
            .then(res => {
            res.json().then(data => {
                // Set the signed widget object in the state
                setResultsWidget(data);
            });
        })
            .catch(err => {
            throw Error(err);
        });
    };
    useEffect(() => {
        fetchSignedWidgetObject();
    }, []);
    const ref = useRef(null);
    return (React.createElement("div", { className: "flex-grow flex flex-col", ref: ref }, resultsWidget !== null && (React.createElement(ResultsWidgetForm, { widget: resultsWidget, baseURL: baseURL, height: height }))));
};
export default ResultsWidget;
